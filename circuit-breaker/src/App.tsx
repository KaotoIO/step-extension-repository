import './App.css';
import '@patternfly/patternfly/patternfly.css';
import { CircuitBreakerStep } from './CircuitBreakerStep';
import { stepMock, stepParamsMock } from './__mocks__/stepMock';
import { CodeBlock, CodeBlockCode } from '@patternfly/react-core';
import { useState } from 'react';
import { CircuitBreakerDefinition } from './models';

export const App = () => {
  const [definition, setDefinition] = useState('{\n}');

  const handleOnChange = (definition: CircuitBreakerDefinition) => {
    setDefinition(JSON.stringify(definition, undefined, 4));
  }

  return (
    <div className='content pf-c-content'>
      <header>
        <h1>Kaoto - Circuit breaker step extension playground</h1>
      </header>

      <CircuitBreakerStep step={stepMock} stepParams={stepParamsMock} onChange={handleOnChange} />

      <br />
      <header>
        <h3>This is the resulting JSON definition</h3>
      </header>
      <CodeBlock>
        <CodeBlockCode id="code-content">{definition}</CodeBlockCode>
      </CodeBlock>
    </div>
  );
}
