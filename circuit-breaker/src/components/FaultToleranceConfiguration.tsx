import { Checkbox, Form, FormGroup, NumberInput, Popover, TextInput } from '@patternfly/react-core';
import HelpIcon from '@patternfly/react-icons/dist/esm/icons/help-icon';
import { FormEvent, useCallback, useState } from 'react';
import { CommonProps, FaultToleranceConfigurationDefinition, faultToleranceConfigurationDefinitionInitialState } from '../models';
import { hasOwn } from '../utils';

export function FaultToleranceConfiguration({ initialValue, onChange }: CommonProps<FaultToleranceConfigurationDefinition>) {
  const [faultToleranceConfiguration, setfaultToleranceConfiguration] = useState<FaultToleranceConfigurationDefinition>(
    initialValue ?? faultToleranceConfigurationDefinitionInitialState,
  );

  const handleOnChange = useCallback((fieldName: string, value: string | number | boolean): void => {
    const updatedValue: FaultToleranceConfigurationDefinition = {
      ...faultToleranceConfiguration,
      [fieldName]: value,
    };

    setfaultToleranceConfiguration(updatedValue);
    onChange({ faultToleranceConfiguration: updatedValue });
  }, [faultToleranceConfiguration, onChange]);

  const handleOnStringOrBooleanChange = useCallback((value: string | boolean | number, event: FormEvent<HTMLInputElement>): void => {
    const fieldName = event.currentTarget.name as keyof FaultToleranceConfigurationDefinition;

    handleOnChange(fieldName, value);
  }, [handleOnChange]);

  const handleOnNumberChange = useCallback((event: FormEvent<HTMLInputElement>): void => {
    const fieldName = event.currentTarget.name as keyof FaultToleranceConfigurationDefinition;
    const value = Number.parseFloat(event.currentTarget.value);

    handleOnChange(fieldName, value);
  }, [handleOnChange]);

  const handleUnitChange = useCallback((unit: number) => (_: unknown, name?: string): void => {
    if (!hasOwn(faultToleranceConfiguration, name)) return;

    const value = faultToleranceConfiguration[name];
    if (typeof value !== 'number') return;

    handleOnChange(name, value + unit);
  }, [handleOnChange, faultToleranceConfiguration]);

  const handleOnMinus = handleUnitChange(-1);
  const handleOnPlus = handleUnitChange(1);

  return <Form>
    <FormGroup
      label="Circuit Breaker"
      fieldId="circuitBreaker"
      helperText=<span>Refers to an existing <code>io.smallrye.faulttolerance.core.circuit.breaker.CircuitBreaker</code> instance to lookup and use from the registry.</span>
      labelIcon=<Popover
        hideOnOutsideClick={false}
        bodyContent={<span> When using this, then any other circuit breaker options are not in use.</span>}
      >
        <button
          type="button"
          aria-label="More info for name field"
          onClick={e => e.preventDefault()}
          aria-describedby="simple-form-name-01"
          className="pf-c-form__group-label-help"
        >
          <HelpIcon noVerticalAlign />
        </button>
      </Popover>
    >
      <TextInput
        type="text"
        id="circuitBreaker"
        name="circuitBreaker"
        aria-describedby="circuitBreaker"
        value={faultToleranceConfiguration.circuitBreaker}
        onChange={handleOnStringOrBooleanChange}
      />
    </FormGroup>

    <FormGroup
      label="Delay"
      fieldId="delay"
      helperText=<span>Control how long the circuit breaker stays open. The default is 5 seconds.</span>
    >
      <TextInput
        type="text"
        id="delay"
        name="delay"
        aria-describedby="delay"
        value={faultToleranceConfiguration.delay}
        onChange={handleOnStringOrBooleanChange}
      />
    </FormGroup>

    <FormGroup
      label="SuccessThreshold"
      fieldId="successThreshold"
      helperText=<p>Controls the number of trial calls which are allowed when the circuit breaker is half-open.</p>
    >
      <NumberInput
        id="successThreshold"
        value={faultToleranceConfiguration.successThreshold}
        onMinus={handleOnMinus}
        onChange={handleOnNumberChange}
        onPlus={handleOnPlus}
        inputName="successThreshold"
        aria-describedby="successThreshold"
        minusBtnAriaLabel="minus 1"
        plusBtnAriaLabel="plus 1"
        min={0.1}
        max={100}
        unit="%"
      />
    </FormGroup>

    <FormGroup
      label="requestVolumeThreshold"
      fieldId="requestVolumeThreshold"
      helperText=<p>Controls the size of the rolling window used when the circuit breaker is closed.</p>
    >
      <NumberInput
        id="requestVolumeThreshold"
        value={faultToleranceConfiguration.requestVolumeThreshold}
        onMinus={handleOnMinus}
        onChange={handleOnNumberChange}
        onPlus={handleOnPlus}
        inputName="requestVolumeThreshold"
        aria-describedby="requestVolumeThreshold"
        minusBtnAriaLabel="minus 1"
        plusBtnAriaLabel="plus 1"
        min={1}
      />
    </FormGroup>

    <FormGroup
      label="failureRatio"
      fieldId="failureRatio"
      helperText=<p>Configures the failure rate threshold in percentage. If the failure rate is equal or greater than the threshold the CircuitBreaker transitions to open and starts short-circuiting calls. The threshold must be greater than 0 and not greater than 100. Default value is 50 percentage.</p>
    >
      <NumberInput
        id="failureRatio"
        value={faultToleranceConfiguration.failureRatio}
        onMinus={handleOnMinus}
        onChange={handleOnNumberChange}
        onPlus={handleOnPlus}
        inputName="failureRatio"
        aria-describedby="failureRatio"
        minusBtnAriaLabel="minus 1"
        plusBtnAriaLabel="plus 1"
        min={1}
      />
    </FormGroup>

    <FormGroup
      fieldId="timeoutEnabled"
      helperText=<span>Whether timeout is enabled or not on the circuit breaker. Default is false.</span>
    >
      <Checkbox
        id="timeoutEnabled"
        label=<span><strong>TimeoutEnabled</strong></span>
        name="timeoutEnabled"
        aria-describedby="timeoutEnabled"
        isChecked={faultToleranceConfiguration.timeoutEnabled}
        onChange={handleOnStringOrBooleanChange}
      />
    </FormGroup>

    <FormGroup
      label="timeoutDuration"
      fieldId="timeoutDuration"
      helperText=<span>Configures the thread execution timeout. Default value is 1 second.</span>
    >
      <TextInput
        type="text"
        id="timeoutDuration"
        name="timeoutDuration"
        aria-describedby="timeoutDuration"
        value={faultToleranceConfiguration.timeoutDuration}
        onChange={handleOnStringOrBooleanChange}
      />
    </FormGroup>

    <FormGroup
      label="TimeoutPoolSize"
      fieldId="timeoutPoolSize"
      helperText=<p>Configures the pool size of the thread pool when timeout is enabled. Default value is 10.</p>
    >
      <NumberInput
        id="timeoutPoolSize"
        value={faultToleranceConfiguration.timeoutPoolSize}
        onMinus={handleOnMinus}
        onChange={handleOnNumberChange}
        onPlus={handleOnPlus}
        inputName="timeoutPoolSize"
        aria-describedby="timeoutPoolSize"
        minusBtnAriaLabel="minus 1"
        plusBtnAriaLabel="plus 1"
      />
    </FormGroup>

    <FormGroup
      label="timeoutScheduledExecutorService"
      fieldId="timeoutScheduledExecutorService"
      helperText=<span>References to a custom thread pool to use when timeout is enabled.</span>
    >
      <TextInput
        type="text"
        id="timeoutScheduledExecutorService"
        name="timeoutScheduledExecutorService"
        aria-describedby="timeoutScheduledExecutorService"
        value={faultToleranceConfiguration.timeoutScheduledExecutorService}
        onChange={handleOnStringOrBooleanChange}
      />
    </FormGroup>

    <FormGroup
      fieldId="bulkheadEnabled"
      helperText=<span>Whether bulkhead is enabled or not on the circuit breaker. Default is false.</span>
    >
      <Checkbox
        id="bulkheadEnabled"
        label=<span><strong>BulkheadEnabled</strong></span>
        name="bulkheadEnabled"
        aria-describedby="bulkheadEnabled"
        isChecked={faultToleranceConfiguration.bulkheadEnabled}
        onChange={handleOnStringOrBooleanChange}
      />
    </FormGroup>

    <FormGroup
      label="bulkheadMaxConcurrentCalls"
      fieldId="bulkheadMaxConcurrentCalls"
      helperText=<p>Configures the max amount of concurrent calls the bulkhead will support.</p>
    >
      <NumberInput
        id="bulkheadMaxConcurrentCalls"
        value={faultToleranceConfiguration.bulkheadMaxConcurrentCalls}
        onMinus={handleOnMinus}
        onChange={handleOnNumberChange}
        onPlus={handleOnPlus}
        inputName="bulkheadMaxConcurrentCalls"
        aria-describedby="bulkheadMaxConcurrentCalls"
        minusBtnAriaLabel="minus 1"
        plusBtnAriaLabel="plus 1"
      />
    </FormGroup>

    <FormGroup
      label="bulkheadWaitingTaskQueue"
      fieldId="bulkheadWaitingTaskQueue"
      helperText=<p>Configures the task queue size for holding waiting tasks to be processed by the bulkhead.</p>
    >
      <NumberInput
        id="bulkheadWaitingTaskQueue"
        value={faultToleranceConfiguration.bulkheadWaitingTaskQueue}
        onMinus={handleOnMinus}
        onChange={handleOnNumberChange}
        onPlus={handleOnPlus}
        inputName="bulkheadWaitingTaskQueue"
        aria-describedby="bulkheadWaitingTaskQueue"
        minusBtnAriaLabel="minus 1"
        plusBtnAriaLabel="plus 1"
      />
    </FormGroup>

    <FormGroup
      label="bulkheadExecutorService"
      fieldId="bulkheadExecutorService"
      helperText=<span>References to a custom thread pool to use when bulkhead is enabled.</span>
    >
      <TextInput
        type="text"
        id="bulkheadExecutorService"
        name="bulkheadExecutorService"
        aria-describedby="bulkheadExecutorService"
        value={faultToleranceConfiguration.bulkheadExecutorService}
        onChange={handleOnStringOrBooleanChange}
      />
    </FormGroup>
  </Form >
};
