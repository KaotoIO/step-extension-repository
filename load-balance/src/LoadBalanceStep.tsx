import {
    ActionGroup,
    Button,
    Form,
    FormGroup,
    FormSelect,
    FormSelectOption,
    NumberInput,
    TextInput
} from '@patternfly/react-core';
import React, {useEffect, useState} from 'react';
import {ILBConfigurationField, ILoadBalanceStrategy, loadBalanceStrategies} from "./LoadBalancerModel";

type BranchProps = {
    identifier: string,
    steps: any[]
}

export type LoadBalanceStepProperties = {
    branches?: BranchProps[];
    parameters: IStepPropsParameters[];
}

export interface IStepPropsParameters {
    [key: string]: any;
}

export const LoadBalanceStep = (props: any) => {
        const [step, setStep] = useState<LoadBalanceStepProperties>(props.step);
        const [numberOfBranches, setNumberOfBranches] = useState(step.branches?.length ?? 0);
        const [currentLoadBalancer, setCurrentLoadBalancer] = useState<ILoadBalanceStrategy>(loadBalanceStrategies[0]);
        const [lbConfiguration, setLbConfiguration] = useState<Map<string, ILBConfigurationField>>(loadBalanceStrategies[0].configuration);

        useEffect(() => {

            if (step.parameters.length > 0 && step.parameters[0].value && Object.entries(step.parameters[0].value).length > 0) {
                // get configuration if it's already set in integration
                const stepConfiguration = Object.entries(step.parameters[0].value)[0];
                const lbStrategyId = stepConfiguration[0];
                const lbStrategyParameters: any = stepConfiguration[1];
                //find the configuration
                const lb = loadBalanceStrategies.find(l => l.id === lbStrategyId);
                if (lb) {
                    Object.entries(lbStrategyParameters).forEach(e => {
                        const tmp: any = lb.configuration.get(e[0]);
                        if (tmp) {
                            tmp.value = e[1];
                            lb.configuration.set(e[0], tmp);
                        }
                    });
                    setLbConfiguration(new Map(lb.configuration));
                    setCurrentLoadBalancer(lb);
                }
            }
        }, [step.branches, step.parameters])

        const onMinus = () => {
            const newValue = (numberOfBranches || 0) - 1;
            setNumberOfBranches(newValue);
            handleDeleteBranch();
        };

        const onChange = (event: React.FormEvent<HTMLInputElement>) => {
            const value = (event.target as HTMLInputElement).value;
            setNumberOfBranches(+value);
        };

        const onPlus = () => {
            const newValue = (numberOfBranches || 0) + 1;
            setNumberOfBranches(newValue);
            addBranch();
        };

        function updateStepParams() {
            const configParams = {};
            lbConfiguration.forEach((v, k) => {
                // @ts-ignore
                configParams[k] = v.value;
            });

            const p = {[currentLoadBalancer.id]: configParams}
            const params = step.parameters;
            params[0].value = p;

            step.parameters = params;
            props.updateStep(step)
            props.notifyKaoto(`Load Balance Configuration updated`);
        }

        function handleDeleteBranch() {
            const index = numberOfBranches - 1;
            if (step.branches && index && index !== -1) {
                step.branches = step.branches.filter((_b, i) => i !== index);
                setStep(step);
                props.notifyKaoto(`Endpoint deleted`);
                props.updateStep(step);
            }
        }

        function addBranch() {
            const branch = {
                identifier: '',
                steps: []
            }
            let index = -1;
            if (!step.branches) {
                step.branches = [branch];
                index = 0;
            } else {
                index = step.branches?.length;
                step.branches.splice(index, 0, branch);
            }
            setStep(step);
            props.notifyKaoto(`Branch added`);
            props.updateStep(step);
        }

        function onChangeLoadbalancerType(value: string) {
            const found = loadBalanceStrategies.find(lb => lb.name === value);
            if (found) {
                setLbConfiguration(found.configuration);
                setCurrentLoadBalancer(found);
            }
        }

        const updateParameterValue = (key: string, newValue: string | number | boolean) => {
            const tmpField: any = {...lbConfiguration.get(key), value: newValue};
            const tmpProperties: Map<string, ILBConfigurationField> = lbConfiguration
            tmpProperties.set(key, tmpField);
            setLbConfiguration(new Map(tmpProperties));
        }

        return <Form>
            <FormGroup label={'Number of branches'}>
                <NumberInput
                    label='Number of Branches'
                    data-testid='branch-number-select'
                    value={numberOfBranches}
                    onMinus={onMinus}
                    onChange={onChange}
                    onPlus={onPlus}
                    inputName="input"
                    inputAriaLabel="number input"
                    minusBtnAriaLabel="minus"
                    plusBtnAriaLabel="plus"
                    allowEmptyInput
                />
            </FormGroup>

            <FormGroup label={'Load Balance strategy'}>
                <FormSelect id='loadBalancer-select' data-testid='load-balance-select' value={currentLoadBalancer?.name}
                            onChange={onChangeLoadbalancerType}>
                    {loadBalanceStrategies.map((lb, index) =>
                        <FormSelectOption label={lb.name} key={index} value={lb.name}/>)}
                </FormSelect>
            </FormGroup>

            {lbConfiguration &&
                Array.from(lbConfiguration.keys()).map(id => {
                    const config = lbConfiguration.get(id);
                    return id && <FormGroup key={id + '-fg'}
                                            label={config?.name}
                                            helperText={config?.description}>
                        <TextInput id={id} label={config?.name} name={id} value={config?.value + ""}
                                   key={id}
                                   onChange={(value, _e) => updateParameterValue(id, value)}/>
                    </FormGroup>
                })}
            <ActionGroup>
                <Button data-testid='lb-apply-button' variant="primary" onClick={updateStepParams}>
                    Apply
                </Button>
            </ActionGroup>
        </Form>
    }
;

export default LoadBalanceStep;
