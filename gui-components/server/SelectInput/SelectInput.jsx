import React from "react";
import classNames from "classnames";

const SelectInput = ({
  name,
  id = undefined,
  value,
  label,
  size = "reg",
  disabled = false,
}) => {
  const sizes = {
    sm: "selectInput-sm",
    reg: "selectInput-reg",
    lg: "selectInput-lg",
  }[size];

  return (
    <div className="cursor-pointer">
      {label && (
        <label className={`${sizes}__label word-no-break`} htmlFor={name}>
          {label}
        </label>
      )}
      <div className="position-relative width-100">
        <select
          name={name}
          id={id}
          disabled={disabled}
          value={value}
          className={classNames(
            "selectInput pr-40 cursor-pointer text-black",
            !value && "selectInput--placeholder",
            disabled && "selectInput--disabled",
            sizes
          )}
        ></select>
      </div>
    </div>
  );
};

export default SelectInput;
