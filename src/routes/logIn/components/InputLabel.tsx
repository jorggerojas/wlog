// @flow
import React from "react";
import { Input } from "../../../styles/styles";

interface InputProps {
  label: string;
  forTag: string;
  props: any;
  type: string;
  icon: string;
  placeholder?: string;
  id?: string;
  labelDirection?: string;
}

const InputLabel = ({
  label,
  forTag,
  props,
  type,
  icon,
  placeholder,
  id,
  labelDirection,
}: InputProps) => {
  return (
    <div>
      <label
        className={`uk-form-label uk-text-${
          labelDirection ?? "left"
        } salmonSpanBold`}
        htmlFor={id ? forTag : ""}
      >
        {label}
      </label>
      <div className="uk-inline uk-flex">
        <div className="uk-form-controls">
          <span
            className="uk-form-icon uk-text-bolder salmonSpan"
            uk-icon={`icon: ${icon}`}
          />
          <Input
            className={`uk-text-large uk-input uk-form-width-large`}
            id={id ?? ""}
            type={type}
            placeholder={placeholder}
            {...props}
          />
        </div>
      </div>
    </div>
  );
};

export default InputLabel;
