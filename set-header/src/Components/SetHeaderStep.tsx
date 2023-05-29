import { ActionGroup, Button, Form, FormGroup, TextInput } from '@patternfly/react-core';
import { Expression } from 'common/src/expression';
import { useState } from 'react';

type SetHeaderStepParams = {
  name: string;
  constant?: string;
  simple?: string;
  jq?: string;
};

export const SetHeaderStep = (props: any) => {
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

  const [headerName, setHeaderName] = useState<string>(props.stepParams?.name || '')
  const [stepParams, setStepParams] = useState<SetHeaderStepParams>({
    name: headerName,
    constant: props.stepParams?.constant,
    simple: props.stepParams?.simple,
    jq: props.stepParams?.jq,
  });

  function updateKaoto() {
    props.notifyKaoto('Set Header step updated');
    props.updateStepParams(stepParams);
  }

  function updateStepParams(constant?: string, simple?: string, jq?: string) {
    const newStepParams: SetHeaderStepParams =
      { name: headerName, constant, simple, jq };
    setStepParams(newStepParams);
  }

  function updateHeaderName(name: string) {
    setHeaderName(name);
    const newStepParams: SetHeaderStepParams = {
      name,
      constant: stepParams.constant,
      simple: stepParams.simple,
      jq: stepParams.jq
    };
    setStepParams(newStepParams);
  }

  return (
    <Form>
      <FormGroup label="Name">
        <TextInput data-testid='set-header-name-input' value={headerName} aria-label="name" onChange={updateHeaderName} />
      </FormGroup>
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
        <Button data-testid='set-header-apply-button' variant="primary" onClick={updateKaoto}>
          Apply
        </Button>
      </ActionGroup>
    </Form>
  );
};

export default SetHeaderStep;
