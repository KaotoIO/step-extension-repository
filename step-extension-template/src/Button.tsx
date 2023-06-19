const buttonStyling = {
  backgroundColor: 'crimson',
  // backgroundColor: 'BlueViolet',
  color: 'white',
  borderRadius: '25px',
  border: 0,
  padding: '20px'
};

export type Props = {
  onButtonClicked?: () => void;
}

export const Button = (props: Props) => {
  return (
    <button className={'superButton'} style={buttonStyling} onClick={props.onButtonClicked}>Best Button EVAR</button>
  )
};

