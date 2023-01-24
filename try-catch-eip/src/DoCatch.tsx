import { useState } from 'react';
import { DynamicInputs } from './DynamicInputs';
import * as React from 'react';
import { IStepProps } from '../ogcapi-features-action/kaoto/dts/types';
import { Button } from '@patternfly/react-core';
import PlusCircleIcon from '@patternfly/react-icons/dist/esm/icons/plus-circle-icon';

export interface IDoCatchForm {
  saveConfig?: (newConfig: any) => void;
  step?: IStepProps;
}

export const DoCatch = ({ saveConfig, step }: DoCatch) => {
  function extractCatches(branch, index, arr) {
    if (branch.identifier != "steps" && branch.identifier != "do-finally") {
      return {
              id: branch.identifier,
              onwhen: branch.parameters.filter((p) => p.id =="on-when")[0].value, 
              exceptions: branch.parameters.filter((p) => p.id =="exceptions")[0].value
              };
    } 
    
    return null;
  }
  
  function buildCatches(branch, index, arr) {
    var steps = [];
    if (branch.id != null) {
      var potentialBranch = step.branches.filter(b => b.identifier == branch.id);
      if (potentialBranch.length > 0) {
        steps = potentialBranch[0].steps;
      }
    }
  
  
    return { 
              steps: steps, 
              parameters: [ 
                { 
                  type: "array", 
                  id: "exceptions",
                  value: branch.exceptions
                },
                { 
                  type: "object", 
                  id: "on-when",
                  value: 
                  {
                    simple: branch.onwhen
                  }
                }
              ], 
              identifier: branch.id || "do-catch-" + (index + 1), 
              conditionSyntax: "SIMPLE" 
              };
  }
  let branches = [];
  
  if (step?.branches != null) {
    branches = step.branches.map(extractCatches).filter((o) => o != null);
  }
  const [catchClauses, setCatchClauses] = useState(  branches );

  const saveHandler = () => {

    var branches = [];
    var i = 0;
    
    if (step.branches == null) {
      step.branches = [];
    }
    
    var tryclause = step.branches.filter((o) => o != null).filter((b) => b.identifier == "steps");
    if (tryclause.length > 0) {
      tryclause = tryclause[0];
    } else {
      tryclause = { 
              steps: [], 
              parameters: [], 
              identifier: "steps", 
              condition: null, 
              conditionSyntax: "SIMPLE" 
              };
    }
    
    var finallyclause = step.branches.filter((o) => o != null).filter((b) => b.identifier == "do-finally");
    if (finallyclause.length > 0) {
      finallyclause = finallyclause[0];
    } else {
      finallyclause = { 
              steps: [], 
              parameters: [], 
              identifier: "do-finally", 
              condition: null, 
              conditionSyntax: "SIMPLE" 
              }; 
    }
    
    var docatches = catchClauses.map(buildCatches);
    
    step.branches = [];
    step.branches.push(tryclause);
    docatches.forEach(c => step.branches.push(c));
    step.branches.push(finallyclause);
    
    if (saveConfig) {
      saveConfig(step);
    }
  };
  
  const addNewCatch = () => {
    setCatchClauses(catchClauses => [...catchClauses, { onwhen: "", exceptions: [""]}]);
  };


  const handleDynamicInputs = (data) => {
    setCatchClauses(data);
  };


  return (
    <>
    <div className={'do-try'} >
      <p>This EIP behaves like a try-catch-finally block in Java.</p>
      <p>Add new catch clauses here:</p>
      <div className="form-group">
        <DynamicInputs handleDynamicInputs={handleDynamicInputs} catchClauses={catchClauses} />
        <button className={'new-do-catch'}  onClick={addNewCatch}>New Catch Block</button>
        <br/>
        <Button variant="primary" onClick={saveHandler}>Save Configuration</Button>
        </div>
      </div>
    </>
  );
};

export default DoCatch;

