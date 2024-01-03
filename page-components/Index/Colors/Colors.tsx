'use client';

import React, { useRef, useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import classNames from 'classnames';

import { Button } from '@/gui-components/client';

import styles from './_colors.module.scss';

const Colors = ({ colorsData }) => {
  const deviceHeadsListRef = useRef<HTMLDivElement>(null);
  const blueHeadRef = useRef<HTMLDivElement>(null);
  const redHeadRef = useRef<HTMLDivElement>(null);
  const infraredHeadRef = useRef<HTMLDivElement>(null);
  const refMap = useMemo(
    () => ({
      1: blueHeadRef,
      2: redHeadRef,
      3: infraredHeadRef,
    }),
    []
  );
  const [isIntervalRunning, setIsIntervalRunning] = useState(true);
  const [activeId, setActiveId] = useState(1);
  const [progressBarHeight, setProgressBarHeight] = useState(0);

  const [activeColor, setActiveColor] = useState('blue');
  const colorMap = {
    blue: styles.textBlue,
    red: styles.textRed,
    infrared: styles.textInfrared,
  }[activeColor];

  // puts the device heads in the order they should be displayed (strapi gives them in a wrong order)
  const deviceHeads = ['device_head_blue', 'device_head_red', 'device_head_infrared'].map((key) => colorsData[key]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isIntervalRunning) {
      interval = setInterval(() => {
        if (deviceHeadsListRef.current && refMap[activeId].current) {
          if (progressBarHeight < refMap[activeId].current.offsetHeight) {
            setProgressBarHeight((prev) => prev + 1);
          } else {
            setProgressBarHeight(0);
            const nextId = activeId === 3 ? 1 : activeId + 1;
            setActiveColor(deviceHeads[nextId - 1].title.split(' ')[0].toLowerCase());
            setActiveId(nextId);
            const nextElement = refMap[nextId].current;
            const scrollPosition = nextElement.offsetLeft - 16;
            deviceHeadsListRef.current.scrollTo({
              left: scrollPosition,
              behavior: 'smooth',
            });
          }
        }
      }, 100);
    }
    return () => interval && clearInterval(interval);
  }, [isIntervalRunning, progressBarHeight, refMap, activeId, deviceHeads]);

  return (
    <div className="container md:pb-216 pb-72 overflow-hidden">
      <div className="grid grid-cols-12">
        <div className="md:col-start-5 col-start-2 md:col-span-4 col-span-10 text-center md:mt-160 mt-72 md:mb-144 mb-88">
          <h1 className="font-rufina md:text-4xl text-3xl md:leading-4xl leading-3xl">{colorsData.title}</h1>
        </div>
      </div>
      <div className="md:grid md:grid-cols-12 flex flex-col">
        <div
          ref={deviceHeadsListRef}
          className="grid md:col-span-4 md:grid-flow-row grid-flow-col md:auto-cols-auto auto-cols-[minmax(196px,_6fr)] md:gap-48 gap-16 overflow-x-auto"
        >
          {deviceHeads.map((deviceHead) => (
            <div
              key={deviceHead.id}
              ref={refMap[deviceHead.id]}
              className={classNames('cursor-pointer relative', activeId === deviceHead.id && styles.active)}
              onClick={() => {
                setActiveColor(deviceHead.title.split(' ')[0].toLowerCase());
                setActiveId(deviceHead.id);
                setProgressBarHeight(0);
              }}
              onMouseEnter={() => setIsIntervalRunning(false)}
              onMouseLeave={() => setIsIntervalRunning(true)}
            >
              {activeId === deviceHead.id && (
                <div
                  className={classNames('absolute w-4 bg-black-100', styles.progressBar)}
                  style={{
                    height: `${progressBarHeight}px`,
                  }}
                />
              )}
              <div className="ml-6">
                <p className="text-sm leading-sm">{deviceHead.title}</p>
                <p className="md:block hidden font-rufina text-xl leading-xl">{deviceHead.short_description}</p>
                <p className="md:hidden block font-rufina text-xl leading-xl">{deviceHead.short_mobile_description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="relative col-span-4 flex justify-center text-center">
          <p className={classNames('md:text-5xl text-7xl md:leading-5xl leading-7xl md:mt-56 mt-80', colorMap)}>{`${
            activeColor.charAt(0).toUpperCase() + activeColor.slice(1)
          } head`}</p>
          <Image
            src={`/${activeColor}-lights.svg`}
            alt="lights"
            width={287}
            height={574}
            className="absolute top-0 left-1/2 translate-x-neg-1/2"
          />
          <Image
            src={`/device-head-${activeColor}.png`}
            alt="device's head"
            width={109}
            height={78}
            className={classNames(
              'absolute xl:top-[138px] lg:top-[179px] md:top-[290px] top-152 left-1/2 translate-x-neg-1/2',
              activeColor === 'infrared' && styles.headInfrared
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
        <div className="col-span-4 flex flex-col justify-between">
          <p className="text-sm leading-sm md:text-left text-center md:mt-0 mt-64 mb-56">
            {colorsData[`device_head_${activeColor}`].long_description}
          </p>
          <div className="flex flex-col md:items-start items-center gap-24">
            <Link href={colorsData[`device_head_${activeColor}`].button_1_href}>
              <Button CTA={colorsData[`device_head_${activeColor}`].button_1_text} svg />
            </Link>
            <Link href={colorsData[`device_head_${activeColor}`].button_2_href}>
              <Button style="secondary" CTA={colorsData[`device_head_${activeColor}`].button_2_text} svg />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Colors;
