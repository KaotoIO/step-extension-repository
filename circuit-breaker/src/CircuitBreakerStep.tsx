import { Tab, Tabs, TabTitleText } from '@patternfly/react-core';
import { KeyboardEvent, MouseEvent, useState } from 'react';
import { Common } from './components/Common';
import { FaultToleranceConfiguration } from './components/FaultToleranceConfiguration';
import { Resilience4jConfiguration } from './components/Resilience4jConfiguration';

export type Props = {
  onButtonClicked?: () => void;
}

export const CircuitBreakerStep = (props: any) => {
  const [activeTabKey, setActiveTabKey] = useState<string | number>(0);
  const handleTabClick = (
    _: MouseEvent<any> | KeyboardEvent | MouseEvent,
    tabIndex: string | number
  ) => {
    setActiveTabKey(tabIndex);
  };

  console.log({ step: props.step, stepParams: props.stepParams });

  const onCommonChange = (commonProps: unknown) => {
    console.log(commonProps);
    // props?.onChange(commonProps);
  }

  return (
    <>
      <Common onChange={onCommonChange} />
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
          <Resilience4jConfiguration onChange={onCommonChange} />
        </Tab>

        <Tab
          eventKey={1}
          title={<TabTitleText>FaultTolerance Configuration</TabTitleText>}
          aria-label="FaultTolerance configuration"
        >
          <FaultToleranceConfiguration onChange={onCommonChange} />
        </Tab>
      </Tabs>
    </>
  );
};

export default CircuitBreakerStep;
