import { Tab, Tabs, TabTitleText } from '@patternfly/react-core';
import { KeyboardEvent, MouseEvent, useState } from 'react';
import { Common } from './components/Common';
import { FaultToleranceConfiguration } from './components/FaultToleranceConfiguration';
import { Resilience4jConfiguration } from './components/Resilience4jConfiguration';
import { CircuitBreakerDefinition, IKaotoApi, OnConfigurationChange } from './models';

export const CircuitBreakerStep = (props: IKaotoApi) => {
  const [circuitBreakerDefinition, setCircuitBreakerDefinition] = useState<CircuitBreakerDefinition>({});
  const [activeTabKey, setActiveTabKey] = useState<string | number>(0);
  const handleTabClick = (
    _: MouseEvent<any> | KeyboardEvent | MouseEvent,
    tabIndex: string | number
  ) => {
    setActiveTabKey(tabIndex);
  };

  const onConfigurationChange: OnConfigurationChange = (definition) => {
    switch (definition.fieldName) {
      case 'common':
        setCircuitBreakerDefinition({ ...circuitBreakerDefinition, ...definition.configuration });
        break;
      case 'resilience4j':
        setCircuitBreakerDefinition({ ...circuitBreakerDefinition, resilience4jConfiguration: definition.configuration });
        break;
      case 'faultTolerance':
        setCircuitBreakerDefinition({ ...circuitBreakerDefinition, faultToleranceConfiguration: definition.configuration });
        break;
    }

    console.log(props.step);

    // props.updateStep( circuitBreakerDefinition )
  }

  return (
    <>
      <Common onChange={onConfigurationChange} />
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
          <Resilience4jConfiguration onChange={onConfigurationChange} />
        </Tab>

        <Tab
          eventKey={1}
          title={<TabTitleText>FaultTolerance Configuration</TabTitleText>}
          aria-label="FaultTolerance configuration"
        >
          <FaultToleranceConfiguration onChange={onConfigurationChange} />
        </Tab>
      </Tabs>
    </>
  );
};

export default CircuitBreakerStep;
