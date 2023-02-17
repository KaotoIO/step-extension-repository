import { CommonDefinition, FaultToleranceConfigurationDefinition, Resilience4jConfigurationDefinition } from './circuitbreaker.model';

export type OnConfigurationChange = {
  (definition: { fieldName: 'common', configuration: CommonDefinition }): void;
  (definition: { fieldName: 'resilience4j', configuration: Resilience4jConfigurationDefinition }): void;
  (definition: { fieldName: 'faultTolerance', configuration: FaultToleranceConfigurationDefinition }): void;
}

export interface ConfigurationProps {
  onChange: OnConfigurationChange;
}
