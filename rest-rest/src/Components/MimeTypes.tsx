import { Select, SelectOption, SelectVariant } from '@patternfly/react-core';
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
      //List of mimetypes from https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types  
      mimetypes = ["audio/aac", "application/x-abiword", "application/x-freearc", "image/avif", "video/x-msvideo", "application/vnd.amazon.ebook",
        "application/octet-stream", "image/bmp", "application/x-bzip", "application/x-bzip2", "application/x-cdf", "application/x-csh", "text/css", "text/csv",
        "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/vnd.ms-fontobject", "application/epub+zip",
        "application/gzip", "image/gif", "text/html", "image/vnd.microsoft.icon", "text/calendar", "application/java-archive", "image/jpeg", "text/javascript",
        "application/json", "application/ld+json", "audio/midi", "audio/x-midi", "text/javascript", "audio/mpeg", "video/mp4", "video/mpeg", "application/vnd.apple.installer+xml",
        "application/vnd.oasis.opendocument.presentation", "application/vnd.oasis.opendocument.spreadsheet", "application/vnd.oasis.opendocument.text", "audio/ogg",
        "video/ogg", "application/ogg", "audio/opus", "font/otf", "image/png", "application/pdf", "application/x-httpd-php", "application/vnd.ms-powerpoint",
        "application/vnd.openxmlformats-officedocument.presentationml.presentation", "application/vnd.rar", "application/rtf", "application/x-sh", "image/svg+xml",
        "application/x-tar", "image/tiff", "video/mp2t", "font/ttf", "text/plain", "application/vnd.visio", "audio/wav", "audio/webm", "video/webm", "image/webp", "font/woff",
        "font/woff2", "application/xhtml+xml", "application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "application/xml",
        "application/vnd.mozilla.xul+xml", "application/zip", "video/3gpp", "audio/3gpp", "video/3gpp2", "audio/3gpp2", "application/x-7z-compressed"];
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
            <SelectOption selected={v == selected} key={v} value={v} />
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
