import { fireEvent, render, screen } from '@testing-library/react';
import SetBodyStep from "./SetBodyStep";

test('renders SetBodyStep', () => {
  let notifyKaotoCount = 0;
  let stepParams: any = {};
  render(<SetBodyStep
    notifyKaoto={() => notifyKaotoCount++}
    updateStepParams={(p: any) => stepParams = p}
  />);

  const expressionSyntaxSelect = screen.getByTestId('expression-syntax-select');
  expect(expressionSyntaxSelect).toBeInTheDocument();
  expect(expressionSyntaxSelect.children.length).toBe(3);
  fireEvent.change(expressionSyntaxSelect, { target: { value: 'jq'}});

  const expressionStringInput = screen.getByTestId('expression-string-input');
  expect(expressionStringInput).toBeInTheDocument();
  fireEvent.change(expressionStringInput, { target: { value: '.field3'}});

  const applyBtn = screen.getByTestId('set-body-apply-button');
  expect(applyBtn).toBeInTheDocument();
  fireEvent.click(applyBtn);
  expect(notifyKaotoCount).toBe(1);
  expect(stepParams.jq).toBe('.field3');
  expect(stepParams.constant).toBeFalsy();
  expect(stepParams.simple).toBeFalsy();
});

test('renders SetBodyStep with initial jq expression', () => {
  let notifyKaotoCount = 0;
  render(<SetBodyStep
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

test('renders SetBodyStep with initial constant expression', () => {
  let notifyKaotoCount = 0;
  render(<SetBodyStep
    notifyKaoto={() => notifyKaotoCount++}
    updateStepParams={() => {}}
    stepParams={{
      constant: 'propval'
    }}
  />);
  const expressionSyntaxSelect = screen.getByTestId('expression-syntax-select');
  expect(expressionSyntaxSelect).toHaveValue('constant');
  const expressionStringInput = screen.getByTestId('expression-string-input');
  expect(expressionStringInput).toHaveValue('propval');
});
