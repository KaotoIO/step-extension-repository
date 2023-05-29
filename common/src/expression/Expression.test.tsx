import { render, screen } from '@testing-library/react';
import { Expression } from "./Expression";

test('renders Expression with initial jq expression', () => {
  let initSyntax = 'jq';
  let initExpression =  '.field3';
  render(<Expression
    initSyntax={initSyntax}
    initExpression={initExpression}
    setExpression={() => {}}
    hasExpressionObject={false}
  />);
  const expressionSyntaxSelect = screen.getByTestId('expression-syntax-select');
  expect(expressionSyntaxSelect.children.length).toBe(3);
  expect(expressionSyntaxSelect).toHaveValue('jq');
  const expressionStringInput = screen.getByTestId('expression-string-input');
  expect(expressionStringInput).toHaveValue('.field3');
});

test('renders Expression with initial constant expression', () => {
  let initSyntax = 'constant';
  let initExpression =  '.field3';
  render(<Expression
    initSyntax={initSyntax}
    initExpression={initExpression}
    setExpression={() => {}}
    hasExpressionObject={false}
  />);
  const expressionSyntaxSelect = screen.getByTestId('expression-syntax-select');
  expect(expressionSyntaxSelect).toHaveValue('constant');
  const expressionStringInput = screen.getByTestId('expression-string-input');
  expect(expressionStringInput).toHaveValue('.field3');
});
