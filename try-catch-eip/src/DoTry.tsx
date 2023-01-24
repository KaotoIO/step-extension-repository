const style = {
  backgroundColor: 'crimson',
  color: 'white',
  borderRadius: '25px',
  border: 0,
  padding: '20px'
};

export type Props = {
  onButtonClicked?: () => void;
}

export const DoTry = (props: Props) => {
  return (
    <div className={'do-try'} style={style}>
      <p>This is the </p>
    </div>
  )
};

