import { CommonDefinition, FaultToleranceConfigurationDefinition, Resilience4jConfigurationDefinition } from './circuitbreaker.model';

export type OnConfigurationChange = {
  (configuration: CommonDefinition): void;
  (configuration: { resilience4jConfiguration: Resilience4jConfigurationDefinition }): void;
  (configuration: { faultToleranceConfiguration: FaultToleranceConfigurationDefinition }): void;
}

export interface ConfigurationProps {
  onChange: OnConfigurationChange;
}
