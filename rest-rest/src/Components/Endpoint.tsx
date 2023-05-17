import {
  Button,
  Flex,
  FlexItem,
  Form,
  FormSelect,
  FormSelectOption,
  Stack,
  StackItem,
} from '@patternfly/react-core';
import { Key } from 'react';
import { TrashIcon } from '@patternfly/react-icons';
import { IEndpoint } from './RestStep.js';

export interface IEndpointForm {
  elid: number;
  element: IEndpoint;
  verb: string;
  operations: string[];
  setEndpoints: any;
  endpoints: IEndpoint[];
}

export const Endpoint = ({ elid, element, verb, operations, setEndpoints, endpoints }: IEndpointForm) => {

  const removeEndpoint = (index: number) => {
    endpoints.splice(index, 1);
    setEndpoints(endpoints.slice());
  };
  
  const updateMetaType = (index: number, verb: string, type: boolean, value: string, event: any) => {
    let endpoint = endpoints[index];
    let operation = endpoint.produce;
    if (type) {
      operation = endpoint.consume;
    }
    operation.set(verb, value);
    setEndpoints(endpoints.slice());
  };


  return (
    <Form key={'endpoint-block-' + elid + element['name']}>
      <Stack>
        <StackItem>
          <Flex>
            <FlexItem align={{ default: 'alignLeft' }}>
              <Button
                variant='link'
                icon={<TrashIcon />}
                className={'remove-do-catch'}
                data-element-id={elid}
                data-testid={'endpoint-remove-' + element['name']}
                onClick={() => { removeEndpoint(elid); }}
              />
              <label><strong>{verb.toUpperCase()}</strong>&nbsp;{element['name']}</label>
            </FlexItem>
          </Flex>
        </StackItem>
        <StackItem>
          <Flex>
            <FlexItem align={{ default: 'alignLeft' }}>
              <label>Produces</label>
            </FlexItem>
            <FlexItem align={{ default: 'alignLeft' }}>
              <FormSelect
                label="Produces"
                aria-label='OperationSelect'
                onChange={(value, event) => updateMetaType(elid, verb, false, value, event)}
                value={element.produce.get(verb)}>
                {
                  operations.map((option: string, index: Key | null | undefined) => (
                    <FormSelectOption key={"p-" + verb + index} value={option} label={option} />
                  ))
                }
              </FormSelect>
            </FlexItem>
          </Flex>
        </StackItem>
        {
          element.consumes.size > 0 &&
          <StackItem>
            <Flex>
              <FlexItem align={{ default: 'alignLeft' }}>
                <label>Consumes</label>
              </FlexItem>
              <FlexItem align={{ default: 'alignLeft' }}>
                <FormSelect
                  label="Consumes"
                  aria-label='OperationSelect'
                  onChange={(value, event) => updateMetaType(elid, verb, true, value, event)}
                  value={element.consume.get(verb)}>
                  {
                    element.consumes.get(verb).map((option: string, index: Key | null | undefined) => (
                      <FormSelectOption key={"c-" + verb + index} value={option} label={option} />
                    ))
                  }
                </FormSelect>
              </FlexItem>
            </Flex>
          </StackItem>
        }
      </Stack>
    </Form>
  );
}

export default Endpoint;
