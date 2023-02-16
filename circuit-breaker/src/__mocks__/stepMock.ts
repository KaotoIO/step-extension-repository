export const stepMock = {
  name: 'circuit-breaker',
  type: 'MIDDLE',
  id: 'circuit-breaker',
  kind: 'EIP-BRANCH',
  icon: 'data:image/gif;base64,R0lGODlhVgA2AKIAAP///8z/mYCAgAAAAP4BAgAAAAAAAAAAACH5BAQUAP8ALAAAAABWADYAAAP/OLrc/jDKSRm4oOrN+8PZEIxkaZ5oqq5sq4BKK890nSpCHtp875c4XexHLLKCgp1xyRwhlc3l4vccRosNX1V0JXq4pm3Xm+2Jx7zhVDvIJa1oGTwANreF9bhqLr2/83phgExngYJ6hYZ0g1eJiIxdjmN8j25Qk5BxkoSZlXiRnYGbVKGGozQxlHalN36XaWt9sTabX6xHHiinLmVGvbSuqjMMUbPAlsLDt6hkyMuKfc7Q04vS1Iq7103Z2tGf3Z5/4OGv48XBz+ao6OqY1u1Aybjv8IvG6/TtX7rs9U7EdvLBu4fvmz8nzQwexNJvIUOBDmE5s0WxYoeJFjNqfGAJKYObjyBDihxJsqTJkyJBoFzJsqXLlB5fypxJsyOImzhz6tzJs6fPnwkAADs=',
  title: 'Circuit Breaker.',
  description: 'The Circuit Breaker pattern is inspired by the real-world electrical circuit breaker, which is used to detect excessive current draw and fail fast to protect electrical equipment. The software-based circuit breaker works on the same notion, by encapsulating the operation and monitoring it for failures. The Circuit Breaker pattern operates in three states.',
  group: 'Knative',
  parameters: [
    {
      type: 'object',
      id: 'resilience4jConfiguration',
      path: false,
      value: null,
      title: 'resilience4jConfiguration',
      description: 'Configures the circuit breaker to use Resilience4j with the given configuration.',
      nullable: true,
      defaultValue: null,
      examples: null,
      maxProperties: null,
      minProperties: null,
      required: null,
      enum: null
    },
    {
      type: 'object',
      id: 'faultToleranceConfiguration',
      path: false,
      value: null,
      title: 'faultToleranceConfiguration',
      description: 'Configures the circuit breaker to use MicroProfile Fault Tolerance with the given configuration.',
      nullable: true,
      defaultValue: null,
      examples: null,
      maxProperties: null,
      minProperties: null,
      required: null,
      enum: null
    },
    {
      type: 'string',
      id: 'configuration',
      path: false,
      value: null,
      title: 'configuration',
      description: 'Refers to a circuit breaker configuration (such as resillience4j, or microprofile-fault-tolerance) to use for configuring the circuit breaker EIP.',
      nullable: true,
      defaultValue: null,
      examples: null,
      maxLength: null,
      minLength: null,
      pattern: null,
      format: null,
      enum: null
    },
    {
      type: 'object',
      id: 'description',
      path: false,
      value: null,
      title: 'description',
      description: 'Sets the description of this node.',
      nullable: true,
      defaultValue: null,
      examples: null,
      maxProperties: null,
      minProperties: null,
      required: null,
      enum: null
    }
  ],
  required: [],
  branches: null,
  minBranches: 2,
  maxBranches: 2,
  UUID: 'circuit-breaker-1'
};

export const stepParamsMock = {
  resilience4jConfiguration: null,
  faultToleranceConfiguration: null,
  configuration: null,
  description: null
};
