"use client";
import React from "react";
import classNames from "classnames";

const TextInput = ({
  name,
  label = undefined,
  size = "reg",
  placeholder = "",
  type = "text",
  value,
  onChange,
  disabled = false,
  errorMessage = undefined,
}) => {
  const sizes = {
    sm: "input-sm",
    reg: "input-reg",
    lg: "input-lg",
  }[size];
  return (
    <>
      {label && (
        <label className={`${sizes}__label word-no-break`} htmlFor={name}>
          {label}
        </label>
      )}
      <div className="flex">
        <input
          className={classNames(
            "width-100",
            sizes,
            errorMessage && "input--error",
            disabled && "input--disabled",
            "input--placeholder"
          )}
          type={type}
          id={name}
          name={name}
          value={value}
          disabled={disabled}
          placeholder={placeholder}
          onChange={onChange}
        />
      </div>
    </>
  );
};

export default TextInput;
