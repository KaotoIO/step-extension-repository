import {Expression} from 'common';
import {ActionGroup, Button, Form, FormGroup, TextInput} from '@patternfly/react-core';
import {useState} from 'react';

type SetPropertyStepParams = {
  name: string;
  constant?: string;
  simple?: string;
  jq?: string;
};

export const SetPropertyStep = (props: any) => {
  let initSyntax;
  let initExpression;
  if (props.stepParams?.jq) {
    initSyntax = 'jq';
    initExpression = props.stepParams?.jq || '';
  } else if (props.stepParams?.constant) {
    initSyntax = 'constant';
    initExpression = props.stepParams?.constant || ''
  } else {
    initSyntax = 'simple';
    initExpression = props.stepParams?.simple || '';
  }

  const [propertyName, setPropertyName] = useState<string>(props.stepParams?.name || '');
  const [stepParams, setStepParams] = useState<SetPropertyStepParams>({
    name: propertyName,
    constant: props.stepParams?.constant,
    simple: props.stepParams?.simple,
    jq: props.stepParams?.jq,
  });

  function updateKaoto() {
    props.notifyKaoto('Set Property step updated');
    props.updateStepParams(stepParams);
  }

  function updateStepParams(constant?: string, simple?: string, jq?: string) {
    const newStepParams: SetPropertyStepParams =
      { name: propertyName, constant, simple, jq, };
    setStepParams(newStepParams);
  }

  function updatePropertyName(name: string) {
    setPropertyName(name);
    const newStepParams: SetPropertyStepParams = {
      name,
      constant: stepParams?.constant,
      simple: stepParams?.simple,
      jq: stepParams?.jq
    };
    setStepParams(newStepParams);
  }

  return (
    <Form>
      <FormGroup label="Name">
        <TextInput data-testid='set-property-name-input' value={propertyName}  aria-label="name" onChange={updatePropertyName} />
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
        <Button variant="primary" data-testid='set-property-apply-button' onClick={updateKaoto}>
          Apply
        </Button>
      </ActionGroup>
    </Form>
  );
};

export default SetPropertyStep;
