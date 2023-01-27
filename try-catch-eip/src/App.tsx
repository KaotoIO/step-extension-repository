// @ts-ignore
import css from './App.css';
import { DoCatch } from './DoCatch';
import '@patternfly/patternfly/patternfly.css';
import '@patternfly/patternfly/utilities/Accessibility/accessibility.css';
import '@patternfly/patternfly/utilities/Display/display.css';
import '@patternfly/patternfly/utilities/Flex/flex.css';
import '@patternfly/patternfly/utilities/Sizing/sizing.css';
import '@patternfly/patternfly/utilities/Spacing/spacing.css';
import { Page, PageSection, PageSectionVariants } from '@patternfly/react-core';

export const App = () => {
  return (
    <div className="App">
      <Page>
        <PageSection variant={PageSectionVariants.light}>
          <header className="App-header">
          </header>
          <DoCatch />
          <footer className="App-footer">
            When using this EIP, the regular Camel Error Handler is not in use.
          </footer>
        </PageSection>
      </Page>
    </div>
  );
};
