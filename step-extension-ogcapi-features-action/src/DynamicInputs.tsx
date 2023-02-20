import * as React from 'react';

export const DynamicInputs = ({ inputs }) => {
  if (inputs) {
    return (
      <>
        <div className="step-extension-ogcapi-features-action-query">
          {Object.entries(inputs)
            .filter(([key, value], idx) => !!value.type)
            .map(([key, value], idx) => {
              return (
                <div>
                  <label>{value.title}</label>
                  <input className="form-control" type={value.type} data-id={key} key={idx} />
                </div>
              );
            })}
        </div>
      </>
    );
  } else {
    return <></>;
  }
};
