'use client';

import React from 'react';
import classNames from 'classnames';

import styles from './_scrollableNavbar.module.scss';

const ScrollableNavbar = ({ pageIndex, navbarItems, handleClick, justify }) => {
  return (
    <div
      className={classNames(
        'flex items-center md:px-0 px-12 my-32 gap-48 overflow-x-auto whitespace-nowrap',
        justify,
        styles.navbar
      )}
    >
      {navbarItems.map((item, index) => (
        <p
          key={index}
          className={classNames(
            'grow-0 shrink-0 basis-0 text-sm leading-sm cursor-pointer',
            pageIndex === 1 && navbarItems.includes('The Science Behind') && 'text-white-100',
            pageIndex === index && 'border-b border-black-100'
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
