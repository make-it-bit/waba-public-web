import React from 'react';
import classNames from 'classnames';

const Textarea = ({
  theme = 'dark',
  name,
  value,
  /* size, */
  label,
  placeholder,
  rows = 5,
  maxLength = 1000,
  onChange,
}) => {
  const themes = {
    dark: 'bg-transparent border border-black-100 hover:border-black-40 focus-visible:border-none focus-visible:outline focus-visible:outline-1 focus-visible:outline-purple-100 focus-visible:drop-shadow-text-input disabled:border-black-20 placeholder-black-60 hover:placeholder-black-80 focus-visible:text-black-100 disabled:placeholder-black-40',
    light:
      'bg-transparent border border-white-100 hover:border-white-40 focus-visible:border-none focus-visible:outline focus-visible:outline-1 focus-visible:outline-purple-100 focus-visible:drop-shadow-text-input disabled:border-white-20 placeholder-white-60 hover:placeholder-white-80 focus-visible:text-white-100 disabled:placeholder-white-40',
  }[theme];

  /* const sizes = {
    sm: "input-sm",
    reg: "input-reg",
    lg: "input-lg",
  }[size]; */

  return (
    <div>
      {label && <label htmlFor={name}>{label}</label>}
      <textarea
        className={classNames(
          /* sizes, */
          themes,
          /* errorMessage && "border-signal-red-100 text-black-60", */
          'w-full px-16 py-8 text-sm leading-sm'
        )}
        id={name}
        name={name}
        value={value}
        placeholder={placeholder}
        rows={rows}
        maxLength={maxLength}
        onChange={onChange}
      />
    </div>
  );
};

export default Textarea;
