import { fireEvent, render, screen } from '@testing-library/react';
import SetHeaderStep from "./SetHeaderStep";

test('renders SetHeaderStep', () => {
  let notifyKaotoCount = 0;
  let stepParams: any = {};
  render(<SetHeaderStep
    notifyKaoto={() => notifyKaotoCount++}
    updateStepParams={(p: any) => stepParams = p}
  />);
  const headerNameInput = screen.getByTestId('set-header-name-input');
  expect(headerNameInput).toBeInTheDocument();
  fireEvent.change(headerNameInput, { target: { value: 'testheader'}});

  const expressionSyntaxSelect = screen.getByTestId('expression-syntax-select');
  expect(expressionSyntaxSelect).toBeInTheDocument();
  expect(expressionSyntaxSelect.children.length).toBe(3);
  fireEvent.change(expressionSyntaxSelect, { target: { value: 'jq'}});

  const expressionStringInput = screen.getByTestId('expression-string-input');
  expect(expressionStringInput).toBeInTheDocument();
  fireEvent.change(expressionStringInput, { target: { value: '.field3'}});

  const applyBtn = screen.getByTestId('set-header-apply-button');
  expect(applyBtn).toBeInTheDocument();
  fireEvent.click(applyBtn);
  expect(notifyKaotoCount).toBe(1);
  expect(stepParams.name).toBe('testheader');
  expect(stepParams.jq).toBe('.field3');
  expect(stepParams.constant).toBeFalsy();
  expect(stepParams.simple).toBeFalsy();
});

test('renders SetHeaderStep with initial jq expression', () => {
  let notifyKaotoCount = 0;
  render(<SetHeaderStep
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

test('renders SetHeaderStep with initial constant expression', () => {
  let notifyKaotoCount = 0;
  render(<SetHeaderStep
    notifyKaoto={() => notifyKaotoCount++}
    updateStepParams={() => {}}
    stepParams={{
      name: 'someheader',
      constant: 'propval'
    }}
  />);
  const headerNameInput = screen.getByTestId('set-header-name-input');
  expect(headerNameInput).toHaveValue('someheader');
  const expressionSyntaxSelect = screen.getByTestId('expression-syntax-select');
  expect(expressionSyntaxSelect).toHaveValue('constant');
  const expressionStringInput = screen.getByTestId('expression-string-input');
  expect(expressionStringInput).toHaveValue('propval');
});
