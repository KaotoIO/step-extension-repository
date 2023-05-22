import { fireEvent, render, screen } from '@testing-library/react';
import RestStep from "./RestStep";
import { exampleStep } from "./test/step-example";

test('Loads new endpoints', () => {
  render(<RestStep
    fetchStepDetails={(stepId: string) => Promise.resolve({
      name: 'step-unknown',
      id: stepId,
      type: 'MIDDLE',
      branches: []
    })}
    updateStep={(p: any) => console.log(p)}
    step={{
      name: 'rest',
      type: 'START',
      branches: []
    }}
  />);


  const newEndpointsList = screen.getByTestId('rest-new-endpoints');
  expect(newEndpointsList).toBeInTheDocument();
  expect(newEndpointsList.children.length).toBe(0);

  const loadRemoteUrl = screen.getByTestId('rest-load-remote-url');
  expect(loadRemoteUrl).toBeInTheDocument();
  fireEvent.click(loadRemoteUrl);

  expect(newEndpointsList.children.length).toBe(10);

  const generateEndpoints = screen.getByTestId('rest-add-endpoints');
  expect(generateEndpoints).toBeInTheDocument();
  fireEvent.click(generateEndpoints);

  expect(newEndpointsList.children.length).toBe(0);

});

test('Loads existing endpoints', () => {
  render(<RestStep
    fetchStepDetails={(stepId: string) => Promise.resolve({
      name: 'step-unknown',
      id: stepId,
      type: 'MIDDLE',
      branches: []
    })}
    updateStep={(p: any) => console.log(p)}
    step={exampleStep}
  />);


  const newEndpointsList = screen.getByTestId('rest-existing-endpoints');
  expect(newEndpointsList).toBeInTheDocument();
  expect(newEndpointsList.children.length).toBe(10);

  const generateEndpoints = screen.getByTestId('rest-add-endpoints');
  expect(generateEndpoints).toBeInTheDocument();
  fireEvent.click(generateEndpoints);

});
