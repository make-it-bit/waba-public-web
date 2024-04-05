'use client';

import React, { useRef, useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import classNames from 'classnames';

import { getImageFullUrl_client } from '@/lib/getImgFullUrl';

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
  const [progressBarWidth, setProgressBarWidth] = useState(0);

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
          if (window.innerWidth >= 768) {
            if (progressBarHeight < refMap[activeId].current.offsetHeight) {
              setProgressBarHeight((prev) => prev + 1);
            } else {
              setProgressBarHeight(0);
              const nextId = activeId === 3 ? 1 : activeId + 1;
              setActiveColor(deviceHeads[nextId - 1].title.split(' ')[0].toLowerCase());
              setActiveId(nextId);
            }
          } else {
            if (progressBarWidth < refMap[activeId].current.offsetWidth) {
              setProgressBarWidth((prev) => prev + 2);
              if (activeId === 1) deviceHeadsListRef.current.scrollTo({ left: 0, behavior: 'smooth' });
              else {
                const element = refMap[activeId].current;
                const scrollPosition = element.offsetLeft - 16;
                deviceHeadsListRef.current.scrollTo({
                  left: scrollPosition,
                  behavior: 'smooth',
                });
              }
            } else {
              setProgressBarWidth(0);
              const nextId = activeId === 3 ? 1 : activeId + 1;
              setActiveColor(deviceHeads[nextId - 1].title.split(' ')[0].toLowerCase());
              setActiveId(nextId);
              if (nextId === 1) deviceHeadsListRef.current.scrollTo({ left: 0, behavior: 'smooth' });
              else {
                const nextElement = refMap[nextId].current;
                const scrollPosition = nextElement.offsetLeft - 16;
                deviceHeadsListRef.current.scrollTo({
                  left: scrollPosition,
                  behavior: 'smooth',
                });
              }
            }
          }
        }
      }, 100);
    }
    return () => interval && clearInterval(interval);
  }, [isIntervalRunning, progressBarHeight, progressBarWidth, refMap, activeId, deviceHeads]);

  const handleDeviceHeadChange = (deviceHead) => {
    setActiveColor(deviceHead.title.split(' ')[0].toLowerCase());
    setActiveId(deviceHead.id);
    if (window.innerWidth >= 768) setProgressBarHeight(0);
    else setProgressBarWidth(0);
  };

  return (
    <div className="container md:pb-216 pb-72 overflow-hidden">
      <div className="grid grid-cols-12">
        <div className="lg:col-start-5 md:col-start-3 col-start-2 lg:col-span-4 md:col-span-8 col-span-10 text-center md:mt-160 mt-72 md:mb-144 mb-88">
          <h1 className="font-rufina md:text-4xl text-3xl md:leading-4xl leading-3xl">{colorsData.title}</h1>
        </div>
      </div>
      <div className="md:grid md:grid-cols-12 flex flex-col">
        <div
          ref={deviceHeadsListRef}
          className={classNames(
            'grid md:col-span-4 md:grid-flow-row grid-flow-col md:auto-cols-auto auto-cols-[minmax(196px,_6fr)] md:gap-48 gap-16 overflow-x-auto overflow-y-hidden md:border-l border-black-60',
            styles.scrollBar
          )}
        >
          {deviceHeads.map((deviceHead, index) => (
            <div
              key={deviceHead.id}
              ref={refMap[deviceHead.id]}
              className="cursor-pointer relative"
              onClick={() => handleDeviceHeadChange(deviceHead)}
              onMouseEnter={() => setIsIntervalRunning(false)}
              onMouseLeave={() => setIsIntervalRunning(true)}
            >
              {activeId === deviceHead.id && (
                <>
                  <div
                    className={classNames('md:block hidden absolute w-4 bg-black-100')}
                    style={{
                      height: `${progressBarHeight}px`,
                    }}
                  />
                  <div
                    className={classNames('md:hidden block absolute h-4 bottom-0 bg-black-100')}
                    style={{
                      width: `${progressBarWidth}px`,
                    }}
                  />
                </>
              )}
              <div
                className={classNames(
                  'md:ml-56 md:mr-48 md:mb-0 mb-16',
                  activeId === deviceHead.id ? 'text-black-100' : 'text-black-30'
                )}
              >
                <p className="text-sm leading-sm">{deviceHead.title}</p>
                <p className="md:block hidden font-rufina text-xl leading-xl">{deviceHead.short_description}</p>
                <p className="md:hidden block font-rufina text-xl leading-xl">{deviceHead.short_mobile_description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="col-span-4 flex justify-between text-center">
          <div
            className="md:hidden flex items-center p-16 mt-80 cursor-pointer"
            onClick={() => {
              setProgressBarWidth(0);
              const previousId = activeId === 1 ? 3 : activeId - 1;
              setActiveColor(deviceHeads[previousId === -1 ? 2 : previousId - 1].title.split(' ')[0].toLowerCase());
              setActiveId(previousId);
            }}
          >
            <Image src="/icons/arrow-left.svg" alt="arrow left" width={8} height={8} />
          </div>
          <div className="relative flex justify-center w-full text-center">
            <p className={classNames('text-7xl leading-7xl md:mt-56 mt-80', colorMap)}>
              {colorsData[`device_head_${activeColor}`].title_in_the_middle}
            </p>
            <Image
              src={getImageFullUrl_client(colorsData[`device_head_${activeColor}`].light_image.data)}
              alt="device lights"
              width={287}
              height={574}
              className="absolute top-0 left-1/2 translate-x-neg-1/2"
            />
            <Image
              src={getImageFullUrl_client(colorsData[`device_head_${activeColor}`].head_image.data)}
              alt="device head"
              width={94}
              height={78}
              className="md:block hidden absolute 2xl:top-[219px] xl:top-[267px] top-[350px] 2xl:left-[250.5px] xl:left-[208px] lg:left-[165.5px] md:left-[122.5px] translate-x-neg-1/2"
            />
            <Image
              src={getImageFullUrl_client(colorsData.device_green_light.data)}
              alt="device green light"
              width={96.5}
              height={10}
              className="md:block hidden absolute 2xl:top-[260px] xl:top-[308px] top-[391px] left-1/2 translate-x-neg-1/2 z-10"
            />
            <Image
              src={getImageFullUrl_client(colorsData.device_body.data)}
              alt="device body"
              width={78}
              height={196}
              className="md:block hidden absolute 2xl:top-[269px] xl:top-[317px] top-400 left-1/2 translate-x-neg-1/2"
            />
          </div>
          <div
            className="md:hidden flex items-center p-16 mt-80 cursor-pointer"
            onClick={() => {
              setProgressBarWidth(0);
              const nextId = activeId === 3 ? 1 : activeId + 1;
              setActiveColor(deviceHeads[nextId - 1].title.split(' ')[0].toLowerCase());
              setActiveId(nextId);
            }}
          >
            <Image src="/icons/arrow-right.svg" alt="arrow right" width={8} height={8} />
          </div>
        </div>
        <div className="relative col-span-4 flex flex-col justify-between">
          <Image
            src={getImageFullUrl_client(colorsData[`device_head_${activeColor}`].head_image.data)}
            alt="device head"
            width={108}
            height={78}
            className={classNames('md:hidden block absolute left-1/2 translate-x-neg-1/2 z-10')}
          />
          <p className="text-sm leading-sm md:text-left text-center md:mt-0 mt-128 mb-56">
            {colorsData[`device_head_${activeColor}`].long_description}
          </p>
          <div className="flex flex-col md:items-start items-center gap-24">
            <Link href={colorsData[`device_head_${activeColor}`].button_1_href}>
              <Button CTA={colorsData[`device_head_${activeColor}`].button_1_text} svg />
            </Link>
            {colorsData[`device_head_${activeColor}`].button_2_href && (
              <Link href={colorsData[`device_head_${activeColor}`].button_2_href}>
                <Button style="secondary" CTA={colorsData[`device_head_${activeColor}`].button_2_text} svg />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Colors;
