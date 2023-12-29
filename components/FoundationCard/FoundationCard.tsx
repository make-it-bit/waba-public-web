import React from 'react';
import Image from 'next/image';
import classNames from 'classnames';

const FoundationCard = ({
  icon,
  title,
  content,
  leftBorder = false,
  rightBorder = false,
  bottomBorder = false,
  paddingMargin = '',
}) => {
  return (
    <div
      className={classNames(
        'flex flex-col items-center text-center gap-24 h-full',
        leftBorder && 'md:border-l md:border-black-100',
        rightBorder && 'md:border-r md:border-black-100',
        bottomBorder && 'md:border-b-0 border-b border-black-100',
        paddingMargin
      )}
    >
      <Image src={icon} alt="icon" width={56} height={56} />
      <h1 className="font-rufina md:text-3xl text-2xl md:leading-3xl leading-2xl">{title}</h1>
      <p className="text-sm leading-sm">{content}</p>
    </div>
  );
};

export default FoundationCard;
