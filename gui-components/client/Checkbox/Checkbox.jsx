'use client';

import React from 'react';
import classNames from 'classnames';
import { ReactSVG } from 'react-svg';

const Checkbox = ({
  name,
  label,
  size = 'reg',
  disabled = false,
  onChange,
  value,
  layout = 'vertical',
  errorMessage = undefined,
  labelColor = 'black',
  otherClassnames = '',
}) => {
  return (
    <div className={classNames(layout === 'vertical' ? 'block' : 'inline-block', otherClassnames)}>
      <label
        className={classNames(
          `checkbox-${size}`,
          errorMessage && (value ? `checkbox__checked--error` : 'checkbox__unchecked--error'),
          value ? `checkbox__checked` : 'checkbox__unchecked',
          'flex gap-4 items-center'
        )}
      >
        <input type="checkbox" name={name} checked={value} id={name} disabled={disabled} onChange={onChange} />
        <div className={`checkbox__tickbox-${size} relative`}>
          {value && (
            <ReactSVG
              src={'/assets/checkmark.svg'}
              className="flex content-center items-center absolute"
              beforeInjection={(svg) => {
                svg.classList.add('block');
                svg.classList.add('checkbox__svg');
              }}
            />
          )}
        </div>
        <span className={classNames(`checkbox__label-${size}`, labelColor)}>{label}</span>
      </label>
    </div>
  );
};

export default Checkbox;
