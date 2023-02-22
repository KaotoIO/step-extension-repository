
import '@patternfly/patternfly/patternfly.css';
import '@patternfly/patternfly/utilities/Accessibility/accessibility.css';
import '@patternfly/patternfly/utilities/Display/display.css';
import '@patternfly/patternfly/utilities/Flex/flex.css';
import '@patternfly/patternfly/utilities/Sizing/sizing.css';
import '@patternfly/patternfly/utilities/Spacing/spacing.css';
import { LoadBalanceStep } from './LoadBalanceStep';

function App() {
  return (
    <div className="App">
      <header className="App-header"/>
      <LoadBalanceStep />
    </div>
  );
}

export default App;
