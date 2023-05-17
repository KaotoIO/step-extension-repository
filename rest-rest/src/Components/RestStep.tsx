import {
  Form,
  FormGroup,
  TextInput,
  ActionGroup,
  Button,
  FileUpload,
  InputGroup,
  Checkbox,
} from '@patternfly/react-core';
import { Endpoint } from './Endpoint';
import { OpenAPI, OpenAPIV3, OpenAPIV2, OpenAPIV3_1 } from 'openapi-types';
import { useEffect, useState } from 'react';
import SwaggerParser from '@apidevtools/swagger-parser';
import { IStepProps } from '../../../try-catch-eip/kaoto/types/dts/src/types.js';

export interface IEndpoint {
  name: string;
  pathItem:
  | OpenAPIV2.PathItemObject
  | OpenAPIV3.PathItemObject
  | OpenAPIV3_1.PathItemObject
  | string
  | undefined;
  operations:
  | Map<string, OpenAPI.Operation>
  | Map<string, [string, {}]>;
  produces: Map<string, string[]>;
  consumes: Map<string, string[]>;
  produce: Map<string, string>;
  consume: Map<string, string>;
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
  updateStep?: (newConfig: IStepProps[]) => void;
  step?: IStepProps;
  fetchStepDetails: (stepId: string) => Promise<IStepProps>;
}

export function recoverEndpoints(step: IStepProps): IEndpoint[] {

  let endpoints: IEndpoint[] = [];

  if (step) {
    if (step.branches) {
      for (const branch of step.branches) {
        if (branch.steps && branch.steps?.length > 0) {
          let verbStep: IStepProps = branch.steps[0];
          let verb = branch.identifier;

          if (verbStep.branches) {
            for (const consumeBranch of verbStep.branches) {
              if (consumeBranch.steps && consumeBranch.steps?.length > 0) {

                let consumeStep = consumeBranch.steps[0];

                if (consumeStep.parameters) {

                  let path = "";
                  let prod = "";
                  let cons = "";

                  for (const parameter of consumeStep.parameters) {
                    if (parameter.id == "uri") {
                      path = parameter.value;
                    } else if (parameter.id == "consumes") {
                      cons = parameter.value;
                    } else if (parameter.id == "produces") {
                      prod = parameter.value;
                    }
                  }

                  let consume = new Map<string, string>();
                  if (cons) {
                    consume.set(verb, cons);
                  }
                  let produce = new Map<string, string>();
                  produce.set(verb, prod);
                  let consumes = new Map<string, string[]>();
                  if (cons) {
                    consumes.set(verb, [cons]);
                  }
                  let produces = new Map<string, string[]>();
                  produces.set(verb, [prod]);
                  let operations = new Map<string, [string, {}]>();
                  operations.set(verb, [verb, {
                    produces: [prod],
                    consumes: (cons ? [cons] : []),
                    operationId: consumeBranch.identifier,
                  }]);

                  endpoints.push(
                    {
                      name: path,
                      pathItem: path,
                      operations: operations,
                      produces: produces,
                      consumes: consumes,
                      produce: produce,
                      consume: consume,
                    });
                }
              }
            }
          }
        }
      }
    }
  }

  return endpoints;
};


