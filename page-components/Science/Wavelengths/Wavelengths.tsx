'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import classNames from 'classnames';

import styles from './_wavelenghts.module.scss';

const Wavelengths = ({ wavelengthsData }) => {
  const blueWave = useRef<HTMLDivElement>(null);
  const pinkWave = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (blueWave.current) {
        const blueWavePosition = blueWave.current.getBoundingClientRect();
        const isBlueWaveVisible = blueWavePosition.top <= window.innerHeight && blueWavePosition.top >= 0;
        if (isBlueWaveVisible) blueWave.current.style.transform = `translateX(${-50 - window.scrollY / 150}%)`;
      }

      if (pinkWave.current) {
        const pinkWavePosition = pinkWave.current.getBoundingClientRect();
        const isPinkWaveVisible = pinkWavePosition.top <= window.innerHeight && pinkWavePosition.top >= 0;
        if (isPinkWaveVisible) pinkWave.current.style.transform = `translateX(${-50 + window.scrollY / 150}%)`;
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
            className={classNames('absolute bottom-0 left-1/2 translate-x-neg-1/2', styles.wavelengthImageWrapper)}
          >
            <Image src="/wavelength-blue.svg" alt="wavelength" width={408} height={171} className="w-full h-auto" />
          </div>
          <div className={classNames('absolute bottom-0 left-1/2 translate-x-neg-1/2', styles.wavelengthImageWrapper)}>
            <Image src="/wavelength-orange.svg" alt="wavelength" width={403} height={171} className="w-full h-auto" />
          </div>
          <div
            ref={pinkWave}
            className={classNames('absolute bottom-0 left-1/2 translate-x-neg-1/2', styles.wavelengthImageWrapper)}
          >
            <Image src="/wavelength-pink.svg" alt="wavelength" width={408} height={171} className="w-full h-auto" />
          </div>
        </div>
        <div className="col-span-12">
          <p className="xl:hidden text-sm leading-sm text-center">{wavelengthsData.description}</p>
        </div>
      </div>
    </div>
  );
};

export default Wavelengths;
