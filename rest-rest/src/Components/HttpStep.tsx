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
  Grid,
  GridItem,
} from '@patternfly/react-core';
import { OpenAPI, OpenAPIV3, OpenAPIV2, OpenAPIV3_1 } from 'openapi-types';
import { ReactElement, useEffect, useRef, useState } from 'react';
import SwaggerParser from '@apidevtools/swagger-parser';
import { IStepProps } from '../../try-catch-eip/kaoto/types/';

export interface IEndpoint {
  name: string;
  pathItem:
    | OpenAPIV2.PathItemObject
    | OpenAPIV3.PathItemObject
    | OpenAPIV3_1.PathItemObject
    | undefined;
  operations: Map<string, OpenAPI.Operation>;
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
      e.push({ name: p[0], pathItem: p[1], operations: operations });
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

export const HttpStep = ({ updateStep, step, fetchStepDetails }: IRestForm) => {
  const [openApiSpecText, setOpenApiSpecText] = useState('');
  const endpoints = useRef<IEndpoint[]>([]);
  const [upload, setUpload] = useState<boolean>(false);
  const [independentRoutes, setIndependentRoutes] = useState<boolean>(false);
  const [selectedEndpoint, setSelectedEndpoint] = useState<string>('');
  const [basePath, setBasePath] = useState<string>('');
  const [apiSpecUrl, setApiUrl] = useState<string>('https://api.chucknorris.io/documentation');

  const parseSpec = async (input: string) => {
    endpoints.current = await parseApiSpec(input);
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
      if (step.branches == null) {
      step.branches = [];
    }
    
    let steps_cache = {};
    steps_cache["consumes"] = fetchStepDetails("CAMEL-REST-CONSUMES");
    steps_cache["direct"] = fetchStepDetails("direct-producer");
    
    for (const endpoint of endpoints.current) {
     for (const operation of endpoint['operations']) {
       console.log(operation);
	
	let produces = null;
	if (operation[1]['produces']) {
	  produces = operation[1]['produces'][0];
	}
	let consumes = null;
	if (operation[1]['consumes']) {
	  consumes = operation[1]['consumes'][0];
	}
	
	let operation_branch = {
		steps: [],
		parameters: [],
		condition: null,
		identifier: operation[1]['operationId']
		};
		
       steps_cache["consumes"]
	       .then(s => {
	       		//clone the step
  			let consume = JSON.parse(JSON.stringify(s));
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
	       		return consume;
	       		})
	       .then(irrelevant => steps_cache["direct"]
			.then(s => {
	       		//clone the step
  			let consume = JSON.parse(JSON.stringify(s));
	                for (const parameter of consume.parameters) {
	                  if (parameter['id'] == "name") {
	                    parameter['value'] = endpoint['name'];
	                  }
	                }
	       		operation_branch['steps'].push(consume);
	       		return consume;
	       		}));
		
       let branch = step.branches.find(b => b.identifier == operation[0]);
       if (branch == null) {
         let operation_step = fetchStepDetails("camel-rest-verb-" +  operation[0]);
	 branch = {
		steps: [],
		parameters: [],
		condition: null,
		identifier: operation[0]
		};
	 step.branches.push(branch);
	 steps_cache[operation[0]] = operation_step;
         operation_step.then(s => s.branches = []);
         operation_step.then(s => branch['steps'].push(s));
	}
	
        steps_cache[operation[0]].then(s => s.branches.push(operation_branch));
      }
    }

    if (updateStep) {
      Promise.all(Object.values(steps_cache)).then(irrelevant => updateStep(step));
    }
  }

  const handleLoadClick = () => {
    const url = new URL(apiSpecUrl);
    parseSpec(apiSpecUrl).catch(console.error);
    console.log(step);
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
      
      <strike><Checkbox id="inputType" disabled label="Independent Route per Endpoint" isChecked={independentRoutes} onChange={setIndependentRoutes} /></strike>

      <ActionGroup>
        <Button variant="primary" onClick={saveHandler}>
          Generate Endpoints
        </Button>
      </ActionGroup>
    </Form>
  );
};

export default HttpStep;
