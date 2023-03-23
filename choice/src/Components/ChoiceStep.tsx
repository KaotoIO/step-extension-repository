import {Branch} from './Branch';
import {
  ActionGroup,
  Button,
  Card,
  CardBody,
  Flex,
  FlexItem,
  Form,
  Stack,
  StackItem
} from '@patternfly/react-core';
import {PlusCircleIcon} from '@patternfly/react-icons';
import {useState} from 'react';

type BranchProps = {
  condition: string | null,
  conditionSyntax: string,
  identifier: string,
  parameters: any[],
  steps: any[]
}

type ChoiceStepProperties = {
  branches?: BranchProps[];
};

export const ChoiceStep = (props: any) => {
  const [step, setStep] = useState<ChoiceStepProperties>(props.step);
  const [hasOtherwise, setHasOtherwise] = useState<boolean>(() => {
    if (!step?.branches || step?.branches.length < 1) {
    return false;
    }
    const maybeOtherwise = step?.branches[step.branches?.length - 1];
    return maybeOtherwise.identifier === 'otherwise';
  });

  function updateKaoto() {
    props.notifyKaoto('Choice step updated');
    props.updateStep(step);
  }

  function setCondition(branch: BranchProps, condition: string, syntax: string) {
    branch.condition = condition;
    branch.conditionSyntax = syntax;
    setStep(step);
  }

  function handleDeleteBranch(branch: BranchProps) {
    const index = step.branches?.indexOf(branch);
    if (step.branches && index != undefined && index !== -1) {
      const newBranches = step.branches.filter((_b, i) => i !== index);
      step.branches = newBranches;
      const isOtherwise = branch.identifier === 'otherwise';
      if (isOtherwise) {
        setHasOtherwise(false);
      }
      setStep(step);
      props.notifyKaoto(`${isOtherwise ? 'Otherwise' : 'When: ' + (index+1)} deleted`);
      props.updateStep(step);
    }
  }

  function addWhen() {
    const newWhen = {
      condition: '',
      conditionSyntax: 'SIMPLE',
      identifier: '',
      parameters: [],
      steps: []
    }
    let index = -1;
    if (!step.branches) {
      step.branches = [newWhen];
      index = 0;
    } else {
      index = hasOtherwise ? step.branches?.length - 1 : step.branches?.length;
      step.branches.splice(index, 0, newWhen);
    }
    newWhen.identifier = `when-${index}`;
    setStep(step);
    props.notifyKaoto(`When: ${index+1} added`);
    props.updateStep(step);
  }

  function addOtherwise() {
    const newOtherwise = {
      condition: null,
      conditionSyntax: 'SIMPLE',
      identifier: 'otherwise',
      parameters: [],
      steps: []
    }
    if (!step.branches) {
      step.branches = [newOtherwise];
    } else {
      step.branches?.push(newOtherwise);
    }
    setHasOtherwise(true);
    setStep(step);
    props.notifyKaoto('Otherwise added');
    props.updateStep(step);
  }

  const renderBranch = (branch: BranchProps, index: number) => {
    const identifier = `${branch.identifier === 'otherwise' ? 'otherwise' : 'when-' + index}`;
    const title = branch.identifier === 'otherwise' ? 'Otherwise' : `When: ${index + 1}`;
    return (
      <StackItem key={"choice-branch-" + index}>
        <Card>
          <CardBody>
            <Branch
              condition={branch.condition || ''}
              conditionSyntax={branch.conditionSyntax}
              isConditioned={branch.identifier !== 'otherwise'}
              identifier={identifier}
              title={title}
              setCondition={(syntax, condition) => setCondition(branch, condition, syntax)}
              onDelete={() => handleDeleteBranch(branch)}
            />
          </CardBody>
        </Card>
      </StackItem>
    );
  }

  return (
    <Form>
      <Stack>
        <StackItem key="choice-add-buttons">
          <Flex>
            <FlexItem align={{ default: 'alignRight' }}>
              <Button variant="link" icon={<PlusCircleIcon />} data-testid='choice-add-when-button' onClick={addWhen}>
                When
              </Button>
            </FlexItem>
            <FlexItem>
              <Button  variant="link" icon={<PlusCircleIcon />} data-testid='choice-add-otherwise-button' onClick={addOtherwise} isDisabled={hasOtherwise}>
                Otherwise
              </Button>
            </FlexItem>
          </Flex>
        </StackItem>
        {step?.branches?.map(renderBranch)}
        <StackItem key="choice-apply-button">
          <ActionGroup>
            <Button data-testid='choice-apply-button' variant="primary" onClick={updateKaoto}>
              Apply
            </Button>
          </ActionGroup>
        </StackItem>
      </Stack>
    </Form>
  );
};

export default ChoiceStep;
