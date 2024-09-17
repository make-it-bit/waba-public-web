'use client';

import React from 'react';
import classNames from 'classnames';

import styles from './_numberInput.module.scss';

type NumberInputProps = {
  type?: 'number';
  theme?: 'dark' | 'light';
  name: string;
  value: number;
  minValue?: number;
  maxValue?: number;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errorMessage?: string;
};

const NumberInput = ({
  type = 'number',
  theme = 'dark',
  name,
  value,
  minValue,
  maxValue,
  label = '',
  placeholder = '',
  disabled = false,
  onChange,
  errorMessage = '',
}: NumberInputProps) => {
  const themes = {
    dark: 'bg-transparent border border-black-100 hover:border-black-40 focus-visible:outline-none focus-visible:border-purple-100 focus-visible:drop-shadow-text-input disabled:border-black-20 placeholder-black-60 hover:placeholder-black-80 focus-visible:text-black-100 disabled:placeholder-black-40',
    light:
      'bg-transparent text-white-100 border border-white-100 hover:border-white-40 focus-visible:outline-none focus-visible:border-purple-100 focus-visible:drop-shadow-text-input disabled:border-white-20 placeholder-white-60 hover:placeholder-white-80 focus-visible:text-white-100 active:text-white-100 disabled:placeholder-white-40',
  }[theme];

  return (
    <div className="flex flex-col gap-4">
      {label && <label htmlFor={name}>{label}</label>}
      <div className="flex flex-col grow-1">
        <input
          className={classNames(
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
        {errorMessage && <p className="text-sm text-signal-red-100 m-0">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default NumberInput;
