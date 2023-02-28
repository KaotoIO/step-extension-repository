import { Button, Tab, Tabs, TabTitleText } from '@patternfly/react-core';
import { useCallback, useState } from 'react';
import { Common } from './components/Common';
import { FaultToleranceConfiguration } from './components/FaultToleranceConfiguration';
import { Resilience4jConfiguration } from './components/Resilience4jConfiguration';
import { CircuitBreakerDefinition, IKaotoApi, OnConfigurationChange } from './models';
import { updateStepValues } from './utils';

export const CircuitBreakerStep = (props: IKaotoApi<CircuitBreakerDefinition>) => {
  const [circuitBreakerDefinition, setCircuitBreakerDefinition] = useState<CircuitBreakerDefinition>(props.stepParams);
  const [activeTabKey, setActiveTabKey] = useState<string | number>(0);
  const handleTabClick = (_: unknown, tabIndex: string | number) => {
    setActiveTabKey(tabIndex);
  };

  const onConfigurationChange: OnConfigurationChange = useCallback((configuration) => {
    setCircuitBreakerDefinition((previousValues) => ({ ...previousValues, ...configuration }));
  }, []);

  const applyChanges = useCallback(() => {
    const updatedStep = updateStepValues(props.step, circuitBreakerDefinition);
    props.updateStep(updatedStep);
  }, [circuitBreakerDefinition, props]);

  return (
    <>
      <Common initialValue={props.stepParams} onChange={onConfigurationChange} />
      <br />

      <Tabs
        activeKey={activeTabKey}
        onSelect={handleTabClick}
        isBox
        role="region"
      >
        <Tab
          eventKey={0}
          title={<TabTitleText>Resilience4j Configuration</TabTitleText>}
          aria-label="Resilience4j configuration"
        >
          <Resilience4jConfiguration initialValue={props.stepParams.resilience4jConfiguration} onChange={onConfigurationChange} />
        </Tab>

        <Tab
          eventKey={1}
          title={<TabTitleText>FaultTolerance Configuration</TabTitleText>}
          aria-label="FaultTolerance configuration"
        >
          <FaultToleranceConfiguration initialValue={props.stepParams.faultToleranceConfiguration} onChange={onConfigurationChange} />
        </Tab>
      </Tabs>

      <Button onClick={applyChanges}>Apply</Button>
    </>
  );
};

export default CircuitBreakerStep;
