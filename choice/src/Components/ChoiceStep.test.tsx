import { fireEvent, render, screen } from '@testing-library/react';
import ChoiceStep from "./ChoiceStep";

test('renders ChoiceStep', () => {
  let notifyKaotoCount = 0;
  let step: any = {};
  render(<ChoiceStep
    notifyKaoto={() => notifyKaotoCount++}
    updateStep={(p: any) => step = p}
    step={{
      branches: [
        {
          condition: 'foo',
          conditionSyntax: 'SIMPLE',
          identifier: 'foo',
        },
        {
          condition: 'bar',
          conditionSyntax: 'SIMPLE',
          identifier: 'bar',
        },
        {
          condition: null,
          conditionSyntax: 'SIMPLE',
          identifier: 'otherwise',
        },
      ]
    }}
  />);

  const expressionSyntaxSelect = screen.getByTestId('when-0-predicate-syntax-select');
  expect(expressionSyntaxSelect).toBeInTheDocument();
  expect(expressionSyntaxSelect.children.length).toBe(2);
  fireEvent.change(expressionSyntaxSelect, { target: { value: 'JQ'}});

  const expressionStringInput = screen.getByTestId('when-0-predicate-string-input');
  expect(expressionStringInput).toBeInTheDocument();
  fireEvent.change(expressionStringInput, { target: { value: '.field3 = "aaa"'}});

  const applyBtn = screen.getByTestId('choice-apply-button');
  expect(applyBtn).toBeInTheDocument();
  fireEvent.click(applyBtn);

  const removeOtherwiseBtn = screen.getByTestId('remove-branch-otherwise-button');
  expect(removeOtherwiseBtn).toBeInTheDocument();
  expect(step.branches.length).toBe(3);
  fireEvent.click(removeOtherwiseBtn);
  expect(step.branches.length).toBe(2);

  const addWhenBtn = screen.getByTestId('choice-add-when-button');
  expect(addWhenBtn).toBeInTheDocument();
  fireEvent.click(addWhenBtn);
  expect(step.branches.length).toBe(3);

  const addOtherwiseBtn = screen.getByTestId('choice-add-otherwise-button');
  expect(addOtherwiseBtn).toBeInTheDocument();
  fireEvent.click(addOtherwiseBtn);
  expect(step.branches.length).toBe(4);

  expect(notifyKaotoCount).toBe(4);
  expect(step.branches[0].conditionSyntax).toBe('JQ');
  expect(step.branches[0].condition).toBe('.field3 = "aaa"');
});

test('renders ChoiceStep with initial branches', () => {
  let notifyKaotoCount = 0;
  render(<ChoiceStep
    notifyKaoto={() => notifyKaotoCount++}
    updateStep={() => {}}
    step={{
      branches: [
        {
          condition: 'foo',
          conditionSyntax: 'SIMPLE',
          identifier: 'foo',
        },
        {
          condition: '.field3 == "bar"',
          conditionSyntax: 'JQ',
          identifier: '.field3 == "bar"',
        },
        {
          condition: null,
          conditionSyntax: 'SIMPLE',
          identifier: 'otherwise',
        },
      ]
    }}
  />);
  const expressionSyntaxSelect0 = screen.getByTestId('when-0-predicate-syntax-select');
  expect(expressionSyntaxSelect0).toHaveValue('SIMPLE');
  const expressionStringInput0 = screen.getByTestId('when-0-predicate-string-input');
  expect(expressionStringInput0).toHaveValue('foo');
  const expressionSyntaxSelect1 = screen.getByTestId('when-1-predicate-syntax-select');
  expect(expressionSyntaxSelect1).toHaveValue('JQ');
  const expressionStringInput1 = screen.getByTestId('when-1-predicate-string-input');
  expect(expressionStringInput1).toHaveValue('.field3 == "bar"');
});
