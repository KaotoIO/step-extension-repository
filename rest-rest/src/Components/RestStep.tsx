import {
  Form,
  FormGroup,
  TextInput,
  ActionGroup,
  Button,
  FileUpload,
  InputGroup,
  Checkbox,
  FormSelect,
  FormSelectOption,
} from '@patternfly/react-core';
import { OpenAPI, OpenAPIV3, OpenAPIV2, OpenAPIV3_1 } from 'openapi-types';
import { FormEvent, Key, useEffect, useState } from 'react';
import SwaggerParser from '@apidevtools/swagger-parser';
import { IStepProps } from '../../try-catch-eip/kaoto/types/';
import { TrashIcon } from '@patternfly/react-icons';

export interface IEndpoint {
  name: string;
  pathItem:
  | OpenAPIV2.PathItemObject
  | OpenAPIV3.PathItemObject
  | OpenAPIV3_1.PathItemObject
  | undefined;
  operations: Map<string, OpenAPI.Operation>;
  produces: Map<string, string[]>;
  consumes: Map<string, string[]>;
  produce: Map<string, string>;
  consume: Map<string, string>;
  useOnGeneration: boolean;
}

async function parseApiSpec(
  input: string | OpenAPI.Document
): Promise<IEndpoint[]> {
  let swaggerParser: SwaggerParser = new SwaggerParser();

  const e: Array<IEndpoint> = [];
  let api: OpenAPIV2.Document | OpenAPIV3.Document | OpenAPIV3_1.Document;

  try {
    api = await swaggerParser.validate(input, { dereference: { circular: 'ignore' } });
    // @ts-ignore
    Object.entries(swaggerParser.api.paths).forEach((p) => {
      const operations: Map<string, OpenAPI.Operation> = new Map<string, OpenAPI.Operation>();
      Object.entries(p[1]).forEach((method: [string, OpenAPI.Operation]) => {
        operations.set(method[0], method[1]);
      });
      let produces: Map<string, string[]> = new Map<string, string[]>();
      let consumes: Map<string, string[]> = new Map<string, string[]>();
      let produce: Map<string, string> = new Map<string, string>();
      let consume: Map<string, string> = new Map<string, string>();
      operations.forEach((op: OpenAPI.Operation, verb: string) => {
        produces.set(verb, []);
        if (op['produces']) {
          op['produces'].forEach((prod: string) => produces.get(verb).push(prod));
          produce.set(verb, op['produces'][0]);
        }
        if (op['consumes']) {
          consumes.set(verb, []);
          op['consumes'].forEach((con: string) => consumes.get(verb).push(con));
          consume.set(verb, op['consumes'][0]);
        }
      });
      e.push({ name: p[0], pathItem: p[1], operations: operations, produces: produces, consumes: consumes, produce: produce, consume: consume, useOnGeneration: true });
    });
  } catch (error) {
    console.error('error ' + error);
    props.notifyKaoto('Error trying to parse OpenAPI spec. Please, check the sources.');
  }
  return e;
}

export interface IRestForm {
  updateStep?: (newConfig: any[]) => void;
  step?: IStepProps;
  fetchStepDetails: (stepId: string) => Promise<IStepProps>;
}

