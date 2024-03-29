import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Grid,
  GridItem,
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
    <FormGroup key={'endpoint-block-' + elid + element['name']} data-testid={'endpoint-block-' + elid + element['name']}>
      <Card>
        <CardBody>
          <Grid>
            <GridItem span={2} rowSpan={4}>
              <Button
                variant='link'
                icon={<TrashIcon cellPadding={'1px'} />}
                className={'remove-do-catch'}
                data-element-id={elid}
                data-testid={'endpoint-remove-' + element['name']}
                onClick={() => { removeEndpoint(elid); }}
              />
            </GridItem>
            <GridItem span={10}>
              <Grid>
                <GridItem span={3} rowSpan={2}>
                  <label><strong>{verb.toUpperCase()}</strong></label>
                </GridItem>
                <GridItem span={9}>
                  <label>{element.name}</label>
                </GridItem>
                <GridItem span={9}>
                  <label>{element.path}</label>
                </GridItem>
                <GridItem span={3}>
                  <label>Produces: </label>
                </GridItem>
                <GridItem span={9}>
                  <MimeTypes
                    label="Produces"
                    onChange={(value: string) => updateMetaType(elid, verb, false, value)}
                    value={element.produce.get(verb) || ""}
                    values={operations} />
                </GridItem>
              </Grid>
              {
                element.consumes.size > 0 &&
                <Grid>
                  <GridItem span={3}>
                    <label>Consumes</label>
                  </GridItem>
                  <GridItem span={9}>
                    <MimeTypes
                      label="Consumes: "
                      onChange={(value: string) => updateMetaType(elid, verb, true, value)}
                      value={element.consume.get(verb) || ""}
                      values={element.consumes.get(verb) || []} />
                  </GridItem>
                </Grid>
              }
            </GridItem>
          </Grid>
        </CardBody>
      </Card>
    </FormGroup>
  );
}

export default Endpoint;
