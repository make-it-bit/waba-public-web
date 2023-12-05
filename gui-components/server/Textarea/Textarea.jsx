import React from "react";
import classNames from "classnames";

const Textarea = ({ name, label, value, onChange, size, rows = 5, maxLength = 1000, placeholder }) => {
  const sizes = {
    sm: "input-sm",
    reg: "input-reg",
    lg: "input-lg",
  }[size];

  return (
    <div>
      {label && (
        <label className={`${sizes}__label word-no-break`} htmlFor={name}>
          {label}
        </label>
      )}
      <textarea
        className={classNames("input pt-8 pr-16 pb-8 pl-16 col-12", sizes)}
        rows={rows}
        maxLength={maxLength}
        onChange={onChange}
        name={name}
        id={name}
        value={value}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Textarea;
