export type Props = {
  onButtonClicked?: () => void;
}

export const CircuitBreakerStep = (props: any) => {
  const handleClick = () => {
    if (props.notifyKaoto) {
      props.notifyKaoto('Message from my remote Step Extension!', 'this is the description of the notification', 'success');
    }
  };

  return (
    <button onClick={handleClick}>Click to Notify Kaoto</button>
  )
};

export default CircuitBreakerStep;
