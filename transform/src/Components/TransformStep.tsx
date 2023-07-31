import { Expression } from './Expression';
// @ts-ignore
import { IStepProps } from 'kaoto/types';
import { ActionGroup, Button, Form } from '@patternfly/react-core';
import { useState } from 'react';

type TransformStepParams = {
  simple?: string;
  jq?: string;
};

export const TransformStep = (props: any) => {
  let initSyntax;
  let initExpression;
  if (props.stepParams?.jq) {
    initSyntax = 'jq';
    initExpression = props.stepParams?.jq || '';
  } else {
    initSyntax = 'simple';
    initExpression = props.stepParams?.simple || '';
  }

  const [stepParams, setStepParams] = useState<TransformStepParams>({
    simple: props.stepParams?.simple,
    jq: props.stepParams?.jq,
  });

  function updateKaoto() {
    props.notifyKaoto('Transform step updated');
    let newStep: IStepProps = props.step;
    const newStepParameters = newStep.parameters?.slice();
    Object.entries(stepParams).forEach(([key, value]) => {
      const paramIndex = newStepParameters.findIndex((p: any) => p.id === key);
      newStepParameters[paramIndex].value = value;
    });
    props.updateStep(newStep);
  }

  function updateStepParams(simple?: string, jq?: string) {
    const newStepParams: TransformStepParams = { simple, jq };
    setStepParams(newStepParams);
  }

  return (
    <Form>
      <Expression
        initSyntax={initSyntax}
        initExpression={initExpression}
        setExpression={(syntax: string, expression: string) => {
          const simple = syntax === 'simple' ? expression : undefined;
          const jq = syntax === 'jq' ? expression : undefined;
          updateStepParams(simple, jq);
        }}
        hasExpressionObject={props?.stepParams?.expression != null}
      />

      <ActionGroup>
        <Button variant="primary" data-testid='transform-apply-button' onClick={updateKaoto}>
          Apply
        </Button>
      </ActionGroup>
    </Form>
  );
};

export default TransformStep;
