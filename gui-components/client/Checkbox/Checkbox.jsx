"use client";

import React from "react";
import classNames from "classnames";
import { ReactSVG } from "react-svg";

const Checkbox = ({
  name,
  label,
  size = "reg",
  disabled = false,
  onChange,
  value,
  layout = "vertical",
  errorMessage = undefined,
}) => {
  return (
    <div className={layout === "vertical" ? "block" : "inline-block"}>
      <label
        className={classNames(
          `checkbox-${size}`,
          errorMessage &&
            (value ? `checkbox__checked--error` : "checkbox__unchecked--error"),
          value ? `checkbox__checked` : "checkbox__unchecked"
        )}
      >
        <input
          type="checkbox"
          name={name}
          checked={value}
          id={name}
          disabled={disabled}
          onChange={onChange}
        />
        <div className={`checkbox__tickbox-${size} relative`}>
          {value && (
            <ReactSVG
              src={"/assets/checkmark.svg"}
              className="flex content-center items-center absolute"
              beforeInjection={(svg) => {
                svg.classList.add("block");
                svg.classList.add("checkbox__svg");
              }}
            />
          )}
        </div>
        <span className={`checkbox__label-${size}`}>{label}</span>
      </label>
    </div>
  );
};

export default Checkbox;
