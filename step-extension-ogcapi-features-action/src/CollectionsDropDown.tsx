import * as React from 'react';

export const CollectionsDropDown = ({
  collections,
  callbackFunction,
  serverUrl,
  setCollection,
}) => {
  const loadQueryable = (event) => {
    setCollection(event.target.value);
    let url = serverUrl + '/collections/' + event.target.value + '/queryables';

    fetch(url, { method: 'GET', accept: 'application/json' })
      .then((response) => response.json())
      .then((data) => {
        callbackFunction(data.properties);
      });
  };

  return (
      <>
        <div>
          <label>
            <span>Collection</span>
            <br/>
            <small className="form-text text-muted">Select a collection to load queryables.</small>
          </label>
          <select  className="form-control" name="collection" required onChange={loadQueryable}>
            <option value="" >
                Select a collection here
            </option>
            {collections.map((collection, idx) => {
              return (
                <option id={collection.id} value={collection.id} key={idx}>
                    [{collection.id}] {collection.description.substring(0,45)} ...
                </option>
              );
            })}
          </select>
        </div>
      </>
  );
};
