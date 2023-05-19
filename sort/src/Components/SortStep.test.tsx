import { fireEvent, render, screen } from '@testing-library/react';
import SortStep from "./SortStep";

test('renders SortStep', () => {
  let notifyKaotoCount = 0;
  let stepParams: any = {};

  render(<SortStep
    notifyKaoto={() => notifyKaotoCount++}
    updateStepParams={(p: any) => stepParams = p}
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
  expect(stepParams.comparator).toBe('testComparator');
  expect(stepParams.tokenize).toBe('testTokenize');
  expect(stepParams.jq).toBe('.field3');
  expect(stepParams.constant).toBeFalsy();
  expect(stepParams.simple).toBeFalsy();
});
