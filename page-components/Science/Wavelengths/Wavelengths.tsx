'use client';

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import classNames from 'classnames';

import styles from './_wavelenghts.module.scss';

const Wavelengths = ({ wavelengthsData }) => {
  const [triggerBlueWaveAnimation, setTriggerBlueWaveAnimation] = useState(false);
  const [triggerPinkWaveAnimation, setTriggerPinkWaveAnimation] = useState(false);
  const blueWave = useRef<HTMLDivElement>(null);
  const pinkWave = useRef<HTMLDivElement>(null);
  const bgImage2 = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (blueWave.current) {
        const blueWavePosition = blueWave.current.getBoundingClientRect();
        const blueWaveIsCentered = blueWavePosition.top <= window.innerHeight / 2 && blueWavePosition.top >= 0;
        if (blueWaveIsCentered && !triggerBlueWaveAnimation) setTriggerBlueWaveAnimation(true);
      }

      if (pinkWave.current) {
        const pinkWavePosition = pinkWave.current.getBoundingClientRect();
        const pinkWaveIsCentered = pinkWavePosition.top <= window.innerHeight / 2 && pinkWavePosition.top >= 0;
        if (pinkWaveIsCentered && !triggerPinkWaveAnimation) setTriggerPinkWaveAnimation(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [triggerBlueWaveAnimation, triggerPinkWaveAnimation]);

  useEffect(() => {
    const handleScroll = () => {
      if (bgImage2.current) {
        const bgImage2Position = bgImage2.current.getBoundingClientRect();
        const isBgImage2Visible = bgImage2Position.top <= window.innerHeight && bgImage2Position.top >= 0;
        if (isBgImage2Visible) {
          const newOpacity = 1 - Math.abs(bgImage2Position.top) / window.innerHeight + 0.35;
          bgImage2.current.style.opacity = `${newOpacity}`;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="container overflow-hidden">
      <div className="grid grid-cols-12 items-center xl:my-272 md:my-156 my-72">
        <div className="col-span-12 xl:col-start-2 xl:col-span-5">
          <div className="flex flex-col gap-32 xl:text-left text-center">
            <h1 className="font-rufina text-5xl leading-5xl">{wavelengthsData.title}</h1>
            <p className="xl:block hidden text-sm leading-sm">{wavelengthsData.description}</p>
          </div>
        </div>
        <div className="relative col-span-12 xl:col-start-8 xl:col-span-5 xl:h-full h-144 xl:my-0 my-48">
          <div
            ref={blueWave}
            className={classNames(
              'absolute bottom-0 left-1/2 translate-x-neg-1/2',
              styles.wavelengthImageWrapper,
              triggerBlueWaveAnimation && styles.blueWaveAnimation
            )}
          >
            <Image src="/wavelength-blue.svg" alt="wavelength" width={408} height={171} className="w-full h-auto" />
          </div>
          <div
            ref={pinkWave}
            className={classNames(
              'absolute bottom-0 left-1/2 translate-x-neg-1/2',
              styles.wavelengthImageWrapper,
              triggerPinkWaveAnimation && styles.pinkWaveAnimation
            )}
          >
            <Image src="/wavelength-pink.svg" alt="wavelength" width={408} height={171} className="w-full h-auto" />
          </div>
          <div className={classNames('absolute bottom-0 left-1/2 translate-x-neg-1/2', styles.wavelengthImageWrapper)}>
            <Image src="/wavelength-orange.svg" alt="wavelength" width={408} height={171} className="w-full h-auto" />
          </div>
          <Image
            src="/wavelengths-bg-1.png"
            alt="wavelengths"
            width={525}
            height={219}
            className="absolute bottom-0 left-1/2 translate-x-neg-1/2 xl:w-full w-auto xl:h-auto h-144"
          />
          <Image
            ref={bgImage2}
            src="/wavelengths-bg-2.png"
            alt="wavelengths"
            width={525}
            height={219}
            className="absolute bottom-0 left-1/2 translate-x-neg-1/2 xl:w-full w-auto xl:h-auto h-144"
          />
        </div>
        <div className="col-span-12 xl:hidden">
          <p className="text-sm leading-sm text-center">{wavelengthsData.description}</p>
        </div>
      </div>
    </div>
  );
};

export default Wavelengths;
