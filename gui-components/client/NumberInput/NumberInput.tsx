'use client';

import React from 'react';
import classNames from 'classnames';

import styles from './_numberInput.module.scss';

const NumberInput = ({
  type = 'number',
  theme = 'dark',
  name,
  value,
  minValue,
  maxValue = undefined,
  /* size = "reg", */
  label,
  placeholder = '',
  disabled = false,
  onChange,
  errorMessage = undefined,
}) => {
  const themes = {
    dark: 'bg-transparent border border-black-100 hover:border-black-40 focus-visible:outline-none focus-visible:border-purple-100 focus-visible:drop-shadow-text-input disabled:border-black-20 placeholder-black-60 hover:placeholder-black-80 focus-visible:text-black-100 disabled:placeholder-black-40',
    light:
      'bg-transparent text-white-100 border border-white-100 hover:border-white-40 focus-visible:outline-none focus-visible:border-purple-100 focus-visible:drop-shadow-text-input disabled:border-white-20 placeholder-white-60 hover:placeholder-white-80 focus-visible:text-white-100 active:text-white-100 disabled:placeholder-white-40',
  }[theme];

  /* const sizes = {
    sm: "input-sm",
    reg: "input-reg",
    lg: "input-lg",
  }[size]; */

  return (
    <>
      {label && <label htmlFor={name}>{label}</label>}
      <div className="flex">
        <input
          className={classNames(
            /* sizes, */
            themes,
            errorMessage && 'border-signal-red-100 text-black-60',
            'w-full px-16 text-sm leading-sm',
            styles.padding
          )}
          type={type}
          id={name}
          name={name}
          value={value}
          min={minValue}
          max={maxValue}
          placeholder={placeholder}
          disabled={disabled}
          onChange={onChange}
        />
      </div>
    </>
  );
};

export default NumberInput;
