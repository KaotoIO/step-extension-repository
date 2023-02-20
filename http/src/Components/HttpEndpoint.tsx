import {IEndpoint} from './HttpStep';
import {
    Dropdown,
    DropdownItem,
    DropdownToggle,
    FormGroup, FormSelect, FormSelectOption,
    Grid,
    GridItem, Label,
    TextInput,
} from '@patternfly/react-core';
import {OpenAPI} from 'openapi-types';
import {ReactElement, useEffect, useRef, useState} from 'react';

const ParamFields = ({parameters, handleChange}) => {
    const fieldList: ReactElement[] = [];
    parameters.forEach((v, name, index) => {
        fieldList.push(
            <FormGroup key={'key' + name + index} label={name} fieldId={'id' + name}>
                <TextInput
                    //key={"inputKey" + name+index}
                    value={v}
                    label={name}
                    id={'idTextInput-' + name}
                    name={'nameTextInput' + name}
                    //
                    onChange={(value) => {
                        handleChange(name, value);
                    }}
                />
            </FormGroup>
        );
    });
    return (
        fieldList.length > 0 && (
            <FormGroup label="Parameters" fieldId="simple-form-note-01">
                {fieldList}
            </FormGroup>
        )
    );
};

export type HttpEndpointProps = {
    endpoint: IEndpoint;
    isSource: boolean;
    setUrl: (value: string) => void;
    setContentType: (value: string) => void;
};

export const HttpEndpoint = (props: HttpEndpointProps) => {
    const [initOperationName] = props.endpoint.operations.keys();
    const [currentOperation, setCurrentOperation] = useState<string>(initOperationName);
    const parameters = useRef<Map<string, string>>(new Map());
    const [currentContentType, setCurrentContentType] = useState<string>('');

    //init parameters
    const params = getParameters(getOperation(currentOperation));
    const [existing] = parameters.current?.keys();
    const [nw] = params.keys();

    if (parameters.current.size === 0 || nw !== existing) {
        parameters.current = params;
    }

    function getOperation(name: string) {
        return props.endpoint.operations.get(name);
    }

    //  props.setUrl(props.endpoint.name);
    function getParameters(method?: OpenAPI.Operation): Map<string, string> {
        const parameters: Map<string, string> = new Map<string, string>();

        method?.parameters?.forEach((v) => {
            parameters.set(v.name, '');
        });
        return parameters;
    }

    function getParameter(key: string): OpenAPI.Parameter {
        let found: OpenAPI.Parameter;
        getOperation(currentOperation)?.parameters?.forEach((v: OpenAPI.Parameter) => {
            if (v.name.toString() === key) {
                found = v;
            }
        });
        return found;
    }

    function selectOperation(name: string) {
        const params: Map<string, string> = getParameters(getOperation(name));
        parameters.current = new Map(params);
        setCurrentOperation(name);
    }

    const dropdownOperationItems: Array<ReactElement> = [];
    props.endpoint.operations.forEach((v, method) => {
        dropdownOperationItems.push(
            <FormSelectOption label={method} key={method} value={method}/>
        );
    });

    const handleChange = (name: string, value: string) => {
        parameters.current.set(name, value);

        let uri = props.endpoint.name;
        let p = '';
        parameters.current.forEach((val, key) => {
            if (val) {
                const param: OpenAPI.Parameter = getParameter(key);
                if (param.in === 'path') {
                    uri = uri.replace(`{${key}}`, val);
                } else if (param.in === 'query') {
                    p = p + `&${key}=${val}`;
                }
            }
        });
        if (p.length > 0) {
            p = '?' + p.substr(1);
        }

        props.setUrl(uri + p);
    };

    const producesOptions: Array<ReactElement> = new Array<React.ReactElement>();
    getOperation(currentOperation)?.produces.forEach((p) => {
        producesOptions.push(<FormSelectOption key={p} label={p} value={p}/>);
    })

    const updateContentType = (value: string) => {
        props.setContentType(value);
        setCurrentContentType(value);
    }
    type PathProperties = { path: string };
    const PathField = (props: PathProperties) => {
        return <div>{props.path}</div>;
    };

    useEffect(() => {
        if (getOperation(initOperationName)?.produces)
            props.setContentType(getOperation(initOperationName)?.produces[0]);

        selectOperation(initOperationName);
    }, [props.endpoint])

    return (
        <div>
            {!props.isSource && <FormGroup label="Operation">
                <FormSelect aria-label='OperationSelect' onChange={selectOperation} value={currentOperation}
                            children={dropdownOperationItems}/>
            </FormGroup>}
            <FormGroup label="Produces">
                <FormSelect aria-label='ContentTypeSelect' onChange={updateContentType} value={currentContentType}>
                    {producesOptions}
                </FormSelect>
            </FormGroup>
            <ParamFields parameters={parameters.current} handleChange={handleChange}/>
            <FormGroup label='Info'>
                <Grid>
                    <GridItem span={6}>Summary</GridItem>
                    <GridItem span={6}>
                        <div>{getOperation(currentOperation)?.summary}</div>
                    </GridItem>

                    {getOperation(currentOperation)?.description && (
                        <div>
                            <GridItem span={6}>Description</GridItem>
                            <GridItem span={6}>
                                <div>{getOperation(currentOperation)?.description}</div>
                            </GridItem>
                        </div>
                    )}

                    <GridItem span={6}>Tags</GridItem>
                    <GridItem span={6}>
                        <Label>{getOperation(currentOperation)?.tags}</Label>
                    </GridItem>
                </Grid>
            </FormGroup>
        </div>
    );
};
