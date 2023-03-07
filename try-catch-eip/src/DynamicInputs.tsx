import * as React from 'react';
import {Button} from '@patternfly/react-core';
import {PlusCircleIcon} from '@patternfly/react-icons';
import {TrashIcon} from '@patternfly/react-icons';
import {Predicate} from './Predicate';

const style = {
  borderRadius: '25px',
  border: '1px solid BlueViolet',
  padding: '20px',
  margin: '10px',
};

export const DynamicInputs = ({
                  handleDynamicInputs,
                  catchClauses,
                }: {
  handleDynamicInputs: (newCatchClauses: any[]) => void;
  catchClauses: any[];
}) => {
  const [localValues, setLocalValues] = React.useState({});

  const handleChange = (e: any) => {
    const x = parseInt(e.target.dataset.x);
    const y = parseInt(e.target.dataset.y);
    const value = e.target.value;
    const newCatchClauses = [...catchClauses];
    newCatchClauses[x]['exceptions'][y] = value;
    handleDynamicInputs(newCatchClauses);
    e.target.checkValidity();
    e.target.reportValidity();
  };

  const extractCondition = (idx: string) => {
    const onwhen = catchClauses[parseInt(idx)].onwhen;
    return onwhen?.representerProperties?.jq ? onwhen.jq : onwhen?.simple || '';
  }

  const extractConditionSyntax = (idx: string) => {
    const onwhen = catchClauses[parseInt(idx)]['onwhen'];
    return onwhen?.representerProperties?.jq ? 'JQ' : 'SIMPLE';
  }

  const handleOnWhen = (syntax: string, expression: string, idx: string) => {
    if (!expression || expression.trim().length == 0) {
      return;
    }
    const newCatchClauses = [...catchClauses];
    newCatchClauses[parseInt(idx)]['onwhen'] =
      syntax == 'JQ'
        ? {
          jq: expression,
          representerProperties: {
            jq: expression
          }
        }
        : {
          simple: expression,
          representerProperties: {
            simple: expression
          }
        };
    handleDynamicInputs(newCatchClauses);
  };

  const removeException = (e: any) => {
    const element = e.currentTarget;
    const x = parseInt(element.dataset.x);
    const y = parseInt(element.dataset.y);
        const newCatchClauses = [...catchClauses];
        newCatchClauses[x]['exceptions'] = newCatchClauses[x]['exceptions']
            .slice(0, y)
            .concat(
                newCatchClauses[x]['exceptions'].slice(y + 1, newCatchClauses[x]['exceptions'].length)
            );
        handleDynamicInputs(newCatchClauses);
    };

    const removeDoCatch = (e: any) => {
        const element = e.currentTarget;
        const id = parseInt(element.dataset.id);
        catchClauses = catchClauses
            .slice(0, id)
            .concat(catchClauses.slice(id + 1, catchClauses.length));
        handleDynamicInputs(catchClauses);
    };
    const addExceptionDoCatch = (e: any) => {
        const id = parseInt(e.target.dataset.id);
        const newCatchClauses = [...catchClauses];
        newCatchClauses[id]['exceptions'].push('');
        handleDynamicInputs(newCatchClauses);
    };

    if (catchClauses) {
        return (
            <div className='do-try-catch-eip-catch-clause'>
                <form>
                    <div style={style}>
                        <p>First, we have a block of steps to run. </p>
                        <p>If an exception is raised on this block,
                            it may be caught by one of the following
                            blocks.</p>
                    </div>
                    {Object.entries(catchClauses).map(([idx, value]) => {
                        return (
                            <div
                                key={'try-catch-block-' + idx}
                                style={style}
                                data-testid={'try-catch-block-' + idx} >
                                <Button
                                    style={{float: 'right'}}
                                    variant='link'
                                    icon={<TrashIcon/>}
                                    data-id={idx}
                                    className={'remove-do-catch'}
                                    data-testid={'trycatch-docatch-button' + idx}
                                    onClick={removeDoCatch}
                                >
                                </Button>
                                <p>List of (Java) exceptions to catch on
                                    this block:</p>
                                <Button
                                    variant='link'
                                    icon={<PlusCircleIcon/>}
                                    data-id={idx}
                                    className={'add-do-catch'}
                                    onClick={addExceptionDoCatch}
                                    title='Add Exception'
                                    data-testid={'trycatch-add-exception-button' + idx}
                                >Add Exception
                                </Button>
                                <br/>
                                {
                                    // @ts-ignore
                                    Object.entries(value.exceptions).map(([idy, element]) => {
                                        return (
                                            <div key={'exception-block-' + idx + '-' + idy}>
                                                <Button
                                                    key={'remove-' + idx + '-' + idy}
                                                    data-testid={'trycatch-remove-exception-button' + idx + '-' + idy}
                                                    variant='link'
                                                    icon={<TrashIcon/>}
                                                    data-x={idx}
                                                    data-y={idy}
                                                    className={'remove-exception'}
                                                    onClick={removeException}
                                                    title='Remove Exception'
                                                >
                                                </Button>
                                                <input
                                                    className='form-control'
                                                    name={'exception-' + idx + '-' + idy}
                                                    type='text'
                                                    data-testid={'trycatch-input-exception' + idx + '-' + idy}
                                                    key={'exception-' + idx + '-' + idy}
                                                    // @ts-ignore
                                                    value={element}
                                                    data-x={idx}
                                                    data-y={idy}
                                                    onChange={handleChange}
                                                    placeholder='java.util.Exception'
                                                    required
                                                />
                                                <br/>
                                            </div>
                                        );
                                    })}
                                <br/>
                                <p>Optional conditional for this
                                    block:</p>
                                <Predicate
                                    identifier={'on-when-' + idx}
                                    initExpression={extractCondition(idx)}
                                    initSyntax={extractConditionSyntax(idx)}
                                    setPredicate={(syntax, expression) => handleOnWhen(syntax, expression, idx)}
                                />
                            </div>
                        );
                    })}
                    <div style={style}>
                        <p>The do-finally block is always executed at the
                            end, whether or not an exception was caught.</p>
                    </div>
                </form>
            </div>
        );
    } else {
        return <></>;
    }
};
