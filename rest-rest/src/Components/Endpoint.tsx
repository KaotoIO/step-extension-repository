import {
  Button,
  Card,
  CardBody,
  Flex,
  FlexItem,
  Form,
  Stack,
  StackItem,
} from '@patternfly/react-core';
import { TrashIcon } from '@patternfly/react-icons';
import { IEndpoint } from './RestStep';
import MimeTypes from './MimeTypes';

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

  const updateMetaType = (index: number, verb: string, type: boolean, value: string) => {
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
      <Card>
        <CardBody>
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
                  <MimeTypes label="Produces"
                    onChange={(value: string) => updateMetaType(elid, verb, false, value)} 
                    value={element.produce.get(verb) || ""}
                    values={operations} />
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
                    <MimeTypes label="Consumes"
                      onChange={(value: string) => updateMetaType(elid, verb, true, value)}
                      value={element.consume.get(verb) || ""}
                      values={element.consumes.get(verb) || []} />
                  </FlexItem>
                </Flex>
              </StackItem>
            }
          </Stack>
        </CardBody>
      </Card>
    </Form>
  );
}

export default Endpoint;
