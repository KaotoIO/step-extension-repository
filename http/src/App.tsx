import { HttpStep } from './Components/HttpStep';
import '@patternfly/patternfly/patternfly.css';
import '@patternfly/patternfly/utilities/Accessibility/accessibility.css';
import '@patternfly/patternfly/utilities/Display/display.css';
import '@patternfly/patternfly/utilities/Flex/flex.css';
import '@patternfly/patternfly/utilities/Sizing/sizing.css';
import '@patternfly/patternfly/utilities/Spacing/spacing.css';

// import '@patternfly/react-core/dist/styles/base.css';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <p></p>
      </header>
      <HttpStep />
    </div>
  );
};

export default App;
