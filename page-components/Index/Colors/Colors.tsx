'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import classNames from 'classnames';

import { Button } from '../../../gui-components/client';

import styles from './_colors.module.scss';

const Colors = () => {
  const [activeColor, setActiveColor] = useState('Blue');
  const colorMap = {
    Blue: styles.textBlue,
    Red: styles.textRed,
    Infrared: styles.textInfrared,
  }[activeColor];

  return (
    <div className="container overflow-hidden">
      <div className="grid grid-cols-12 mb-216">
        <div className="col-start-5 col-span-4 text-center mt-160 mb-144">
          <h1 className="font-rufina text-4xl leading-4xl">Not just different colors, changeable heads instead</h1>
        </div>
        <div className="col-start-1 col-span-4 flex flex-col justify-between">
          <div className="mb-48 cursor-pointer" onClick={() => setActiveColor('Blue')}>
            <p className="text-sm leading-sm">Blue head</p>
            <p className="font-rufina text-xl leading-xl">
              Removes skin imperfections - spots, inflammation and blemishes
            </p>
          </div>
          <div className="mb-48 cursor-pointer" onClick={() => setActiveColor('Red')}>
            <p className="text-sm text-sm leading-sm">Red head</p>
            <p className="font-rufina text-xl leading-xl">Reduces fine lines + wrinkles and firm the skin</p>
          </div>
          <div className="cursor-pointer" onClick={() => setActiveColor('Infrared')}>
            <p className="text-sm text-sm leading-sm">Infrared head</p>
            <p className="font-rufina text-xl leading-xl">Revitalise and balance skin tone</p>
          </div>
        </div>
        <div className="relative col-start-5 col-span-4 flex justify-center text-center">
          <p className={classNames('text-8xl leading-8xl mt-56', colorMap)}>{`${activeColor} head`}</p>
          <Image
            src={`/${activeColor.toLowerCase()}-lights.svg`}
            alt="lights"
            width={287}
            height={574}
            className="absolute top-0 left-1/2 translate-x-neg-1/2"
          />
          <Image
            src={`/device-head-${activeColor.toLowerCase()}.png`}
            alt="device's blue head"
            width={109}
            height={78}
            className="absolute top-[139px] left-1/2 translate-x-neg-1/2"
          />
          <Image
            src="/green-light.svg"
            alt="device's green light"
            width={109}
            height={10}
            className="absolute top-[185px] left-1/2 translate-x-neg-1/2"
          />
          <Image
            src="/device-body.png"
            alt="device's body"
            width={90}
            height={407.24}
            className="absolute top-[196px] left-1/2 translate-x-neg-1/2"
          />
        </div>
        <div className="col-start-9 col-span-4 flex flex-col justify-between">
          <p className="text-sm leading-sm mb-56">
            Blue Light therapy focuses on achieving a clearer and more harmonious complexion by specifically targeting
            common skin concerns such as spots, inflammation, and blemishes. This unique wavelength is renowned for its
            antibacterial properties, making it exceptionally effective in treating acne-prone skin.
          </p>
          <div className="flex flex-col gap-24 w-fit">
            <Link href="#">
              <Button CTA="See the Science Behind" svg />
            </Link>
            <Link href="#">
              <Button style="secondary" CTA={`Studies about ${activeColor} Light`} svg />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Colors;
