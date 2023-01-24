// @ts-ignore
import css from './App.css';
import { DoCatch } from './DoCatch';

export const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <p>This step supports the Java equivalent of try/catch/finally directly in the DSL. It aims to work like its Java sisters but with more power.</p>
      </header>
      <DoCatch />
      <footer className="App-footer">When using this EIP, the regular Camel Error Handler is not in use.</footer>
    </div>
  );
}
