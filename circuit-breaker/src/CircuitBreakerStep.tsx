import { Tabs, Tab, TabTitleText } from '@patternfly/react-core';
import { Common } from './components/Common';
import { Resilience4jConfiguration } from './components/Resilience4jConfiguration';

export type Props = {
  onButtonClicked?: () => void;
}

export const CircuitBreakerStep = (props: any) => {
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
          FaultTolerance Configuration
        </Tab>
      </Tabs>
    </>
  );
};

export default CircuitBreakerStep;
