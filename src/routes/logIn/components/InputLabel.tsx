// @flow
import React from "react";

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
        className={`uk-form-label uk-text-${labelDirection ?? "left"}`}
        style={{ color: "#fd7777", fontWeight: 500 }}
        htmlFor={id ? forTag : ""}
      >
        {label}
      </label>
      <div className="uk-inline">
        <div className="uk-form-controls">
          <span
            className="uk-form-icon uk-text-bolder"
            style={{ color: "#fd7777" }}
            uk-icon={`icon: ${icon}`}
          />
          <input
            className={`uk-text-large uk-input uk-form-width-large`}
            style={{
              borderTop: "none",
              borderLeft: "none",
              borderRight: "2px solid",
              borderBottom: "2px solid",
              borderRadius: 1,
              borderTopLeftRadius: 0,
              borderTopRightRadius: 5,
              borderBottomLeftRadius: 10,
              borderBottomRightRadius: 35,
              height: 55,
              maxWidth: "450px%",
              color: "#fd7777",
            }}
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
