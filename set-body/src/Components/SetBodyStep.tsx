import { Expression } from 'common';
// @ts-ignore
import { IStepProps } from '../types';
import { ActionGroup, Button, Form } from '@patternfly/react-core';
import { useState } from 'react';

type SetBodyStepParams = {
  constant?: string;
  simple?: string;
  jq?: string;
};

export const SetBodyStep = (props: any) => {
  let initSyntax;
  let initExpression;
  if (props.stepParams?.jq) {
    initSyntax = 'jq';
    initExpression = props.stepParams?.jq || '';
  } else if (props.stepParams?.constant) {
    initSyntax = 'constant';
    initExpression = props.stepParams?.constant || '';
  } else {
    initSyntax = 'simple';
    initExpression = props.stepParams?.simple || '';
  }

  const [stepParams, setStepParams] = useState<SetBodyStepParams>({
    constant: props.stepParams?.constant,
    simple: props.stepParams?.simple,
    jq: props.stepParams?.jq,
  });

  function updateKaoto() {
    props.notifyKaoto('Set Body step updated');
    let newStep: IStepProps = props.step;
    const newStepParameters = newStep.parameters?.slice();
    Object.entries(stepParams).forEach(([key, value]) => {
      const paramIndex = newStepParameters.findIndex((p: any) => p.id === key);
      newStepParameters[paramIndex].value = value;
    });
    props.updateStep(newStep);
  }

  function updateStepParams(constant?: string, simple?: string, jq?: string) {
    const newStepParams: SetBodyStepParams = { constant, simple, jq };
    setStepParams(newStepParams);
  }

  return (
    <Form>
      <Expression
        initSyntax={initSyntax}
        initExpression={initExpression}
        setExpression={(syntax: string, expression: string) => {
          const constant = syntax === 'constant' ? expression : undefined;
          const simple = syntax === 'simple' ? expression : undefined;
          const jq = syntax === 'jq' ? expression : undefined;
          updateStepParams(constant, simple, jq);
        }}
        hasExpressionObject={props?.stepParams?.expression != null}
      />

      <ActionGroup>
        <Button data-testid='set-body-apply-button' variant="primary" onClick={updateKaoto}>
          Apply
        </Button>
      </ActionGroup>
    </Form>
  );
};

export default SetBodyStep;
