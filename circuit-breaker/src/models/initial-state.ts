import { CommonDefinition, FaultToleranceConfigurationDefinition, Resilience4jConfigurationDefinition } from './circuitbreaker.model';
import { IStepPropsBranch } from './kaoto-api.model';

export const commonDefinitionInitialState: CommonDefinition = {
  description: {
    text: '',
    language: '',
  },
  disabled: false,
  configuration: '',
};

export const resilience4jConfigurationDefinitionInitialState: Resilience4jConfigurationDefinition = {
  circuitBreaker: '',
  config: '',
  failureRateThreshold: 50.00,
  permittedNumberOfCallsInHalfOpenState: 10,
  throwExceptionWhenHalfOpenOrOpenState: false,
  slidingWindowSize: 100,
  slidingWindowType: 'COUNT_BASED',
  minimumNumberOfCalls: 100,
  writableStackTraceEnabled: true,
  waitDurationInOpenState: 60,
  automaticTransitionFromOpenToHalfOpenEnabled: false,
  slowCallRateThreshold: 100.00,
  slowCallDurationThreshold: 60,
};

export const faultToleranceConfigurationDefinitionInitialState: FaultToleranceConfigurationDefinition = {
  circuitBreaker: '',
  delay: '5000',
  successThreshold: 1,
  requestVolumeThreshold: 20,
  failureRatio: 50,
  timeoutEnabled: false,
  timeoutDuration: '1000',
  timeoutPoolSize: 10,
  timeoutScheduledExecutorService: 'ScheduledExecutorService', // ScheduledExecutorService -> What to do here?
  bulkheadEnabled: false,
  bulkheadMaxConcurrentCalls: 10,
  bulkheadWaitingTaskQueue: 10,
  bulkheadExecutorService: 'ExecutorService', // ExecutorService -> What to do here?
};

export const circuitBreakerBranches: IStepPropsBranch[] = [
  {
    identifier: 'steps',
    steps: [],
    branchUuid: ''
  },
  {
    identifier: 'on-fallback',
    steps: [],
    branchUuid: ''
  }
];
