import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import RestStep from "./RestStep";
import { exampleStep } from "./test/step-example";
import { IStepProps, IStepPropsBranch } from 'kaoto/types/dts/src/types';

test('Loads new endpoints', async () => {
  const updateStep = (step: IStepProps) => {
    expect(step.branches?.length).toBe(2);
    let restBranch: IStepPropsBranch | undefined = step.branches?.pop();
    expect(restBranch).not.toBeNull();

    //POST
    let consume: IStepProps | undefined = restBranch?.steps?.pop();
    expect(consume).not.toBeNull();
    expect(consume?.id).toEqual("camel-rest-verb-post");
    expect(consume?.branches).not.toBeNull();
    expect(consume?.branches).not.toBeUndefined();
    expect(consume?.branches?.length).toBe(1);
    let endpoints : IStepProps[] | undefined = consume?.branches?.pop()?.steps;
    expect(endpoints).not.toBeUndefined();
    expect(endpoints).not.toBeNull();
    expect(endpoints?.length).toBe(2);
    expect(endpoints?.pop()?.id).toEqual("direct-producer");
    expect(endpoints?.pop()?.id).toEqual("CAMEL-REST-CONSUMES");

    //GET
    restBranch = step.branches?.pop();
    consume = restBranch?.steps?.pop();
    expect(consume?.id).toEqual("camel-rest-verb-get");
    expect(consume).not.toBeNull();
    expect(consume?.branches).not.toBeNull();
    expect(consume?.branches).not.toBeUndefined();
    expect(consume?.branches?.length).toBe(8);
    endpoints = consume?.branches?.pop()?.steps;
    expect(endpoints).not.toBeUndefined();
    expect(endpoints).not.toBeNull();
    expect(endpoints?.length).toBe(2);
    expect(endpoints?.pop()?.id).toEqual("direct-producer");
    expect(endpoints?.pop()?.id).toEqual("CAMEL-REST-CONSUMES");

  };
  const fetchStepDetails = (stepId: string) => Promise.resolve({
    name: 'step-unknown',
    id: stepId,
    type: 'MIDDLE',
    branches: []
  });

  render(<RestStep fetchStepDetails={fetchStepDetails} updateStep={updateStep} step={{
    "name": "rest",
    "type": "START",
    "id": "CAMEL-REST-DSL",
    "kind": "CAMEL-REST-DSL",
    "title": "REST DSL",
    "description": "This step represents a REST API.",
    "group": "REST DSL",
    "parameters": [
      {
        "type": "string",
        "id": "path",
        "title": "Path of the endpoint",
        "description": "Path where this endpoint is listening."
      },
      {
        "type": "string",
        "id": "description",
        "title": "Description of the endpoint",
        "description": "Human readable description of this endpoint."
      }
    ],
    "required": [],
    "branches": []
  }} />);

  const specUrlInput = screen.getByTestId('spec-url-input');
  expect(specUrlInput).toBeInTheDocument();
  fireEvent.change(specUrlInput, { target: { value: 'https://api.chucknorris.io/documentation' } });

  const newEndpointsList = screen.getByTestId('rest-new-endpoints');
  expect(newEndpointsList).toBeInTheDocument();

  const loadRemoteUrl = screen.getByTestId('rest-load-remote-url');
  expect(loadRemoteUrl).toBeInTheDocument();
  fireEvent.click(loadRemoteUrl);

  await waitFor(() => {
    expect(screen.getByTestId('endpoint-block-0/feed/daily-chuck')).toBeInTheDocument();
  }, { timeout: 5000 }).then(async () => {

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

    const addNewEndpoint = screen.getByTestId('new-endpoint-button');
    expect(addNewEndpoint).toBeInTheDocument();
    fireEvent.click(addNewEndpoint);

    await waitFor(() => {
      expect(screen.getByTestId('endpoint-block-0pakekieresabeesojajajasaludos')).toBeInTheDocument();
    }).then(async () => {

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

      fireEvent.click(screen.getByTestId('endpoint-remove-/feed/daily-chuck'));

      await waitFor(() => { expect(screen.queryByTestId('endpoint-remove-/feed/daily-chuck')).not.toBeInTheDocument() });

      const generateEndpoints = screen.getByTestId('rest-add-endpoints');
      expect(generateEndpoints).toBeInTheDocument();
      fireEvent.click(generateEndpoints);

      await new Promise<void>((resolve, _) => { setTimeout(resolve, 0); });

    });
  });
});

test('Loads existing endpoints', async () => {

  const fetchStepDetails = (stepId: string) => Promise.resolve({
    name: 'step-unknown',
    id: stepId,
    type: 'MIDDLE',
    branches: []
  });

  render(<RestStep
    fetchStepDetails={fetchStepDetails}
    updateStep={(_: IStepProps) => console.log("Nothing to do here.")}
    step={exampleStep}
  />);

  const newEndpointsList = screen.getByTestId('rest-existing-endpoints');
  expect(newEndpointsList).toBeInTheDocument();

  await waitFor(() => {
    expect(screen.getByTestId('endpoint-block-0/jokes/search')).toBeInTheDocument();
  }).then(() => {
    expect(screen.getByTestId('endpoint-remove-/jokes/search')).toBeInTheDocument();
    expect(screen.getByTestId('endpoint-block-1/jokes/slack')).toBeInTheDocument();
    expect(screen.getByTestId('endpoint-remove-/jokes/slack')).toBeInTheDocument();


    const generateEndpoints = screen.getByTestId('rest-add-endpoints');
    expect(generateEndpoints).toBeInTheDocument();
    fireEvent.click(generateEndpoints);
  });

});
