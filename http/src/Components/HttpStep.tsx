import { HttpEndpoint } from './HttpEndpoint';
import { TimePeriodSelect, timeUnits } from './TimePeriodSelect';
import SwaggerParser from '@apidevtools/swagger-parser';
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
  input: string | OpenAPI.Document,
  isSource: boolean
): Promise<IEndpoint[]> {
  let swaggerParser: SwaggerParser = new SwaggerParser();

  const e: Array<IEndpoint> = [];
  let api: OpenAPIV2.Document | OpenAPIV3.Document | OpenAPIV3_1.Document;

  try {
    api = await swaggerParser.validate(input, { dereference: { circular: 'ignore' } });
    // @ts-ignore
    Object.entries(swaggerParser.api.paths).forEach((p) => {
      const operations: Map<string, OpenAPI.Operation> = new Map<string, OpenAPI.Operation>();
      let hasGet: boolean = false;
      Object.entries(p[1]).forEach((method: [string, OpenAPI.Operation]) => {
        if (!isSource) {
          operations.set(method[0], method[1]);
        } else {
          if (method[0].toUpperCase() === 'GET') hasGet = true;
          operations.set(method[0], method[1]);
        }
      });
      if (!isSource) {
        e.push({ name: p[0], pathItem: p[1], operations: operations });
      } else {
        if (hasGet) {
          e.push({ name: p[0], pathItem: p[1], operations: operations });
        }
      }
    });
  } catch (error) {
    console.error('error ' + error);
  }
  return e;
}

type HttpStepParams = {
  url: string;
  period: number;
  contentType: string;
};

export const HttpStep = (props: any) => {
  let initPeriodINputValue = props.stepParams?.period;
  let initTimeUnit = 's';

  //get init values for the TimePeriodSelect
  timeUnits.forEach((v, k) => {
    const period = props.stepParams?.period || 1;
    if (period / v >= 1 && period % v == 0) {
      initPeriodINputValue = period / v;
      initTimeUnit = k;
    }
  });

  const [openApiSpecText, setOpenApiSpecText] = useState('');
  const endpoints = useRef<IEndpoint[]>([]);
  const [currentEndpoint, setCurrentEndpoint] = useState<IEndpoint>({
    name: '',
    pathItem: {},
    operations: new Map(),
  });
  const [upload, setUpload] = useState<boolean>(false);
  const [paramString, setParamString] = useState<string>('');
  const [selectedEndpoint, setSelectedEndpoint] = useState<string>('');

  const [stepParams, setStepParams] = useState<HttpStepParams>({
    url: props.stepParams?.url || '',
    period: props.stepParams?.period || 1,
    contentType: props.stepParams?.contentType || '',
  });
  const [basePath, setBasePath] = useState<string>('');
  const [apiSpecUrl, setApiUrl] = useState<string>('https://api.chucknorris.io/documentation');

  const parseSpec = async (input: string) => {
    endpoints.current = await parseApiSpec(input, isSource());
    setCurrentEndpoint(endpoints.current[0]);
  };

  useEffect(() => {
    let apiDoc = '';
    if (upload && openApiSpecText !== '') {
      apiDoc = JSON.parse(openApiSpecText);
      parseSpec(apiDoc).catch(console.error);
    }
  }, [openApiSpecText, upload]);

  function isSource(): boolean {
    const name: string = props.step?.name.toString();
    return name?.includes('source');
  }

  const handleFileInputChange = (
    _event: React.ChangeEvent<HTMLInputElement> | React.DragEvent<HTMLElement>,
    file: File
  ) => {
    file.text().then((input) => {
      setOpenApiSpecText(input);
    });
  };

  function selectApiEndpoint(index: string) {
    const i = Number(index);
    setSelectedEndpoint(index);
    setCurrentEndpoint(endpoints.current[i]);
    constructUrl(endpoints.current[i]?.name);
  }

  const dropdownEndpointsItems: Array<ReactElement> = [];

  endpoints.current.forEach((e, index) => {
    dropdownEndpointsItems.push(
      <FormSelectOption key={e.name} value={index} label={e.name} isDisabled={false} />
    );
  });

  const handleClear = (_event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setOpenApiSpecText('');
  };

  function updateKaoto() {
    props.notifyKaoto('Http step updated');
    if (isSource()) {
      props.updateStepParams(stepParams);
      // if the step is either sink or action it doesn't have the period field
    } else {
      props.updateStepParams({ url: stepParams.url, contentType: stepParams.contentType });
    }
  }

  const handleLoadClick = () => {
    const url = new URL(apiSpecUrl);
    parseSpec(apiSpecUrl).catch(console.error);
    constructUrl('', url.origin);
  };

  const constructUrl = (urParameters: string, bPath?: string) => {
    setParamString(urParameters);
    const stepParamsTemp = stepParams;
    if (bPath !== undefined) {
      setBasePath(bPath);
      stepParamsTemp.url = bPath + urParameters;
    } else {
      stepParamsTemp.url = basePath + urParameters;
    }
    setStepParams(stepParamsTemp);
  };

  function updateStepParams(url: string, contentType: string, period: number) {
    const newStepParams: HttpStepParams = {
      period: period > 0 ? period : stepParams.period,
      url: url !== '' ? url : stepParams.url,
      contentType: contentType !== '' ? contentType : stepParams.contentType,
    };
    setStepParams(newStepParams);
  }

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
      <FormGroup label="Base Path">
        <Grid>
          <GridItem span={6}>
            <TextInput
              id="basePathInput"
              aria-label="Base path"
              value={basePath}
              onChange={(value: string) => {
                constructUrl(paramString, value);
              }}
            />
          </GridItem>
          <GridItem span={6}>
            <FormSelect
              minLength={500}
              type="text"
              id="simple-form-note-01"
              name="simple-form-number"
              value={selectedEndpoint}
              onChange={selectApiEndpoint}
            >
              {dropdownEndpointsItems}
            </FormSelect>
          </GridItem>
        </Grid>
      </FormGroup>
      {currentEndpoint?.name !== '' && (
        <HttpEndpoint
          endpoint={currentEndpoint}
          isSource={isSource()}
          setUrl={constructUrl}
          setContentType={(contentType: string) => {
            updateStepParams('', contentType, 0);
          }}
        />
      )}

      {isSource() && (
        <TimePeriodSelect
          initTimeUnit={initTimeUnit}
          initPeriodInputValue={initPeriodINputValue}
          setTimePeriod={(period: number) => {
            updateStepParams('', '', period);
          }}
        />
      )}

      <FormGroup label="URL">
        <TextInput
          onChange={(value) => updateStepParams(value, '', 0)}
          value={stepParams.url}
          aria-label="url-read-only"
        />
      </FormGroup>
      <FormGroup label="Content Type">
        <TextInput
          onChange={(value) => updateStepParams('', value, 0)}
          value={stepParams.contentType}
          aria-label="url-read-only"
        />
      </FormGroup>
      <ActionGroup>
        <Button variant="primary" onClick={updateKaoto}>
          Apply
        </Button>
      </ActionGroup>
    </Form>
  );
};

export default HttpStep;
