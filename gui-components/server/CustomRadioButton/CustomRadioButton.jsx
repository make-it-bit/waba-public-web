import React from 'react';
import classNames from 'classnames';

const CustomRadioButton = ({ CTA, type = 'radio', id, name, value, checked, onChange, disabled = false }) => {
  return (
    <>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className="hidden"
      />
      <label
        htmlFor={id}
        className={classNames('block font-rufina text-4xl leading-4xl cursor-pointer', checked && 'font-bold')}
      >
        {CTA}
      </label>
    </>
  );
};

export default CustomRadioButton;
