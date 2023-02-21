import { Checkbox, Form, FormGroup, TextInput } from '@patternfly/react-core';
import { FormEvent, useCallback, useState } from 'react';
import { CommonDefinition, commonDefinitionInitialState, CommonProps } from '../models';

export function Common({ initialValue, onChange }: CommonProps<CommonDefinition>) {
  const [commonDefinition, setCommonDefinition] = useState<CommonDefinition>({
    description: initialValue?.description ?? commonDefinitionInitialState.description,
    configuration: initialValue?.configuration ?? commonDefinitionInitialState.configuration,
    disabled: initialValue?.disabled ?? commonDefinitionInitialState.disabled,
  });

  const focusTextInput = useCallback((element: HTMLInputElement) => {
    element?.focus();
  }, []);

  const handleCommonDefinitionChange = useCallback((value: string | boolean, event: FormEvent<HTMLInputElement>): void => {
    const fieldName = event.currentTarget.name;
    let updatedValue: CommonDefinition = {};

    switch (fieldName) {
      case 'text':
        updatedValue = { ...commonDefinition, description: { ...commonDefinition.description, text: value as string } };
        break;

      case 'language':
        updatedValue = { ...commonDefinition, description: { ...commonDefinition.description, language: value as string } };
        break;

      case 'disabled':
        updatedValue = { ...commonDefinition, disabled: value as boolean };
        break;

      case 'configuration':
        updatedValue = { ...commonDefinition, configuration: value as string };
        break;

      default:
        console.error(`'${fieldName}' it is not a valid property of Circuit Breaker step`);
        break;
    }

    setCommonDefinition(updatedValue);
    onChange(updatedValue);
  }, [commonDefinition, onChange]);

  return <Form>
    <FormGroup
      label="Text"
      fieldId="text"
      helperText=<span>The description as human readable text</span>
    >
      <TextInput
        type="text"
        ref={focusTextInput}
        id="text"
        name="text"
        aria-describedby="text"
        value={commonDefinition.description?.text}
        onChange={handleCommonDefinitionChange}
      />
    </FormGroup>

    <FormGroup
      label="Language"
      fieldId="language"
      helperText=<span>Language, such as <strong>'en'</strong> for english or <strong>'es'</strong> for spanish.</span>
    >
      <TextInput
        type="text"
        id="language"
        name="language"
        aria-describedby="language"
        value={commonDefinition.description?.language}
        onChange={handleCommonDefinitionChange}
      />
    </FormGroup>

    <FormGroup
      fieldId="disabled"
      helperText=<span>Whether to disable this EIP from the route during build time. Once an EIP has been disabled then it cannot be enabled later at runtime.</span>
    >
      <Checkbox
        id="disabled"
        label=<span><strong>Disabled</strong></span>
        name="disabled"
        aria-describedby="disabled"
        isChecked={commonDefinition.disabled}
        onChange={handleCommonDefinitionChange}
      />
    </FormGroup>

    <FormGroup
      label="Configuration"
      fieldId="configuration"
      helperText=<span>Refers to a circuit breaker configuration (such as resillience4j, or microprofile-fault-tolerance) to use for configuring the circuit breaker EIP.</span>
    >
      <TextInput
        type="text"
        id="configuration"
        name="configuration"
        aria-describedby="configuration"
        value={commonDefinition.configuration}
        onChange={handleCommonDefinitionChange}
      />
    </FormGroup>
  </Form>
};
