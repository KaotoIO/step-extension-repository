import { fireEvent, render, screen } from '@testing-library/react';
import TransformStep from "./TransformStep";

test('renders TransformStep', () => {
  let notifyKaotoCount = 0;
  let stepParams: any = {};
  render(<TransformStep
    notifyKaoto={() => notifyKaotoCount++}
    updateStepParams={(p: any) => {stepParams = p}}
  />);
  const expressionSyntaxSelect = screen.getByTestId('expression-syntax-select');
  expect(expressionSyntaxSelect).toBeInTheDocument();
  expect(expressionSyntaxSelect.children.length).toBe(2);
  fireEvent.change(expressionSyntaxSelect, { target: { value: 'jq'}});

  const expressionStringInput = screen.getByTestId('expression-string-input');
  expect(expressionStringInput).toBeInTheDocument();
  fireEvent.change(expressionStringInput, { target: { value: '.field3'}});

  const applyBtn = screen.getByTestId('transform-apply-button');
  expect(applyBtn).toBeInTheDocument();
  fireEvent.click(applyBtn);
  expect(notifyKaotoCount).toBe(1);
  expect(stepParams.jq).toBe('.field3');
  expect(stepParams.simple).toBeFalsy();
});

test('renders TransformStep with initial jq expression', () => {
  let notifyKaotoCount = 0;
  render(<TransformStep
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