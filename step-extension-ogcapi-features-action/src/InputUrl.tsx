import { useState } from 'react';
import * as React from 'react';

export const InputUrl = ({ callbackFunction, callbackForServerUrl }) => {
  const [url, setUrl] = useState('');

  const callBackUrl = (data) => {
    setUrl(data.target.value);
    callbackForServerUrl(data.target.value);
  };

  const loadCollections = (event) => {
    let fullUrl = url + '/collections';

    fetch(fullUrl, { method: 'GET', accept: 'application/json' })
      .then((response) => response.json())
      .then((data) => {
        callbackFunction(data.collections);
      });
  };

  return (
    <>
      <div>
        <label htmlFor={'step-extension-ogcapi-features-action-host'}>
          <span>Host of the OGC API server</span>
          <br />
          <small className="form-text text-muted">
            Enter the url you want to query from and load the collections.
          </small>
        </label>
        <input
          className="form-control"
          type="url"
          onChange={callBackUrl}
          required
        ></input>
        <button className="form-control" onClick={loadCollections}>
          Load Collections
        </button>
      </div>
    </>
  );
};
