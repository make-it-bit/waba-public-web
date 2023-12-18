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
        leftBorder && 'lg:border-l lg:border-black-100',
        rightBorder && 'lg:border-r lg:border-black-100',
        bottomBorder && 'lg:border-b-0 border-b border-black-100',
        paddingMargin
      )}
    >
      <Image src={icon} alt="icon" width={56} height={56} />
      <h1 className="font-rufina text-3xl leading-3xl">{title}</h1>
      <p className="text-sm leading-sm">{content}</p>
    </div>
  );
};

export default FoundationCard;
