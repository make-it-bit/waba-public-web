'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import classNames from 'classnames';

import { getImageFullUrl_client } from '@/lib/getImgFullUrl';

import styles from './_foundationCard.module.scss';

const FoundationCard = ({
  foundationCardData,
  leftBorder = false,
  rightBorder = false,
  bottomBorder = false,
  paddingMargin = '',
  transition = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={classNames(
        'relative flex flex-col items-center text-center gap-24 h-full',
        leftBorder && 'lg:border-l lg:border-black-100',
        rightBorder && 'lg:border-r lg:border-black-100',
        bottomBorder && 'lg:border-b-0 border-b border-black-100',
        paddingMargin,
        transition && 'hover:text-white-100',
        transition && styles.foundationCard
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {transition && (
        <>
          <Image
            src={getImageFullUrl_client(foundationCardData.background_image.data)}
            alt="foundation transition image"
            fill
            className={classNames('absolute w-full h-full object-cover inset-0', styles.image)}
          />
          <div className={classNames('absolute w-full h-full top-0 left-0', styles.gradient)}></div>
        </>
      )}
      {transition && isHovered ? (
        <Image
          src={getImageFullUrl_client(foundationCardData.icon.data[1])}
          alt="icon"
          width={56}
          height={56}
          className={classNames('relative', styles.icon2)}
        />
      ) : (
        <Image
          src={getImageFullUrl_client(foundationCardData.icon.data[0])}
          alt="icon"
          width={56}
          height={56}
          className={classNames('relative', styles.icon1)}
        />
      )}
      <h1 className="relative font-rufina md:text-3xl text-2xl md:leading-3xl leading-2xl">
        {foundationCardData.title}
      </h1>
      <p className="relative text-sm leading-sm">{foundationCardData.description}</p>
    </div>
  );
};

export default FoundationCard;
