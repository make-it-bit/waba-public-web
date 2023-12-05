"use client";

import React from "react";
import classNames from "classnames";

const RadioGroup = ({ name, size = "reg", onChange, selected, radioButtons, layout = "vertical" }) => {
  return (
    <>
      {radioButtons.map(({ label, value, disabled }, index) => (
        <div key={index} className={layout === "vertical" ? "block" : "inline-block"}>
          <label
            className={classNames(
              `radioButton-${size}`,
              selected === value ? "radioButton__checked" : "radioButton__unchecked"
            )}
          >
            <input
              type="radio"
              name={name}
              checked={selected === value}
              id={value}
              disabled={disabled}
              onChange={onChange}
              value={value}
            />
            <div className={`radioButton__tickbox-${size} relative`}>
              {selected === value && <div className={`radioButton__tickbox__inner-${size} absolute`}></div>}
            </div>
            <span className={`radioButton__label-${size}`}>{label}</span>
          </label>
        </div>
      ))}
    </>
  );
};

export default RadioGroup;
