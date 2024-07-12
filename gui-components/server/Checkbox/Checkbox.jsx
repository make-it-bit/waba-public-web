import React from 'react';
import classNames from 'classnames';

const Checkbox = ({
  name,
  label,
  size = 'reg',
  disabled = false,
  value,
  layout = 'vertical',
  errorMessage = undefined,
}) => {
  return (
    <div className={layout === 'vertical' ? 'flex' : 'inline-block'}>
      <label
        className={classNames(
          `checkbox-${size}`,
          errorMessage && (value ? `checkbox__checked--error` : 'checkbox__unchecked--error'),
          value ? `checkbox__checked` : 'checkbox__unchecked'
        )}
      >
        <input type="checkbox" name={name} checked={value} id={name} disabled={disabled} />
        <div className={`checkbox__tickbox-${size} relative`}>
          {value && (
            <div className="content-center items-center absolute">
              <svg
                width="24px"
                height="24px"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
              >
                <title>icons/checkmark</title>
                <defs>
                  <path
                    d="M9.06424325,15.0186166 L18.2793551,5.4830228 C18.9017402,4.8389924 19.910826,4.8389924 20.5332111,5.4830228 C21.1555963,6.1270532 21.1555963,7.17123278 20.5332111,7.81526318 L10.1911713,18.5169772 C9.56878612,19.1610076 8.55970039,19.1610076 7.93731523,18.5169772 L3.46678887,13.8909754 C2.84440371,13.246945 2.84440371,12.2027655 3.46678887,11.5587351 C4.08917404,10.9147047 5.09825976,10.9147047 5.72064493,11.5587351 L9.06424325,15.0186166 Z"
                    id="path-1"
                  ></path>
                </defs>
                <g id="Symbols" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                  <g id="icons/checkmark">
                    <mask id="mask-2" fill="white">
                      <use xlinkHref="#path-1"></use>
                    </mask>
                    <use id="Shape" fill="#22231D" xlinkHref="#path-1"></use>
                  </g>
                </g>
              </svg>
            </div>
          )}
        </div>
        <span className={`checkbox__label-${size}`}>{label}</span>
      </label>
    </div>
  );
};

export default Checkbox;
