import { circuitBreakerBranches, IStepProps, IStepPropsBranch, IStepPropsParameters } from '../models';

const prepareBranchesIfNeeded = (branches?: IStepPropsBranch[]): IStepPropsBranch[] => {
  if (!Array.isArray(branches)) return circuitBreakerBranches;

  const stepBranch = branches.find((branch) => branch?.identifier === 'steps');
  const onFallbackBranch = branches.find((branch) => branch?.identifier === 'on-fallback');

  return [
    stepBranch ?? circuitBreakerBranches[0],
    onFallbackBranch ?? circuitBreakerBranches[1],
  ];
};

export const updateStepValues = (step: IStepProps, values: IStepPropsParameters): IStepProps => {
  if (!Array.isArray(step?.parameters)) {
    return step;
  }

  const newParameters = step.parameters.map((parameter) => {
    const value = values[parameter.id];
    if (value === null || value === undefined) {
      return parameter;
    }

    return { ...parameter, value };
  });

  const branches = prepareBranchesIfNeeded(step.branches);

  return { ...step, parameters: newParameters, branches };
};
