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
    <div className="container md:pb-216 pb-72 overflow-hidden">
      <div className="grid grid-cols-12">
        <div className="md:col-start-5 col-start-2 md:col-span-4 col-span-10 text-center md:mt-160 mt-72 md:mb-144 mb-88">
          <h1 className="font-rufina md:text-4xl text-3xl md:leading-4xl leading-3xl">{colorsData.title}</h1>
        </div>
      </div>
      <div className="md:grid md:grid-cols-12 flex flex-col">
        <div className="grid md:col-start-1 md:col-span-4 md:grid-flow-row grid-flow-col md:auto-cols-auto auto-cols-[minmax(300px,_4fr)] md:gap-48 gap-16 overflow-x-auto">
          {deviceHeads.map((deviceHead) => (
            <div
              key={deviceHead.id}
              className="cursor-pointer"
              onClick={() => setActiveColor(deviceHead.title.split(' ')[0])}
            >
              <p className="text-sm leading-sm">{deviceHead.title}</p>
              <p className="md:block hidden font-rufina text-xl leading-xl">{deviceHead.short_description}</p>
              <p className="md:hidden block font-rufina text-xl leading-xl">{deviceHead.short_mobile_description}</p>
            </div>
          ))}
        </div>
        <div className="relative col-start-5 col-span-4 flex justify-center text-center">
          <p
            className={classNames('md:text-5xl text-8xl md:leading-5xl leading-8xl md:mt-56 mt-80', colorMap)}
          >{`${activeColor} head`}</p>
          <Image
            src={`/${activeColor.toLowerCase()}-lights.svg`}
            alt="lights"
            width={287}
            height={574}
            className="absolute top-0 left-1/2 translate-x-neg-1/2"
          />
          <Image
            src={`/device-head-${activeColor.toLowerCase()}.png`}
            alt="device's head"
            width={109}
            height={78}
            className={classNames(
              'absolute xl:top-[138px] lg:top-[179px] md:top-[290px] left-1/2 translate-x-neg-1/2',
              activeColor.toLowerCase() === 'infrared' ? 'top-288' : 'top-152'
            )}
          />
          <Image
            src="/green-light.svg"
            alt="device's green light"
            width={109}
            height={10}
            className="md:block hidden absolute xl:top-[185px] lg:top-[226px] md:top-[337px] left-1/2 translate-x-neg-1/2"
          />
          <Image
            src="/device-body.png"
            alt="device's body"
            width={90}
            height={407.24}
            className="md:block hidden absolute xl:top-[196px] lg:top-[237px] md:top-[348px] left-1/2 translate-x-neg-1/2"
          />
        </div>
        <div className="col-start-9 col-span-4 flex flex-col justify-between">
          <p className="text-sm leading-sm md:text-left text-center md:mt-0 mt-64 mb-56">
            {colorsData[`device_head_${activeColor.toLowerCase()}`].long_description}
          </p>
          <div className="flex flex-col md:items-start items-center gap-24">
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
