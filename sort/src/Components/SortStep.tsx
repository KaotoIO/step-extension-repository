import { Expression } from 'common';
import { ActionGroup, Button, FormGroup, Form, TextInput } from '@patternfly/react-core';
import { useState } from 'react';

type SetSortStepParams = {
  tokenize?: string;
  comparator?: string;
  constant?: string;
  simple?: string;
  jq?: string;
};

export const SortStep = (props: any) => {
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

  const [propertyTokenize, setPropertyTokenize] = useState<string>(props.stepParams?.tokenize || '')
  const [propertyComparator, setPropertyComparator] = useState<string>(props.stepParams?.comparator || '')
  const [stepParams, setStepParams] = useState<SetSortStepParams>({
    tokenize: propertyTokenize,
    comparator: propertyComparator,
    constant: props.stepParams?.constant,
    simple: props.stepParams?.simple,
    jq: props.stepParams?.jq,
  });

  function updatePropertyComparator(comparator: string) {
    setPropertyComparator(comparator);
    const newStepParams: SetSortStepParams = {
      tokenize: stepParams?.tokenize,
      comparator,
      constant: stepParams?.constant,
      simple: stepParams?.simple,
      jq: stepParams?.jq
    };
    setStepParams(newStepParams);
  }

  function updatePropertyTokenizer(tokenize: string) {
    setPropertyTokenize(tokenize);
    const newStepParams: SetSortStepParams = {
      tokenize,
      comparator: stepParams?.comparator,
      constant: stepParams?.constant,
      simple: stepParams?.simple,
      jq: stepParams?.jq
    };
    setStepParams(newStepParams);
  }

  function updateKaoto() {
    props.notifyKaoto('Set Body step updated');
    props.updateStepParams(stepParams);
  }

  function updateStepParams(constant?: string, simple?: string, jq?: string) {
    const newStepParams: SetSortStepParams =
      { tokenize: propertyTokenize, comparator: propertyComparator, constant, simple, jq };
    setStepParams(newStepParams);
  }

  return (
    <Form>
      <FormGroup label="Comparator">
        <TextInput data-testid='set-comparator-input' value={propertyComparator}
          aria-label="comparator" onChange={updatePropertyComparator} />
      </FormGroup>
      <FormGroup label="Tokenize">
        <TextInput data-testid='set-tokenize-input' value={propertyTokenize}
          aria-label="tokenize" onChange={updatePropertyTokenizer} />
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
        <Button data-testid='set-sort-apply-button' variant="primary" onClick={updateKaoto}>
          Apply
        </Button>
      </ActionGroup>
    </Form>
  );
};

export default SortStep;
