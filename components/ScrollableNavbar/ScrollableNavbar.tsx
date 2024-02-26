'use client';

import React from 'react';
import classNames from 'classnames';

import styles from './_scrollableNavbar.module.scss';

const ScrollableNavbar = ({ pageIndex, navbarItems, handleClick, justify }) => {
  const scienceBehindIndex = navbarItems.indexOf('The Science Behind');

  return (
    <div
      className={classNames(
        'flex items-center md:px-0 px-12 py-32 gap-48 overflow-x-auto whitespace-nowrap',
        justify,
        styles.navbar
      )}
    >
      {navbarItems.map((item, index) => (
        <p
          key={index}
          className={classNames(
            'grow-0 shrink-0 basis-0 text-sm leading-sm cursor-pointer border-b',
            pageIndex === scienceBehindIndex && index === scienceBehindIndex && 'text-white-100 border-white-100',
            pageIndex === index && 'border-black-100',
            pageIndex !== scienceBehindIndex && pageIndex !== index && 'border-transparent hover:border-black-100',
            pageIndex === scienceBehindIndex &&
              pageIndex !== index &&
              'text-white-100 border-transparent hover:border-white-100'
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
