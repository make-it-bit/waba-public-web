'use client';

import React from 'react';
import classNames from 'classnames';

import styles from './_scrollableNavbar.module.scss';

const ScrollableNavbar = ({ pageIndex, navbarItems, handleClick, justify }) => {
  return (
    <div
      className={classNames(
        'flex items-center md:mt-64 mt-48 mb-32 overflow-x-auto whitespace-nowrap',
        justify,
        styles.navbar
      )}
    >
      {navbarItems.map((item, index) => (
        <p
          key={index}
          className={classNames(
            'grow-0 shrink-0 basis-0 text-sm leading-sm cursor-pointer',
            index !== navbarItems.length - 1 ? 'md:mr-0 mr-48' : 'mr-0',
            /* pageIndex === 1 && 'text-white-100', */
            pageIndex === index && 'underline'
          )}
          onClick={() => handleClick(index)}
        >
          {item}
        </p>
      ))}
    </div>
  );
};

export default ScrollableNavbar;
