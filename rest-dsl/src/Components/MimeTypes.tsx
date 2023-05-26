import { Select, SelectOption, SelectVariant } from '@patternfly/react-core';
import * as defaultMimeTypes from './DefaultMimeTypes';
import { useState } from 'react';

//Code strongly "inspired" from https://www.patternfly.org/v4/components/select/#typeahead
export interface IMimeTypeSelectInputForm {
  label: string;
  onChange: any;
  value: string;
  values: string[];
}

export interface IMimeTypeStatus {
  isOpen: boolean;
  selected: string | undefined;
  label: string;
  values: string[];
  newOptions: JSX.Element[];
}

export const MimeTypeSelectInput = ({ label, onChange, value, values }: IMimeTypeSelectInputForm) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<string | undefined>(value);

  const onToggle = (isNowOpen: boolean) => {
    setIsOpen(isNowOpen);
  };

  // @ts-ignore
  const onSelect = (event, selection, isPlaceholder) => {
    if (isPlaceholder) {
      clearSelection();
    }
    else {
      setSelected(selection);
      setIsOpen(false);
    }
    onChange(selection);
  };

  const clearSelection = () => {
    setSelected(undefined);
    setIsOpen(false);
  };

  let mimetypes: string[] = values;

  if (!mimetypes || mimetypes.length == 0) {
    mimetypes = defaultMimeTypes.DEFAULT_MIME_TYPES;
  }


  if (value && !mimetypes.includes(value)) {
    //Put the value on top
    mimetypes = [value].concat(mimetypes);
  }

  return (
    <Select
      variant={SelectVariant.typeahead}
      typeAheadAriaLabel={label}
      onToggle={onToggle}
      onSelect={onSelect}
      onClear={clearSelection}
      selections={selected}
      isOpen={isOpen}
      aria-labelledby={label}
      placeholderText="application/json"
      isCreatable={true}
    >
      {
        mimetypes.map((v) =>
          <SelectOption selected={v === selected} key={v} value={v} />
        )
      }
    </Select>
  );
}

export const MimeTypes = ({ label, onChange, value, values }: IMimeTypeSelectInputForm) => {

  return (
    <MimeTypeSelectInput
      label={label}
      onChange={onChange}
      value={value}
      values={values}
    />
  );
}

export default MimeTypes;
