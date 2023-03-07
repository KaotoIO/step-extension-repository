import {fireEvent, render, screen} from '@testing-library/react';
import {App} from './App';
import {DoCatch} from "./DoCatch";
import * as React from "react";

test('renders try and finally blocks with explanation', () => {
  render(<App/>);
  let description = screen.getByText(/First, we have a block of steps to run./i);
  expect(description).toBeInTheDocument();
  description = screen.getByText(/The do-finally block is always executed at the end./i);
  expect(description).toBeInTheDocument();
});

test('adds new catch block to empty list', () => {
  render(<App/>);

  expect(screen.queryByTestId('trycatch-add-exception-button0')).toBeNull();

  //Add a new clause
  const newBtn = screen.getByTestId('trycatch-add-catch-button');
  expect(newBtn).toBeInTheDocument();
  fireEvent.click(newBtn);
  expect(screen.getByText('List of (Java) exceptions to catch on this block:')).toBeInTheDocument();
});


test('Renders Try Catch with initial branches', async () => {
  render(
  <DoCatch
    step={{
    branches: [
      {
      condition: null,
      conditionSyntax: 'SIMPLE',
      identifier: 'steps',
      parameters: [],
      steps: [],
      },
      {
      conditionSyntax: 'JQ',
      identifier: 'do-catch-1',
      steps: [],
      parameters: [
        {
        id: "exceptions",
        type: "array",
        value: ["excepcion1", "excepcion2"]
        },
        {
        id: "on-when",
        type: "object",
        value: {
          representerProperties: {simple: "simple"},
          simple: "simple"
        }
        },
      ]
      },
      {
      condition: null,
      conditionSyntax: 'SIMPLE',
      identifier: 'do-finally',
      parameters: [],
      steps: [],
      },
    ]
    }}
  />);

  //Check elements were properly populated
  expect(screen.getByTestId('trycatch-add-exception-button0')).toBeInTheDocument();
  expect(screen.getByTestId('trycatch-docatch-button0')).toBeInTheDocument();
  expect(screen.getByTestId('trycatch-remove-exception-button0-0')).toBeInTheDocument();
  expect(screen.getByTestId('trycatch-remove-exception-button0-1')).toBeInTheDocument();
  expect(screen.getByTestId('trycatch-input-exception0-1')).toHaveValue("excepcion2");
  expect(screen.getByTestId('trycatch-input-exception0-0')).toHaveValue("excepcion1");
  expect(screen.getByTestId('trycatch-remove-exception-button0-0')).toBeInTheDocument();
  expect(screen.getByTestId('trycatch-remove-exception-button0-1')).toBeInTheDocument();

  //Check we don't have more elements than expected
  expect(screen.queryByTestId('trycatch-add-exception-button2')).toBeNull();
  expect(screen.queryByTestId('trycatch-docatch-button1')).toBeNull();
  expect(screen.queryByTestId('trycatch-remove-exception-button1-0')).toBeNull();

  //Add new exception to existing clause
  expect(screen.queryByTestId('trycatch-input-exception0-2')).toBeNull();
  expect(screen.queryByTestId('trycatch-remove-exception-button0-2')).toBeNull();
  fireEvent.click(screen.getByTestId('trycatch-add-exception-button0'));
  expect(screen.getByTestId('trycatch-input-exception0-2')).toBeInTheDocument();
  expect(screen.getByTestId('trycatch-remove-exception-button0-2')).toBeInTheDocument();

  //Add content to exception input
  fireEvent.change(screen.getByTestId('trycatch-input-exception0-2'));

  //Remove exception to previous clause
  fireEvent.click(screen.getByTestId('trycatch-remove-exception-button0-2'));
  expect(screen.queryByTestId('trycatch-input-exception0-2')).toBeNull();
  expect(screen.queryByTestId('trycatch-remove-exception-button0-2')).toBeNull();

  //Add new clause
  expect(screen.queryByTestId('try-catch-block-1')).toBeNull();
  fireEvent.click(screen.getByTestId('trycatch-add-catch-button'));
  expect(screen.getByTestId('try-catch-block-1')).toBeInTheDocument();

  //Save
  fireEvent.click(screen.getByTestId('trycatch-dosave'));
});
