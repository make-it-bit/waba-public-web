'use client';

import React from 'react';
import { ReactSVG } from 'react-svg';
import classNames from 'classnames';

type TagProps = {
  text: string;
  svg?: boolean;
};

const Tag = ({ text, svg = false }: TagProps) => {
  return (
    <div
      className={classNames(
        'flex items-center bg-transparent border rounded-40 border-black-100 py-4',
        svg && 'gap-8',
        svg ? 'pr-16 pl-8' : 'px-16'
      )}
    >
      {svg && <ReactSVG src="/logos/eu.svg" className="inline-block" />}
      <p className="text-sm leading-sm">{text}</p>
    </div>
  );
};

export default Tag;
