import { Button } from '@patternfly/react-core';

export type Props = {
  onButtonClicked?: () => void;
}

export const CircuitBreakerStep = (props: any) => {
  console.log({step: props.step});

  const handleClick = () => {
    if (props.notifyKaoto) {
      props.notifyKaoto('Message from my remote Step Extension!', 'this is the description of the notification', 'success');
    }
  };

  return (
    <Button onClick={handleClick}>Click to Notify Kaoto</Button>
  )
};

export default CircuitBreakerStep;
