import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import RestStep from "./RestStep";
import { exampleStep } from "./test/step-example";

test('Loads new endpoints', async () => {
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

  const loadRemoteUrl = screen.getByTestId('rest-load-remote-url');
  expect(loadRemoteUrl).toBeInTheDocument();
  fireEvent.click(loadRemoteUrl);

  await waitFor(() => {
    expect(screen.getByTestId('endpoint-block-0/feed/daily-chuck')).toBeInTheDocument();
  });

  expect(screen.getByTestId('endpoint-remove-/feed/daily-chuck')).toBeInTheDocument();
  expect(screen.getByTestId('endpoint-block-1/feed/daily-chuck.json')).toBeInTheDocument();
  expect(screen.getByTestId('endpoint-remove-/feed/daily-chuck.json')).toBeInTheDocument();
  expect(screen.getByTestId('endpoint-block-2/feed/daily-chuck.xml')).toBeInTheDocument();
  expect(screen.getByTestId('endpoint-remove-/feed/daily-chuck.xml')).toBeInTheDocument();
  expect(screen.getByTestId('endpoint-block-3/feed/daily-chuck/stats')).toBeInTheDocument();
  expect(screen.getByTestId('endpoint-remove-/feed/daily-chuck/stats')).toBeInTheDocument();
  expect(screen.getByTestId('endpoint-block-4/jokes/categories')).toBeInTheDocument();
  expect(screen.getByTestId('endpoint-remove-/jokes/categories')).toBeInTheDocument();
  expect(screen.getByTestId('endpoint-block-5/jokes/random')).toBeInTheDocument();
  expect(screen.getByTestId('endpoint-remove-/jokes/random')).toBeInTheDocument();
  expect(screen.getByTestId('endpoint-block-6/jokes/search')).toBeInTheDocument();
  expect(screen.getByTestId('endpoint-remove-/jokes/search')).toBeInTheDocument();
  expect(screen.getByTestId('endpoint-block-5/jokes/random')).toBeInTheDocument();
  expect(screen.getByTestId('endpoint-remove-/jokes/random')).toBeInTheDocument();
  expect(screen.getByTestId('endpoint-block-7/jokes/slack')).toBeInTheDocument();
  expect(screen.getByTestId('endpoint-remove-/jokes/slack')).toBeInTheDocument();
  expect(screen.getByTestId('endpoint-block-8/jokes/{id}')).toBeInTheDocument();
  expect(screen.getByTestId('endpoint-remove-/jokes/{id}')).toBeInTheDocument();

  const newEndpointPath = screen.getByTestId('new-endpoint-path');
  expect(newEndpointPath).toBeDefined();
  fireEvent.change(newEndpointPath, { target: { value: '/ola/ke/ase' } });

  const newEndpointName = screen.getByTestId('new-endpoint-name');
  expect(newEndpointName).toBeDefined();
  fireEvent.change(newEndpointName, { target: { value: 'pakekieresabeesojajajasaludos' } });

  const newEndpointVerb = screen.getByTestId('new-endpoint-verb');
  expect(newEndpointVerb).toBeDefined();
  fireEvent.change(newEndpointVerb, { target: { value: 'POST' } });

  const addNewEndpoint = screen.getByTestId('new-endpoint-button');
  expect(addNewEndpoint).toBeInTheDocument();
  fireEvent.click(addNewEndpoint);

  await waitFor(() => {
    expect(screen.getByTestId('endpoint-block-0pakekieresabeesojajajasaludos')).toBeInTheDocument();
  });
  
  expect(screen.getByTestId('endpoint-remove-pakekieresabeesojajajasaludos')).toBeInTheDocument();
  expect(screen.getByTestId('endpoint-block-0/feed/daily-chuck')).toBeInTheDocument();
  expect(screen.getByTestId('endpoint-remove-/feed/daily-chuck')).toBeInTheDocument();
  expect(screen.getByTestId('endpoint-block-1/feed/daily-chuck.json')).toBeInTheDocument();
  expect(screen.getByTestId('endpoint-remove-/feed/daily-chuck.json')).toBeInTheDocument();
  expect(screen.getByTestId('endpoint-block-2/feed/daily-chuck.xml')).toBeInTheDocument();
  expect(screen.getByTestId('endpoint-remove-/feed/daily-chuck.xml')).toBeInTheDocument();
  expect(screen.getByTestId('endpoint-block-3/feed/daily-chuck/stats')).toBeInTheDocument();
  expect(screen.getByTestId('endpoint-remove-/feed/daily-chuck/stats')).toBeInTheDocument();
  expect(screen.getByTestId('endpoint-block-4/jokes/categories')).toBeInTheDocument();
  expect(screen.getByTestId('endpoint-remove-/jokes/categories')).toBeInTheDocument();
  expect(screen.getByTestId('endpoint-block-5/jokes/random')).toBeInTheDocument();
  expect(screen.getByTestId('endpoint-remove-/jokes/random')).toBeInTheDocument();
  expect(screen.getByTestId('endpoint-block-6/jokes/search')).toBeInTheDocument();
  expect(screen.getByTestId('endpoint-remove-/jokes/search')).toBeInTheDocument();
  expect(screen.getByTestId('endpoint-block-5/jokes/random')).toBeInTheDocument();
  expect(screen.getByTestId('endpoint-remove-/jokes/random')).toBeInTheDocument();
  expect(screen.getByTestId('endpoint-block-7/jokes/slack')).toBeInTheDocument();
  expect(screen.getByTestId('endpoint-remove-/jokes/slack')).toBeInTheDocument();
  expect(screen.getByTestId('endpoint-block-8/jokes/{id}')).toBeInTheDocument();
  expect(screen.getByTestId('endpoint-remove-/jokes/{id}')).toBeInTheDocument();

});

test('Loads existing endpoints', async () => {
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

  await waitFor(() => {
    expect(screen.getByTestId('endpoint-block-0/jokes/search')).toBeInTheDocument();
  });
  expect(screen.getByTestId('endpoint-remove-/jokes/search')).toBeInTheDocument();
  expect(screen.getByTestId('endpoint-block-1/jokes/slack')).toBeInTheDocument();
  expect(screen.getByTestId('endpoint-remove-/jokes/slack')).toBeInTheDocument();


  const generateEndpoints = screen.getByTestId('rest-add-endpoints');
  expect(generateEndpoints).toBeInTheDocument();
  fireEvent.click(generateEndpoints);

});
