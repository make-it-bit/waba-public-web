'use client';

import React, { useEffect, useState } from 'react';
import { ReactSVG } from 'react-svg';
import classNames from 'classnames';

const SelectInput = ({
  theme = 'dark',
  name,
  value,
  options,
  label = '',
  placeholder = '',
  disabled = false,
  onChange,
  errorMessage = '',
  otherClassnames = '',
}) => {
  const themes = {
    dark: 'bg-transparent border border-black-100 hover:border-black-40 focus-visible:outline-none focus-visible:border-purple-100 focus-visible:drop-shadow-text-input disabled:border-black-20 placeholder-black-60 hover:placeholder-black-80 focus-visible:text-black-100 disabled:placeholder-black-40',
    light:
      'bg-transparent text-white-100 border border-white-100 hover:border-white-40 focus-visible:outline-none focus-visible:border-purple-100 focus-visible:drop-shadow-text-input disabled:border-white-20 placeholder-white-60 hover:placeholder-white-80 focus-visible:text-white-100 active:text-white-100 disabled:placeholder-white-40',
  }[theme];

  const [selectOptions, setSelectOptions] = useState([]);

  useEffect(() => {
    if (placeholder === '') {
      setSelectOptions([{ value: '', label: 'Select an option' }, ...options]);
    } else {
      setSelectOptions([{ value: '', label: placeholder }, ...options]);
    }
  }, [options, placeholder]);

  return (
    <div className="flex flex-col gap-4 cursor-pointer">
      {label && <label htmlFor={name}>{label}</label>}
      <div className={classNames('relative flex flex-col grow-1', otherClassnames)}>
        <select
          className={classNames(
            themes,
            errorMessage && 'border-signal-red-100 text-black-60',
            'cursor-pointer w-full px-16 py-[10px] text-sm leading-sm appearance-none'
          )}
          id={name}
          name={name}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          onChange={onChange}
        >
          {selectOptions.map(({ label, value }, index) => (
            <option key={index} value={value}>
              {label}
            </option>
          ))}
        </select>
        <ReactSVG
          className={classNames('absolute top-1/2 translate-y-neg-1/2 right-16')}
          src={theme === 'dark' ? '/caret-down-black.svg' : '/caret-down-white.svg'}
          beforeInjection={(svg) => {
            svg.classList.add('block');
          }}
        />
      </div>
      {errorMessage && <p className="text-sm text-signal-red-100 m-0 mt-[-4px]">{errorMessage}</p>}
    </div>
  );
};

export default SelectInput;