export const RestStep = ({ updateStep, step, fetchStepDetails }: IRestForm) => {
  const [openApiSpecText, setOpenApiSpecText] = useState('');
  const [endpoints, setEndpoints] = useState<IEndpoint[]>([]);
  const [currentEndpoints, setCurrentEndpoints] = useState<IEndpoint[]>(recoverEndpoints(step));
  const [upload, setUpload] = useState<boolean>(false);
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

  const saveHandler = () => {
    const finalBranches: any[] = [];
    const existingSteps: Map<string, Map<string, IStepProps>> = new Map<string, Map<string, IStepProps>>();

    if (step && step.branches) {
      for (const verbBranch of step.branches) {
        if (verbBranch.steps && verbBranch.steps.length > 0) {
          const verb = verbBranch.identifier;

          if (verbBranch.steps[0].branches != null) {
            for (const consumeBranch of verbBranch.steps[0].branches) {
              if (consumeBranch.steps && consumeBranch.steps.length > 1) {
                const consumeStep: IStepProps = consumeBranch.steps[0];
                const finalStep: IStepProps = consumeBranch.steps[1];
                existingSteps.set(verb, new Map<string, IStepProps>());
                let path = "";
                if (consumeStep && consumeStep.parameters) {
                  for (const param of consumeStep.parameters) {
                    if (param.id == "uri") {
                      path = param.value;
                    }
                  }
                  existingSteps.get(verb)?.set(path, finalStep);
                }
              }
            }
          }
        }
      }
    }

    let steps_cache: Map<string, any> = new Map<string, any>();
    steps_cache.set("consumes", fetchStepDetails("CAMEL-REST-CONSUMES"));
    steps_cache.set("direct", fetchStepDetails("direct-producer"));

    let allDone: Promise<Boolean>[] = [];

    let allEndpoints: IEndpoint[] = [];
    allEndpoints = allEndpoints.concat(currentEndpoints).concat(endpoints);

    for (const endpoint of allEndpoints) {
      for (const operation of endpoint['operations']) {

        let verb = operation[0];

        if (!steps_cache.has(verb)) {
          steps_cache.set(verb, fetchStepDetails("camel-rest-verb-" + verb));
        }

        let produces = endpoint.produce.get(verb);
        let consumes = endpoint.consume.get(verb);

        let identifier = operation[1]['operationId'];
        let followingStep: IStepProps | undefined;
        if (existingSteps.has(verb)) {
          let verbMap = existingSteps.get(verb);
          if (verbMap && verbMap.has(endpoint['name'])) {
            followingStep = existingSteps.get(verb)?.get(endpoint['name']);
          }
        }

        const operation_branch: {
          steps: IStepProps[];
          parameters: string[];
          condition: any;
          identifier: any;
        }
          = {
          steps: [],
          parameters: [],
          condition: null,
          identifier: identifier,
        };

        let promiseResolve: (value: Boolean | PromiseLike<Boolean>) => void;

        allDone.push(new Promise<Boolean>(function (resolve) { promiseResolve = resolve; }));

        Promise.all([steps_cache.get("consumes"), steps_cache.get("direct")])
          .then((steps) => {
            //clone the step
            //consume
            let consume: IStepProps = JSON.parse(JSON.stringify(steps[0]));
            if (consume.parameters) {
              for (const parameter of consume.parameters) {
                if (parameter['id'] == "consumes") {
                  parameter['value'] = consumes;
                } else if (parameter['id'] == "produces") {
                  parameter['value'] = produces;
                } else if (parameter['id'] == "uri") {
                  parameter['value'] = endpoint['name'];
                }
              }
            }
            operation_branch['steps'].push(consume);
            //and now the direct
            if (followingStep == null) {
              let direct: IStepProps = JSON.parse(JSON.stringify(steps[1]));
              if (direct.parameters) {
                for (const parameter of direct.parameters) {
                  if (parameter['id'] == "name") {
                    parameter['value'] = identifier;
                  }
                }
              }
              operation_branch.steps.push(direct);
            } else {
              operation_branch.steps.push(followingStep);
            }
            promiseResolve(true);
            return consume;
          });

        let branch: any = finalBranches.find(b => b.identifier == verb);
        if (branch == null) {
          branch = {
            steps: [],
            parameters: [],
            condition: null,
            identifier: verb
          };
          finalBranches.push(branch);
          steps_cache.get(verb).then((s: any) => {
            branch['steps'].push(s);
            return s;
          });
        }

        let promiseResolve2: (value: Boolean | PromiseLike<Boolean>) => void;

        allDone.push(new Promise<Boolean>(function (resolve) { promiseResolve2 = resolve; }));
        steps_cache.get(verb).then((s: any) => {
          if (s.branches == null) {
            s.branches = [];
          }
          s.branches.push(operation_branch);
          promiseResolve2(true);
          return s;
        });
      }
    }

    if (updateStep) {
      Promise.all(allDone).then(() => {
        if (step) {
          step.branches = finalBranches;
          updateStep(step);
        }
      });
    }
  }

  const handleLoadClick = () => {
    parseSpec(apiSpecUrl).catch(console.error);
  };

  return (
    <Form>
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
      {currentEndpoints.length > 0 &&
        <FormGroup label="Existing Endpoints">
          {
            currentEndpoints.map((element, elid) => {
              return Array.from(element.produces).map(([verb, operations]) => (
                <Endpoint
                  elid={elid}
                  element={element}
                  verb={verb}
                  operations={operations}
                  setEndpoints={setCurrentEndpoints}
                  endpoints={currentEndpoints} />
              ));
            }
            )
          }
        </FormGroup>
      }
      <FormGroup label="Endpoints">
        {
          endpoints.map((element, elid) => {
            return Array.from(element.produces).map(([verb, operations]) => (
              <Endpoint
                elid={elid}
                element={element}
                verb={verb}
                operations={operations}
                setEndpoints={setEndpoints}
                endpoints={endpoints} ></Endpoint>
            )
            );
          }
          )
        }
      </FormGroup>

      <ActionGroup>
        <Button variant="primary" onClick={saveHandler}
          isDisabled={endpoints.length + currentEndpoints.length == 0} >
          Generate {endpoints.length + currentEndpoints.length} Endpoints
        </Button>
      </ActionGroup>
    </Form>
  );
};

export default RestStep;

