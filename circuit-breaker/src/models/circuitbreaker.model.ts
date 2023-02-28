export interface CommonDefinition {
  description?: Partial<DescriptionDefinition>;
  disabled?: boolean;
  configuration?: string; // 'resillience4j' | 'microprofile-fault-tolerance'
}

export interface DescriptionDefinition {
  text: string;
  /** @deprecated */
  language: string;
}

export interface CircuitBreakerDefinition extends CommonDefinition {
  resilience4jConfiguration?: Partial<Resilience4jConfigurationDefinition>;
  faultToleranceConfiguration?: Partial<FaultToleranceConfigurationDefinition>;
}

export interface Resilience4jConfigurationDefinition {
  circuitBreaker?: string;
  config?: string;
  failureRateThreshold?: number; // Float
  permittedNumberOfCallsInHalfOpenState?: number;
  throwExceptionWhenHalfOpenOrOpenState?: boolean;
  slidingWindowSize?: number;
  slidingWindowType?: 'TIME_BASED' | 'COUNT_BASED';
  minimumNumberOfCalls?: number;
  writableStackTraceEnabled?: boolean;
  waitDurationInOpenState?: number;
  automaticTransitionFromOpenToHalfOpenEnabled?: boolean;
  slowCallRateThreshold?: number; // Float
  slowCallDurationThreshold?: number;
}

export interface FaultToleranceConfigurationDefinition {
  circuitBreaker?: string;
  delay?: string;
  successThreshold?: number;
  requestVolumeThreshold?: number;
  failureRatio?: number;
  timeoutEnabled?: boolean;
  timeoutDuration?: string;
  timeoutPoolSize?: number;
  timeoutScheduledExecutorService?: string; // ScheduledExecutorService -> What to do here?
  bulkheadEnabled?: boolean;
  bulkheadMaxConcurrentCalls?: number;
  bulkheadWaitingTaskQueue?: number;
  bulkheadExecutorService?: string; // ExecutorService -> What to do here?
}
