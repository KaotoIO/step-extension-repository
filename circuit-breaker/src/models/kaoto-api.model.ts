/**
 * These Interfaces will eventually come from @Kaoto/UI
 * it's being loosely defined here to easy local development
 **/

export interface IKaotoApi<T = { [p: string]: any }> {
  step: IStepProps;
  stepParams: T;
  updateStep: (step: IStepProps) => void;
}

export interface IStepProps {
  branches?: IStepPropsBranch[];
  description?: string;
  group?: string;
  icon?: string;
  id?: string;

  // e.g. 'Kamelet', 'Camel-Connector', 'EIP'
  kind?: string;

  // all steps, even if not EIP, contain this prop
  maxBranches: number;
  minBranches: number;
  name: string;

  // config parameters available for this step
  parameters?: IStepPropsParameters[];
  required?: string[];
  title?: string;

  // e.g. 'START', 'MIDDLE', 'END'
  type: string;

  // generated only for integration steps
  UUID: string;
}

export interface IStepPropsBranch {
  branchUuid: string;
  condition?: string;
  identifier: string;
  steps: IStepProps[];
  parameters?: IStepPropsParameters[];
}

export interface IStepPropsParameters {
  [key: string]: any;
}
