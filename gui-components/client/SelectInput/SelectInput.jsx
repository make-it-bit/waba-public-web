"use client";

import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { ReactSVG } from "react-svg";

import { caretDownSm, caretDownReg, caretDownLg, caretDown } from "./_selectInput.module.scss";

const SelectInput = ({
  name,
  id = undefined,
  options,
  onChange,
  value,
  label,
  size = "reg",
  disabled = false,
  placeholder = "",
}) => {
  const sizes = {
    sm: "selectInput-sm",
    reg: "selectInput-reg",
    lg: "selectInput-lg",
  }[size];
  const svgSizes = {
    sm: caretDownSm,
    reg: caretDownReg,
    lg: caretDownLg,
  }[size];

  const [selectOptions, setSelectOptions] = useState([]);

  useEffect(() => {
    if (placeholder === "") {
      setSelectOptions([{ value: "", label: "Select an option" }, ...options]);
    } else {
      setSelectOptions([{ value: "", label: placeholder }, ...options]);
    }
  }, [options, placeholder]);

  return (
    <div className="cursor-pointer">
      {label && (
        <label className={`${sizes}__label word-no-break`} htmlFor={name}>
          {label}
        </label>
      )}
      <div className="relative width-100">
        <select
          onChange={onChange}
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
        >
          {selectOptions.map(({ label, value }, index) => (
            <option key={index} value={value} className={`text-black`}>
              {label}
            </option>
          ))}
        </select>
        <ReactSVG
          className={classNames(svgSizes, caretDown, "flex justify-center items-center")}
          src="/caret-down.svg"
          beforeInjection={(svg) => {
            svg.classList.add("block");
          }}
        />
      </div>
    </div>
  );
};

export default SelectInput;
