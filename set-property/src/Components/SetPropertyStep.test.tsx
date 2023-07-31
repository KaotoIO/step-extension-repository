import { fireEvent, render, screen } from '@testing-library/react';
// @ts-ignore
import { IStepProps } from 'kaoto/types';
import SetPropertyStep from "./SetPropertyStep";

test('renders SetPropertyStep', () => {
  let notifyKaotoCount = 0;
  let step: IStepProps = {
    parameters: [
      {id: "jq", value: null},
      {id: "name", value: null},
      {id: "constant", value: null},
      {id: "simple", value: null}
    ],
  };

  render(<SetPropertyStep
    notifyKaoto={() => notifyKaotoCount++}
    updateStep={(p: IStepProps) => step = p}
    step={step}
  />);
  const propertyNameInput = screen.getByTestId('set-property-name-input');
  expect(propertyNameInput).toBeInTheDocument();
  fireEvent.change(propertyNameInput, { target: { value: 'testprop'}});

  const expressionSyntaxSelect = screen.getByTestId('expression-syntax-select');
  expect(expressionSyntaxSelect).toBeInTheDocument();
  expect(expressionSyntaxSelect.children.length).toBe(3);
  fireEvent.change(expressionSyntaxSelect, { target: { value: 'jq'}});

  const expressionStringInput = screen.getByTestId('expression-string-input');
  expect(expressionStringInput).toBeInTheDocument();
  fireEvent.change(expressionStringInput, { target: { value: '.field3'}});

  const applyBtn = screen.getByTestId('set-property-apply-button');
  expect(applyBtn).toBeInTheDocument();
  fireEvent.click(applyBtn);
  expect(notifyKaotoCount).toBe(1);
  expect(findStepValue(step, "name")).toBe('testprop');
  expect(findStepValue(step, "jq")).toBe('.field3');
  expect(findStepValue(step, "constant")).toBeFalsy();
  expect(findStepValue(step, "simple")).toBeFalsy();
});

test('renders SetPropertyStep with initial jq expression', () => {
  let notifyKaotoCount = 0;
  render(<SetPropertyStep
    notifyKaoto={() => notifyKaotoCount++}
    updateStepParams={() => {}}
    stepParams={{
      jq: '.field3'
    }}
  />);
  const expressionSyntaxSelect = screen.getByTestId('expression-syntax-select');
  expect(expressionSyntaxSelect).toHaveValue('jq');
  const expressionStringInput = screen.getByTestId('expression-string-input');
  expect(expressionStringInput).toHaveValue('.field3');
});

test('renders SetPropertyStep with initial constant expression', () => {
  let notifyKaotoCount = 0;
  render(<SetPropertyStep
    notifyKaoto={() => notifyKaotoCount++}
    updateStepParams={() => {}}
    stepParams={{
      name: 'someprop',
      constant: 'propval'
    }}
  />);
  const propertyNameInput = screen.getByTestId('set-property-name-input');
  expect(propertyNameInput).toHaveValue('someprop');
  const expressionSyntaxSelect = screen.getByTestId('expression-syntax-select');
  expect(expressionSyntaxSelect).toHaveValue('constant');
  const expressionStringInput = screen.getByTestId('expression-string-input');
  expect(expressionStringInput).toHaveValue('propval');
});

function findStepValue(step: IStepProps, key: string) {
  const paramIndex = step.parameters.findIndex((p: any) => p.id === key);
  return step.parameters[paramIndex].value
}
