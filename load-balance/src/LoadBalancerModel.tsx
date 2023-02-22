export type ILBConfigurationField = {
    name: string,
    description: string,
    required: boolean,
    value: string | number | boolean
}
export type ILoadBalanceStrategy = {
    name: string,
    id: string,
    description: string,
    configuration: Map<string, ILBConfigurationField>,
}

const createConfigurationField = (name: string, description: string, required: boolean, value: string | number | boolean): ILBConfigurationField => {
    return {
        name: name,
        description: description,
        required: required,
        value: value
    }
}

export const loadBalanceStrategies: ILoadBalanceStrategy[] = [
    {
        id: 'custom',
        name: 'Custom',
        description: '',
        configuration: new Map<string, ILBConfigurationField>([
            ['ref', createConfigurationField('Ref', 'Refers to the custom load balancer to lookup from the registry.', true, '')]
        ]),
    },
    {
        id: 'failover',
        name: 'Failover',
        description: 'In case of failures the exchange will be tried on the next endpoint.',
        configuration: new Map<string, ILBConfigurationField>([
            ['id', createConfigurationField('ID', '', false, '')],
            ['exception', createConfigurationField('Exception', 'A list of class names for specific exceptions to monitor. If no exceptions are configured then all exceptions are monitored.', true, '')],
            ['sticky', createConfigurationField('Sticky', 'Whether or not the failover load balancer should operate in round robin mode or not. If not, then it will always start from the first endpoint when a new message is to be processed. In other words it restart from the top for every message. If round robin is enabled, then it keeps state and will continue with the next endpoint in a round robin fashion. You can also enable sticky mode together with round robin, if so then it will pick the last known good endpoint to use when starting the load balancing (instead of using the next when starting).', false, true)],
            ['maximumFailover-Attempts', createConfigurationField('Maximum Failover Attempts', 'A value to indicate after X failover attempts we should exhaust (give up). Use -1 to indicate never give up and continuously try to failover. Use 0 to never failover. And use e.g. 3 to failover at most 3 times before giving up. his option can be used whether or not roundRobin is enabled or not..', true, '-1')]
        ])
    },
    {
        id: 'round-robin',
        name: 'Round Robin',
        description: 'The destination endpoints are selected in a round-robin fashion. This is a well known and classic policy, which spreads the load evenly.',
        configuration: new Map<string, ILBConfigurationField>([['id', createConfigurationField('ID', '', false, '')]])
    },

    {
        id: 'random',
        name: 'Random',
        description: 'The destination endpoints are selected by random.',
        configuration: new Map<string, ILBConfigurationField>([['id', createConfigurationField('ID', '', false, '')]])
    },
    {
        id: 'sticky',
        name: 'Sticky',
        description: 'Sticky load balancing using an Expression to calculate a correlation key to perform the sticky load balancing.',
        configuration: new Map<string, ILBConfigurationField>([['correlationExpression', createConfigurationField('Correlation Expression', 'The correlation expression to use to calculate the correlation key.', true, '')]])
    },
    {
        id: 'topic',
        name:
            'topic',
        description: 'Topic mode for the Load Balancer EIP. With this policy then all destination is selected.',
        configuration: new Map<string, ILBConfigurationField>([['id', createConfigurationField('ID', '', false, '')],])
    },
    {
        id: 'weighted',
        name: 'Weighted',
        description: 'Uses a weighted load distribution ratio for each server with respect to others.',
        configuration: new Map<string, ILBConfigurationField>([
            ['id', createConfigurationField('ID', '', false, '')],
            ['distribution-ratio', createConfigurationField('Distribution Ratio', 'The distribution ratio is a delimited String consisting on integer weights ' +
                'separated by delimiters for example 2,3,5. The distributionRatio must match the number of endpoints and/or' +
                'processors specified in the load balancer list.', true, '')],
            ['distributionRatioDelimiter', createConfigurationField('Distribution Ratio Delimiter', 'Delimiter used to specify the distribution ratio. The default value is , (comma).', false, '')],
            ['roundRobin', createConfigurationField('Round Robin', 'To enable round robin mode. By default the weighted distribution mode is used. The default value is false.', false, false)]])
    },
];
