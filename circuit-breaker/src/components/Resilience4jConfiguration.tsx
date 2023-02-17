import { Checkbox, Form, FormGroup, NumberInput, Select, SelectOption, SelectVariant, TextInput } from '@patternfly/react-core';
import { FormEvent, useCallback, useState } from 'react';
import { ConfigurationProps, Resilience4jConfigurationDefinition, resilience4jConfigurationDefinitionInitialState } from '../models';
import { hasOwn } from '../utils';

export function Resilience4jConfiguration({ onChange }: ConfigurationProps) {
  const [resilience4jConfiguration, setResilience4jConfiguration] = useState<Resilience4jConfigurationDefinition>(
    resilience4jConfigurationDefinitionInitialState,
  );

  const noopFn = useCallback(() => {
    return;
  }, [])

  const handleOnChange = useCallback((fieldName: string, value: string | number | boolean): void => {
    const updatedValue: Resilience4jConfigurationDefinition = {
      ...resilience4jConfiguration,
      [fieldName]: value,
    };

    setResilience4jConfiguration(updatedValue);
    onChange({ fieldName: 'resilience4j', configuration: updatedValue });
  }, [resilience4jConfiguration, onChange]);

  const handleOnStringOrBooleanChange = useCallback((value: string | boolean | number, event: FormEvent<HTMLInputElement>): void => {
    const fieldName = event.currentTarget.name as keyof Resilience4jConfigurationDefinition;

    handleOnChange(fieldName, value);
  }, [handleOnChange]);

  const handleOnNumberChange = useCallback((event: FormEvent<HTMLInputElement>): void => {
    const fieldName = event.currentTarget.name as keyof Resilience4jConfigurationDefinition;
    const value = Number.parseFloat(event.currentTarget.value);

    handleOnChange(fieldName, value);
  }, [handleOnChange]);

  const handleUnitChange = useCallback((unit: number) => (_: unknown, name?: string): void => {
    if (!hasOwn(resilience4jConfiguration, name)) return;

    const value = resilience4jConfiguration[name];
    if (typeof value !== 'number') return;

    handleOnChange(name, value + unit);
  }, [handleOnChange, resilience4jConfiguration]);

  const handleOnMinus = handleUnitChange(-1);
  const handleOnPlus = handleUnitChange(1);

  return <Form>
    <FormGroup
      label="Circuit Breaker"
      fieldId="circuitBreaker"
      helperText=<span>Refers to an existing <code>io.github.resilience4j.circuitbreaker.CircuitBreaker</code> instance to lookup and use from the registry. When using this, then any other circuit breaker options are not in use.</span>
    >
      <TextInput
        type="text"
        id="circuitBreaker"
        name="circuitBreaker"
        aria-describedby="circuitBreaker"
        value={resilience4jConfiguration.circuitBreaker}
        onChange={handleOnStringOrBooleanChange}
      />
    </FormGroup>

    <FormGroup
      label="Config"
      fieldId="config"
      helperText=<span>Refers to an existing <code>io.github.resilience4j.circuitbreaker.CircuitBreakerConfig</code> instance to lookup and use from the registry.</span>
    >
      <TextInput
        type="text"
        id="config"
        name="config"
        aria-describedby="config"
        value={resilience4jConfiguration.config}
        onChange={handleOnStringOrBooleanChange}
      />
    </FormGroup>

    <FormGroup
      label="FailureRateThreshold"
      fieldId="failureRateThreshold"
      helperText=<p>Configures the failure rate threshold in percentage. If the failure rate is equal or greater than the threshold the CircuitBreaker transitions to open and starts short-circuiting calls. The threshold must be greater than 0 and not greater than 100. Default value is 50 percentage.</p>
    >
      <NumberInput
        id="failureRateThreshold"
        value={resilience4jConfiguration.failureRateThreshold}
        onMinus={handleOnMinus}
        onChange={handleOnNumberChange}
        onPlus={handleOnPlus}
        inputName="failureRateThreshold"
        aria-describedby="failureRateThreshold"
        minusBtnAriaLabel="minus 1"
        plusBtnAriaLabel="plus 1"
        min={0.1}
        max={100}
        unit="%"
      />
    </FormGroup>

    <FormGroup
      label="PermittedNumberOfCallsInHalfOpenState"
      fieldId="permittedNumberOfCallsInHalfOpenState"
      helperText=<p>Configures the number of permitted calls when the CircuitBreaker is half open. The size must be greater than 0. Default size is 10.</p>
    >
      <NumberInput
        id="permittedNumberOfCallsInHalfOpenState"
        value={resilience4jConfiguration.permittedNumberOfCallsInHalfOpenState}
        onMinus={handleOnMinus}
        onChange={handleOnNumberChange}
        onPlus={handleOnPlus}
        inputName="permittedNumberOfCallsInHalfOpenState"
        aria-describedby="permittedNumberOfCallsInHalfOpenState"
        minusBtnAriaLabel="minus 1"
        plusBtnAriaLabel="plus 1"
        min={1}
      />
    </FormGroup>

    <FormGroup
      fieldId="throwExceptionWhenHalfOpenOrOpenState"
      helperText=<span>Whether to throw <code>io.github.resilience4j.circuitbreaker.CallNotPermittedException</code> when the call is rejected due circuit breaker is half open or open.</span>
    >
      <Checkbox
        id="throwExceptionWhenHalfOpenOrOpenState"
        label=<span><strong>ThrowExceptionWhenHalfOpenOrOpenState</strong></span>
        name="throwExceptionWhenHalfOpenOrOpenState"
        aria-describedby="throwExceptionWhenHalfOpenOrOpenState"
        isChecked={resilience4jConfiguration.throwExceptionWhenHalfOpenOrOpenState}
        onChange={handleOnStringOrBooleanChange}
      />
    </FormGroup>

    <FormGroup
      label="SlidingWindowSize"
      fieldId="slidingWindowSize"
      helperText=<p>Configures the size of the sliding window which is used to record the outcome of calls when the CircuitBreaker is closed. slidingWindowSize configures the size of the sliding window. Sliding window can either be count-based or time-based. If slidingWindowType is <code>COUNT_BASED</code>, the last slidingWindowSize calls are recorded and aggregated. If slidingWindowType is <code>TIME_BASED</code>, the calls of the last slidingWindowSize seconds are recorded and aggregated. The slidingWindowSize must be greater than 0. The minimumNumberOfCalls must be greater than 0. If the slidingWindowType is <code>COUNT_BASED</code>, the minimumNumberOfCalls cannot be greater than slidingWindowSize. If the <strong>slidingWindowType</strong> is <code>TIME_BASED</code>, you can pick whatever you want. Default <strong>slidingWindowSize</strong> is 100.</p>
    >
      <NumberInput
        id="slidingWindowSize"
        value={resilience4jConfiguration.slidingWindowSize}
        onMinus={handleOnMinus}
        onChange={handleOnNumberChange}
        onPlus={handleOnPlus}
        inputName="slidingWindowSize"
        aria-describedby="slidingWindowSize"
        minusBtnAriaLabel="minus 1"
        plusBtnAriaLabel="plus 1"
      />
    </FormGroup>

    <FormGroup
      label="slidingWindowType"
      fieldId="slidingWindowType"
      helperText=<>
        <p>Configures the type of the sliding window which is used to record the outcome of calls when the CircuitBreaker is closed. Sliding window can either be <code>count-based</code> or <code>time-based</code>. If slidingWindowType is <code>COUNT_BASED</code>, the last slidingWindowSize calls are recorded and aggregated. If slidingWindowType is <code>TIME_BASED</code>, the calls of the last slidingWindowSize seconds are recorded and aggregated. Default slidingWindowType is <code>COUNT_BASED</code>.</p>
        <div><span>Enum values:</span>
          <ul>
            <li><code>TIME_BASED</code></li>
            <li><code>COUNT_BASED</code></li>
          </ul>
        </div>
      </>
    >
      <Select
        variant={SelectVariant.single}
        onToggle={noopFn}
        aria-labelledby="slidingWindowType"
      >
        <SelectOption key={0} value="TIME_BASED" />
        <SelectOption key={1} value="COUNT_BASED" />
      </Select>
    </FormGroup>

    <FormGroup
      label="MinimumNumberOfCalls"
      fieldId="minimumNumberOfCalls"
      helperText=<p>Configures the minimum number of calls which are required (per sliding window period) before the CircuitBreaker can calculate the error rate. For example, if minimumNumberOfCalls is 10, then at least 10 calls must be recorded, before the failure rate can be calculated. If only 9 calls have been recorded the CircuitBreaker will not transition to open even if all 9 calls have failed. Default minimumNumberOfCalls is 100.</p>
    >
      <NumberInput
        id="minimumNumberOfCalls"
        value={resilience4jConfiguration.minimumNumberOfCalls}
        onMinus={handleOnMinus}
        onChange={handleOnNumberChange}
        onPlus={handleOnPlus}
        inputName="minimumNumberOfCalls"
        aria-describedby="minimumNumberOfCalls"
        minusBtnAriaLabel="minus 1"
        plusBtnAriaLabel="plus 1"
      />
    </FormGroup>

    <FormGroup
      fieldId="writableStackTraceEnabled"
      helperText=<span>Enables writable stack traces. When set to false, Exception.getStackTrace returns a zero length array. This may be used to reduce log spam when the circuit breaker is open as the cause of the exceptions is already known (the circuit breaker is short-circuiting calls).</span>
    >
      <Checkbox
        id="writableStackTraceEnabled"
        label=<span><strong>WritableStackTraceEnabled</strong></span>
        name="writableStackTraceEnabled"
        aria-describedby="writableStackTraceEnabled"
        isChecked={resilience4jConfiguration.writableStackTraceEnabled}
        onChange={handleOnStringOrBooleanChange}
      />
    </FormGroup>

    <FormGroup
      label="WaitDurationInOpenState"
      fieldId="waitDurationInOpenState"
      helperText=<p>Configures the wait duration (in seconds) which specifies how long the CircuitBreaker should stay open, before it switches to half open. Default value is 60 seconds.</p>
    >
      <NumberInput
        id="waitDurationInOpenState"
        value={resilience4jConfiguration.waitDurationInOpenState}
        onMinus={handleOnMinus}
        onChange={handleOnNumberChange}
        onPlus={handleOnPlus}
        inputName="waitDurationInOpenState"
        aria-describedby="waitDurationInOpenState"
        minusBtnAriaLabel="minus 1"
        plusBtnAriaLabel="plus 1"
      />
    </FormGroup>

    <FormGroup
      fieldId="automaticTransitionFromOpenToHalfOpenEnabled"
      helperText=<span>Enables automatic transition from OPEN to HALF_OPEN state once the waitDurationInOpenState has passed.</span>
    >
      <Checkbox
        id="automaticTransitionFromOpenToHalfOpenEnabled"
        label=<span><strong>AutomaticTransitionFromOpenToHalfOpenEnabled</strong></span>
        name="automaticTransitionFromOpenToHalfOpenEnabled"
        aria-describedby="automaticTransitionFromOpenToHalfOpenEnabled"
        isChecked={resilience4jConfiguration.automaticTransitionFromOpenToHalfOpenEnabled}
        onChange={handleOnStringOrBooleanChange}
      />
    </FormGroup>

    <FormGroup
      label="SlowCallRateThreshold"
      fieldId="slowCallRateThreshold"
      helperText=<p>Configures the failure rate threshold in percentage. If the failure rate is equal or greater than the threshold the CircuitBreaker transitions to open and starts short-circuiting calls. The threshold must be greater than 0 and not greater than 100. Default value is 50 percentage.</p>
    >
      <NumberInput
        id="slowCallRateThreshold"
        value={resilience4jConfiguration.slowCallRateThreshold}
        onMinus={handleOnMinus}
        onChange={handleOnNumberChange}
        onPlus={handleOnPlus}
        inputName="slowCallRateThreshold"
        aria-describedby="slowCallRateThreshold"
        minusBtnAriaLabel="minus 1"
        plusBtnAriaLabel="plus 1"
        min={0.1}
        max={100}
        unit="%"
        allowEmptyInput
      />
    </FormGroup>

    <FormGroup
      label="slowCallDurationThreshold"
      fieldId="slowCallDurationThreshold"
      helperText=<p>Configures the duration threshold (seconds) above which calls are considered as slow and increase the slow calls percentage. Default value is 60 seconds.</p>
    >
      <NumberInput
        id="slowCallDurationThreshold"
        value={resilience4jConfiguration.slowCallDurationThreshold}
        onMinus={handleOnMinus}
        onChange={handleOnNumberChange}
        onPlus={handleOnPlus}
        inputName="slowCallDurationThreshold"
        aria-describedby="slowCallDurationThreshold"
        minusBtnAriaLabel="minus 1"
        plusBtnAriaLabel="plus 1"
      />
    </FormGroup>
  </Form >
};
