'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import classNames from 'classnames';

import { Button } from '../../../gui-components/client';

import styles from './_colors.module.scss';

const Colors = ({ colorsData }) => {
  const [activeColor, setActiveColor] = useState('Blue');
  const deviceHeads = ['device_head_blue', 'device_head_red', 'device_head_infrared'].map((key) => colorsData[key]);
  const colorMap = {
    Blue: styles.textBlue,
    Red: styles.textRed,
    Infrared: styles.textInfrared,
  }[activeColor];

  return (
    <div className="container overflow-hidden">
      <div className="grid grid-cols-12 mb-216">
        <div className="col-start-5 col-span-4 text-center mt-160 mb-144">
          <h1 className="font-rufina text-4xl leading-4xl">{colorsData.title}</h1>
        </div>
        <div className="col-start-1 col-span-4 flex flex-col justify-between">
          {deviceHeads.map((deviceHead) => (
            <div
              key={deviceHead.id}
              className="mb-48 cursor-pointer"
              onClick={() => setActiveColor(deviceHead.title.split(' ')[0])}
            >
              <p className="text-sm leading-sm">{deviceHead.title}</p>
              <p className="font-rufina text-xl leading-xl">{deviceHead.short_description}</p>
            </div>
          ))}
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
            {colorsData[`device_head_${activeColor.toLowerCase()}`].long_description}
          </p>
          <div className="flex flex-col gap-24 w-fit">
            <Link href={colorsData[`device_head_${activeColor.toLowerCase()}`].button_1_href}>
              <Button CTA={colorsData[`device_head_${activeColor.toLowerCase()}`].button_1_text} svg />
            </Link>
            <Link href={colorsData[`device_head_${activeColor.toLowerCase()}`].button_2_href}>
              <Button
                style="secondary"
                CTA={colorsData[`device_head_${activeColor.toLowerCase()}`].button_2_text}
                svg
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Colors;
