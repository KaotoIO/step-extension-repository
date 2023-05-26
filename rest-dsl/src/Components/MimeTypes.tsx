import { Select, SelectOption, SelectVariant } from '@patternfly/react-core';
import * as defaultMimeTypes from './DefaultMimeTypes';
import React from 'react';

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

class MimeTypeSelectInput extends React.Component<IMimeTypeSelectInputForm, IMimeTypeStatus> {
  onToggle: (isOpen: any) => void;
  onSelect: (event: any, selection: any, isPlaceholder: any) => void;
  onCreateOption: (newValue: any) => void;
  constructor(props: IMimeTypeSelectInputForm) {
    super(props);

    this.state = {
      isOpen: false,
      selected: props.value,
      label: props.label,
      values: props.values,
      newOptions: []
    };

    this.onToggle = isOpen => {
      this.setState({
        isOpen
      });
    };

    // @ts-ignore
    this.onSelect = (event, selection, isPlaceholder) => {
      if (isPlaceholder) this.clearSelection();
      else {
        this.setState({
          selected: selection,
          isOpen: false
        });
      }
      props.onChange(selection);
    };

    this.onCreateOption = newValue => {
      this.setState({
        newOptions: [...this.state.newOptions, <SelectOption key={newValue} value={newValue} />]
      });
    };

    this.clearSelection = () => {
      this.setState({
        selected: undefined,
        isOpen: false
      });
    };
  }
  clearSelection() {
    throw new Error('Method not implemented.');
  }

  render() {
    const { isOpen, selected, label, values } = this.state;
    let mimetypes: string[] = values;

    if (!mimetypes || mimetypes.length == 0) {
      mimetypes = defaultMimeTypes.DEFAULT_MIME_TYPES;
    }


    if (selected && !mimetypes.includes(selected)) {
      //Put the value on top
      mimetypes = [selected].concat(mimetypes);
    }

    return (
      <Select
        variant={SelectVariant.typeahead}
        typeAheadAriaLabel={label}
        onToggle={this.onToggle}
        onSelect={this.onSelect}
        onClear={this.clearSelection}
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
