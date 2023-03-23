import {Button, FormGroup, Popover} from '@patternfly/react-core';
import {HelpIcon} from '@patternfly/react-icons';

export const ExpressionObjectLabel = () => {
  const headerContent = 'Please use the source code editor to configure this property.';
  const bodyContent = 'Expression';
  return (
    <FormGroup
      className="pf-u-disabled-color-100 pf-u-background-color-200"
      label="Expression"
      labelIcon={
        <Popover headerContent={headerContent} bodyContent={bodyContent}>
          <Button
            variant="plain"
            type="button"
            aria-label="More info for field"
            aria-describedby="form-group-label-info"
            className="pf-c-form__group-label-help"
          >
            <HelpIcon/>
          </Button>
        </Popover>
      }>
    </FormGroup>
  );
};
