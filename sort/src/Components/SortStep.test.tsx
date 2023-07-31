import { fireEvent, render, screen } from '@testing-library/react';
// @ts-ignore
import { IStepProps } from 'kaoto/types';
import SortStep from "./SortStep";

test('renders SortStep', () => {
  let notifyKaotoCount = 0;
  let step: IStepProps = {
    parameters: [
      { id: "jq", value: null },
      { id: "constant", value: null },
      { id: "simple", value: null },
      { id: "tokenize", value: null },
      { id: "comparator", value: null },
    ],
  };

  render(<SortStep
    notifyKaoto={() => notifyKaotoCount++}
    updateStep={(p: IStepProps) => step = p}
    step={step}
  />);
  const comparatorInput = screen.getByTestId('set-comparator-input');
  expect(comparatorInput).toBeInTheDocument();
  fireEvent.change(comparatorInput, { target: { value: 'testComparator' } });

  const tokenizeInput = screen.getByTestId('set-tokenize-input');
  expect(tokenizeInput).toBeInTheDocument();
  fireEvent.change(tokenizeInput, { target: { value: 'testTokenize' } });

  const expressionSyntaxSelect = screen.getByTestId('expression-syntax-select');
  expect(expressionSyntaxSelect).toBeInTheDocument();
  expect(expressionSyntaxSelect.children.length).toBe(3);
  fireEvent.change(expressionSyntaxSelect, { target: { value: 'jq' } });

  const expressionStringInput = screen.getByTestId('expression-string-input');
  expect(expressionStringInput).toBeInTheDocument();
  fireEvent.change(expressionStringInput, { target: { value: '.field3' } });

  const applyBtn = screen.getByTestId('set-sort-apply-button');
  expect(applyBtn).toBeInTheDocument();
  fireEvent.click(applyBtn);
  expect(notifyKaotoCount).toBe(1);
  expect(findStepValue(step, "comparator")).toBe('testComparator');
  expect(findStepValue(step, "tokenize")).toBe('testTokenize');
  expect(findStepValue(step, "jq")).toBe('.field3');
  expect(findStepValue(step, "constant")).toBeFalsy();
  expect(findStepValue(step, "simple")).toBeFalsy();
});

function findStepValue(step: IStepProps, key: string) {
  const paramIndex = step.parameters.findIndex((p: any) => p.id === key);
  return step.parameters[paramIndex].value;
}
