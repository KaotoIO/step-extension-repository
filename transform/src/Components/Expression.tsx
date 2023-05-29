import {FormGroup, FormSelect, FormSelectOption, TextInput} from "@patternfly/react-core";
import {useState} from "react";
import {ExpressionObjectLabel} from "common";

export type ExpressionSelectProps = {
    initSyntax: string,
    initExpression: string,
    setExpression: (syntax: string, expression: string) => void
    hasExpressionObject: boolean
}
export const Expression = (props: ExpressionSelectProps) => {

    const [expressionSyntax, setExpressionSyntax] = useState<string>(props.initSyntax);
    const [expressionString, setExpressionString] = useState<string>(props.initExpression);

    function handleExpressionString(expression: string) {
        setExpressionString(expression);
        props.setExpression(expressionSyntax, expression);
    }

    function handleExpressionSyntax(syntax: string) {
        setExpressionSyntax(syntax);
        props.setExpression(syntax, expressionString);
    }

    return (
    <FormGroup>
        {props.hasExpressionObject &&
          <ExpressionObjectLabel/>
        }
        <FormGroup label="Expression Syntax">
            <FormSelect
              data-testid='expression-syntax-select'
              id="syntax-01"
              name="simple-form-number"
              value={expressionSyntax}
              onChange={handleExpressionSyntax}>
                <FormSelectOption key='simple' value='simple' label='Simple' isDisabled={false}/>
                <FormSelectOption key='jq' value='jq' label='Jq' isDisabled={false}/>
            </FormSelect>
        </FormGroup>
        <FormGroup label="Expression">
            <TextInput data-testid='expression-string-input' value={expressionString} onChange={handleExpressionString} aria-label="expression"/>
        </FormGroup>
    </FormGroup>
    )
}