import {FormGroup, FormSelect, FormSelectOption, TextInput} from '@patternfly/react-core';
import {useState} from 'react';
import {ExpressionObjectLabel} from "common";

export type PredicateProps = {
    initSyntax: string,
    initExpression: string,
    identifier: string,
    setPredicate: (syntax: string, expression: string) => void,
    hasExpressionObject: boolean
}
export const Predicate = (props: PredicateProps) => {

    const [predicateSyntax, setPredicateSyntax] = useState<string>(props.initSyntax);
    const [predicateString, setPredicateString] = useState<string>(props.initExpression);

    function handlePredicateString(expression: string) {
        setPredicateString(expression);
        props.setPredicate(predicateSyntax, expression);
    }

    function handlePredicateSyntax(syntax: string) {
        setPredicateSyntax(syntax);
        props.setPredicate(syntax, predicateString);
    }

    return (
    <FormGroup>
        {props.hasExpressionObject &&
          <ExpressionObjectLabel/>
        }
        <FormGroup label='Condition Syntax'>
            <FormSelect
              data-testid={props.identifier + '-predicate-syntax-select'}
              id='syntax-01'
              name='simple-form-number'
              value={predicateSyntax}
              onChange={handlePredicateSyntax}>
                <FormSelectOption key='SIMPLE' value='SIMPLE' label='Simple' isDisabled={false}/>
                <FormSelectOption key='JQ' value='JQ' label='Jq' isDisabled={false}/>
            </FormSelect>
        </FormGroup>
        <FormGroup label='Condition'>
            <TextInput data-testid={props.identifier + '-predicate-string-input'} value={predicateString} onChange={handlePredicateString} aria-label='predicate'/>
        </FormGroup>
    </FormGroup>
    )
}
