import {Predicate} from './Predicate';
import {Button, Grid, GridItem, Title} from '@patternfly/react-core';
import {TrashIcon} from '@patternfly/react-icons';

export type BranchProps = {
  condition?: string;
  conditionSyntax?: string;
  identifier: string;
  title: string;
  isConditioned: boolean
  setCondition: (syntax: string, condition: string) => void;
  onDelete: () => void;
  hasExpressionObject: boolean;
}

export const Branch = (props: BranchProps) => {

  function handleCondition(syntax: string, predicate: string) {
    props.setCondition(syntax, predicate);
  }

  return (
    <Grid>
      <GridItem span={11}>
        <Title headingLevel={"h6"}>
          {props.title}
        </Title>
      </GridItem>
      <GridItem span={1}>
        <Button
          variant="link"
          icon={<TrashIcon />}
          onClick={props.onDelete}
          data-testid={`remove-branch-${props.identifier}-button`}
        >
        </Button>
      </GridItem>
      <GridItem span={12}>
        {props.isConditioned && (
          <Predicate
            identifier={props.identifier}
            initSyntax={props.conditionSyntax || 'SIMPLE'}
            initExpression={props.condition || ''}
            setPredicate={handleCondition}
            hasExpressionObject={props.hasExpressionObject}
          />
        )}
      </GridItem>
    </Grid>
  );
};

export default Branch;
