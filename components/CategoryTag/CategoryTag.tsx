'use client';

import React from 'react';
import classNames from 'classnames';

type CategoryTagProps = {
  isInteractive?: boolean;
  text: string;
  checked?: boolean;
  handleClick?: () => void;
};

const CategoryTag = ({ isInteractive = false, text, checked, handleClick }: CategoryTagProps) => {
  return (
    <div
      className={classNames(
        'flex justify-center items-center px-16 py-4',
        isInteractive
          ? checked
            ? 'border-2 rounded-40 border-deep-purple-60 cursor-pointer'
            : 'border-2 rounded-40 border-transparent hover:border-deep-purple-60 cursor-pointer'
          : 'border rounded-40 border-black-100'
      )}
      onClick={handleClick}
    >
      <p className="text-sm leading-sm">{text}</p>
    </div>
  );
};

export default CategoryTag;
