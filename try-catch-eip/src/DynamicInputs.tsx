import * as React from 'react';

const style = {
  backgroundColor: 'BlueViolet',
  color: 'white',
  borderRadius: '25px',
  border: 0,
  padding: '20px',
  margin: '10px',
  width: '80%'
};


export const DynamicInputs = ({ handleDynamicInputs, catchClauses }) => {
  const [localValues, setLocalValues] = React.useState({});

  const handleChange = (e) => {
    var x = parseInt(e.target.dataset.x);
    var y = parseInt(e.target.dataset.y);
    var value = e.target.value;
    var newCatchClauses = [...catchClauses];
    newCatchClauses[x]["exceptions"][y] = value;
    handleDynamicInputs(newCatchClauses);
    e.target.checkValidity();
    e.target.reportValidity();
  };
  
  const handleOnWhen = (e) => {
    var x = parseInt(e.target.dataset.x);
    var value = e.target.value;
    var newCatchClauses = [...catchClauses];
    newCatchClauses[x]["onwhen"] = value;
    handleDynamicInputs(newCatchClauses);
    e.target.checkValidity();
    e.target.reportValidity();
  };
  
  const removeException = (e) => {
    var x = parseInt(e.target.dataset.x);
    var y = parseInt(e.target.dataset.y);
    var newCatchClauses = [...catchClauses];
    newCatchClauses[x]["exceptions"] = newCatchClauses[x]["exceptions"].slice(0, y).concat(newCatchClauses[x]["exceptions"].slice(y + 1, newCatchClauses[x]["exceptions"].length));
    handleDynamicInputs(newCatchClauses);
  };
  
  const removeDoCatch = (e) => {
    var id = parseInt(e.target.dataset.id);
    catchClauses = catchClauses.slice(0, id).concat(catchClauses.slice(id + 1, catchClauses.length));
    handleDynamicInputs(catchClauses);
  };
  const addExceptionDoCatch = (e) => {
    var id = parseInt(e.target.dataset.id);
    var newCatchClauses = [...catchClauses];
    newCatchClauses[id]["exceptions"].push("");
    handleDynamicInputs(newCatchClauses);
  };

  if (catchClauses) {
    return (
      <>
        <div className="do-try-catch-eip-catch-clause">
          <form>
            {Object.entries(catchClauses)
              .map(([idx, value]) => {
                 return (
                 <>
                   <div key={idx} style={style}>
                   <p>Optional conditional for this block:</p>
                    <input
                      className="form-control"
                      name={"on-when-" + idx}
                      type="text"
                      data-x={idx}
                      key={"on-when-" + idx}
                      value={value["onwhen"]["simple"]}
                      onChange={handleOnWhen}
                      placeholder="${body.size()} == 1"
                    />
                   <p>List of (Java) exceptions to catch on this block:</p>
                     {Object.entries(value.exceptions)
                        .map(([idy, element]) => {
                          return (
                            <>
                              <input
                                style={{width:"80%"}}
                                className="form-control"
                                name={"exception-" + idy + "-" + idx}
                                type="text"
                                key={idy + "-" + idx}
                                value={element}
                                data-x={idx}
                                data-y={idy}
                                onChange={handleChange}
                                placeholder="java.util.Exception"
                                required
                              />
                             <button type="button" data-x={idx} data-y={idy} className={'remove-exception'}  onClick={removeException} title="Remove Exception">-</button>
                              <br/>
                            </>
                          );
                        })}
                         <br/>
                         <button type="button" data-id={idx} className={'add-do-catch'}  onClick={addExceptionDoCatch} title="Add Exception">+</button>
                         <br/>
                      </div>
                     <button type="button" data-id={idx} className={'remove-do-catch'}  onClick={removeDoCatch}>-</button>
                    </>
                 )
              })}
          </form>
        </div>
      </>
    );
  } else {
    return <></>;
  }
};
