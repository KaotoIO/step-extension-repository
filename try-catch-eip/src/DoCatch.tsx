// @ts-ignore
import { IStepProps } from 'kaoto/types';
import { DynamicInputs } from './DynamicInputs';
import { Button } from '@patternfly/react-core';
import {PlusCircleIcon} from '@patternfly/react-icons';
import { useState } from 'react';
import * as React from 'react';

export interface IDoCatchForm {
  updateStep?: (newConfig: any[]) => void;
  step?: IStepProps;
}

export const DoCatch = ({ updateStep, step }: IDoCatchForm) => {
  function extractCatches(branch: { identifier: string; parameters: any[] }, index: any, arr: any) {
    if (branch.identifier !== 'steps' && branch.identifier !== 'do-finally') {
      return {
        id: branch.identifier,
        onwhen: branch.parameters.filter((p) => p.id === 'on-when')[0].value,
        exceptions: branch.parameters.filter((p) => p.id === 'exceptions')[0].value,
      };
    }

    return null;
  }

  function buildCatches(
    branch: { id: null; exceptions: any; onwhen: any },
    index: number,
    arr: any
  ) {
    let steps = [];
    if (branch.id != null) {
      const potentialBranch = step.branches.filter(
        (b: { identifier: null }) => b.identifier == branch.id
      );
      if (potentialBranch.length > 0) {
        steps = potentialBranch[0].steps;
      }
    }

    return {
      steps: steps,
      parameters: [
        {
          type: 'array',
          id: 'exceptions',
          value: branch.exceptions,
        },
        {
          type: 'object',
          id: 'on-when',
          value: branch.onwhen,
        },
      ],
      identifier: branch.id || `do-catch-${index + 1}`,
      conditionSyntax: 'SIMPLE',
    };
  }
  let branches = [];

  if (step?.branches != null) {
    branches = step.branches.map(extractCatches).filter((o: any) => o != null);
  }
  const [catchClauses, setCatchClauses] = useState(branches);

  const saveHandler = () => {
    if (step.branches == null) {
      step.branches = [];
    }

    let tryclause = step.branches
      .filter((o: null) => o != null)
      .filter((b: { identifier: string }) => b.identifier === 'steps');
    if (tryclause.length > 0) {
      tryclause = tryclause[0];
    } else {
      tryclause = {
        steps: [],
        parameters: [],
        identifier: 'steps',
        condition: null,
        conditionSyntax: 'SIMPLE',
      };
    }

    let finallyclause = step.branches
      .filter((o: null) => o != null)
      .filter((b: { identifier: string }) => b.identifier === 'do-finally');
    if (finallyclause.length > 0) {
      finallyclause = finallyclause[0];
    } else {
      finallyclause = {
        steps: [],
        parameters: [],
        identifier: 'do-finally',
        condition: null,
        conditionSyntax: 'SIMPLE',
      };
    }

    const docatches = catchClauses.map(buildCatches);

    step.branches = [];
    step.branches.push(tryclause);
    docatches.forEach((c: any) => step.branches.push(c));
    step.branches.push(finallyclause);

    if (updateStep) {
      updateStep(step);
    }
  };

  const addNewCatch = () => {
    setCatchClauses((catchClauses: any[]) => [...catchClauses, { onwhen: '', exceptions: [''] }]);
  };

  const handleDynamicInputs = (data: any[]) => {
    setCatchClauses(data);
  };

  return (
    <div className={'do-try pf-u-py-lg'}>
      <p>This EIP behaves like a try-catch-finally block in Java.</p>
      <p>You can define the steps of each block in the canvas. To add new catch blocks, use this tab.</p>
        <Button variant='link' icon={<PlusCircleIcon />} className={'new-do-catch'} data-testid='trycatch-add-catch-button' onClick={addNewCatch}>
          New Catch Block
        </Button>
      <div className='form-group'>
        <DynamicInputs handleDynamicInputs={handleDynamicInputs} catchClauses={catchClauses} />
        <br />
        <Button variant='primary' onClick={saveHandler} data-testid={'trycatch-dosave'}>
          Apply
        </Button>
      </div>
    </div>
  );
};

export default DoCatch;