export const RestStep = ({ updateStep, step, fetchStepDetails }: IRestForm) => {
  const [openApiSpecText, setOpenApiSpecText] = useState('');
  const [endpoints, setEndpoints] = useState<IEndpoint[]>([]);
  const [upload, setUpload] = useState<boolean>(false);
  const [clean, setClean] = useState<boolean>(true);
  const [apiSpecUrl, setApiUrl] = useState<string>('https://api.chucknorris.io/documentation');

  const parseSpec = async (input: string) => {
    let e = await parseApiSpec(input);
    setEndpoints(e);
  };

  useEffect(() => {
    let apiDoc = '';
    if (upload && openApiSpecText !== '') {
      apiDoc = JSON.parse(openApiSpecText);
      parseSpec(apiDoc).catch(console.error);
    }
  }, [openApiSpecText, upload]);

  const handleFileInputChange = (
    _event: React.ChangeEvent<HTMLInputElement> | React.DragEvent<HTMLElement>,
    file: File
  ) => {
    file.text().then((input) => {
      setOpenApiSpecText(input);
    });
  };

  const handleClear = (_event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setOpenApiSpecText('');
  };

  const removeEndpoint = (index: number) => {
    endpoints.splice(index, 1);
    setEndpoints(endpoints.slice());
  };

  const toggleEndpoint = (index: number, checked: boolean) => {
    endpoints[index]['useOnGeneration'] = checked;
    setEndpoints(endpoints.slice());
  };

  const updateMetaType = (index: number, verb: string, type: string, value: string, event: FormEvent<HTMLSelectElement> | undefined) => {
    endpoints[index][type][verb] = value;
    setEndpoints(endpoints.slice());
  };


  const saveHandler = () => {
    if (clean || step.branches == null) {
      step.branches = [];
    }

    let steps_cache: Map<string, any> = new Map<string, any>();
    steps_cache.set("consumes", fetchStepDetails("CAMEL-REST-CONSUMES"));
    steps_cache.set("direct", fetchStepDetails("direct-producer"));

    let allDone: Promise<Boolean>[] = [];

    for (const endpoint of endpoints) {
      if (endpoint.useOnGeneration) {
        for (const operation of endpoint['operations']) {

          let verb = operation[0];

          if (!steps_cache.has(verb)) {
            steps_cache.set(verb, fetchStepDetails("camel-rest-verb-" + verb));
          }

          let produces = endpoint.produce.get(verb);
          let consumes = endpoint.consume.get(verb);

          const operation_branch = {
            steps: [],
            parameters: [],
            condition: null,
            identifier: operation[1]['operationId']
          };

          let promiseResolve: (value: Boolean | PromiseLike<Boolean>) => void;

          allDone.push(new Promise<Boolean>(function (resolve) { promiseResolve = resolve ; }));

          Promise.all([steps_cache.get("consumes"), steps_cache.get("direct")])
            .then((steps) => {
              //clone the step
              //consume
              let consume: any = JSON.parse(JSON.stringify(steps[0]));
              for (const parameter of consume.parameters) {
                if (parameter['id'] == "consumes") {
                  parameter['value'] = consumes;
                } else if (parameter['id'] == "produces") {
                  parameter['value'] = produces;
                } else if (parameter['id'] == "uri") {
                  parameter['value'] = endpoint['name'];
                }
              }
              operation_branch['steps'].push(consume);
              //and now the direct
              let direct = JSON.parse(JSON.stringify(steps[1]));
              for (const parameter of direct.parameters) {
                if (parameter['id'] == "name") {
                  parameter['value'] = operation[1]['operationId'];
                }
              }
              operation_branch.steps.push(direct);
              promiseResolve(true);
              console.log("Resolved");
              console.log(allDone);
              return direct;
            });

          let branch = step.branches.find(b => b.identifier == verb);
          if (branch == null) {
            branch = {
              steps: [],
              parameters: [],
              condition: null,
              identifier: verb
            };
            step.branches.push(branch);
            steps_cache.get(verb).then((s: any) => {
              branch['steps'].push(s);
              console.log(s);
              return s;
            });
          }

          let promiseResolve2: (value: Boolean | PromiseLike<Boolean>) => void;

          allDone.push(new Promise<Boolean>(function (resolve) { promiseResolve2 = resolve ; }));
          steps_cache.get(verb).then((s: any) => {
            if (s.branches == null) {
              s.branches = [];
            }
            s.branches.push(operation_branch);
            console.log(s);
            promiseResolve2(true);
            console.log("Resolved");
            console.log(allDone);
            return s;
          });
        }
      }
    }

    if (updateStep) {
      Promise.all(allDone).then(() => {
        console.log(step);
        updateStep(step);
      });
    }
  }

  const handleLoadClick = () => {
    parseSpec(apiSpecUrl).catch(console.error);
  };

  return (
    <Form>
      <FormGroup label="Start from scratch" fieldId="rest-clean-all">
        <Checkbox id="inputType" label="Clean existing endpoints" isChecked={clean} onChange={setClean} />
      </FormGroup>
      <FormGroup label="OpenApi" fieldId="open-api-file-upload">
        <Checkbox id="inputType" label="Upload spec" isChecked={upload} onChange={setUpload} />

        {upload && (
          <FileUpload
            id="simple-file"
            value={openApiSpecText}
            filenamePlaceholder="Drag and drop a open API spec or upload one"
            onFileInputChange={handleFileInputChange}
            onClearClick={handleClear}
            browseButtonText="Upload"
          />
        )}
        {!upload && (
          <InputGroup>
            <TextInput
              id="specUrlInput"
              aria-label="Api spec url"
              value={apiSpecUrl}
              onChange={setApiUrl}
            />
            <Button onClick={handleLoadClick}>Load</Button>
          </InputGroup>
        )}
      </FormGroup>
      <FormGroup label="Endpoints">
        {
          endpoints.map((element, elid) => {
            return Array.from(element.produces).map(([verb, operations]) => {
              return (
                <div key={'endpoint-block-' + elid}>
                  <Button
                    style={{ float: 'left' }}
                    variant='link'
                    icon={<TrashIcon />}
                    className={'remove-do-catch'}
                    data-element-id={elid}
                    data-testid={'endpoint-remove-' + element['name']}
                    onClick={() => { removeEndpoint(elid); }}
                  />
                  <Checkbox id="inputType"
                    label={element['name']}
                    isChecked={element['useOnGeneration']}
                    onChange={(toggle) => { toggleEndpoint(elid, toggle); }} />
                  <span>{verb}</span>
                  <FormSelect
                    label="Produces"
                    aria-label='OperationSelect'
                    onChange={(value, event) => updateMetaType(elid, verb, 'produce', value, event)}
                    value={element.produce.get(verb)}>
                    {
                      operations.map((option: string, index: Key | null | undefined) => (
                        <FormSelectOption key={index} value={element.produce.get(verb)} label={option} />
                      ))
                    }
                  </FormSelect>
                  {
                    Object.values(element['consumes']).length > 0 &&
                    <FormSelect
                      label="Consumes"
                      aria-label='OperationSelect'
                      onChange={(value, event) => updateMetaType(elid, verb, 'consume', value, event)}
                      value={element.consume.get(verb)}>
                      {Object.entries(element['consumes']).map(([verb, operations]) =>
                        operations.map((option: string, index: Key | null | undefined) => (
                          <FormSelectOption key={index} value={element.consume.get(verb)} label={option} />
                        )))}
                    </FormSelect>
                  }
                </div>
              );
            }
            );
          }
          )
        }
      </FormGroup>

      <ActionGroup>
        <Button variant="primary" onClick={saveHandler} isDisabled={endpoints.length == 0} >
          Generate {endpoints.length} Endpoints
        </Button>
      </ActionGroup>
    </Form>
  );
};

export default RestStep;
