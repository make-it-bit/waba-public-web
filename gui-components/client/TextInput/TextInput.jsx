'use client';

import React from 'react';
import classNames from 'classnames';

import { padding } from './_textInput.module.scss';

const TextInput = ({
  type = 'text',
  theme = 'dark',
  name,
  value,
  /* size = "reg", */
  label = undefined,
  placeholder = '',
  disabled = false,
  onChange,
  errorMessage = undefined,
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
    <>
      {label && <label htmlFor={name}>{label}</label>}
      <div className="flex grow-1">
        <input
          className={classNames(
            /* sizes, */
            themes,
            errorMessage && 'border-signal-red-100 text-black-60',
            'w-full px-16 text-sm leading-sm',
            padding
          )}
          type={type}
          id={name}
          name={name}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          onChange={onChange}
        />
      </div>
    </>
  );
};

export default TextInput;
