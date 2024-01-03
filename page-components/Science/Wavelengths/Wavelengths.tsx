'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import classNames from 'classnames';

import styles from './_wavelenghts.module.scss';

const Wavelengths = ({ wavelengthsData }) => {
  const pinkWave = useRef(null);

  // determine whether pinkWave is in viewport when scrolling in useEffect. if is in viewport, console log
  useEffect(() => {
    const handleScroll = () => {
      const pinkWavePosition = pinkWave.current.getBoundingClientRect();
      const pinkWaveTop = pinkWavePosition.top;
      const pinkWaveBottom = pinkWavePosition.bottom;
      const isPinkWaveVisible = pinkWaveTop >= 0 && pinkWaveBottom <= window.innerHeight;
      if (isPinkWaveVisible) {
        // change transform of pinkWave by 40px to the left based on scroll
        const scrollPosition = window.scrollY;
        const pinkWaveTransform = `translateX(-${scrollPosition / 40}px)`;
        pinkWave.current.style.transform = pinkWaveTransform;
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="container overflow-hidden">
      <div className="grid grid-cols-12 items-center my-272">
        <div className="col-span-12 xl:col-start-2 xl:col-span-5">
          <div className="flex flex-col gap-32">
            <h1 className="font-rufina text-5xl leading-5xl">{wavelengthsData.title}</h1>
            <p className="text-sm leading-sm">{wavelengthsData.description}</p>
          </div>
        </div>
        <div className="col-span-12 xl:col-start-8 xl:col-span-5">
          <div className={classNames('absolute', styles.wavelengthImageWrapper)}>
            <div className="relative">
              <Image
                src="/wavelength-blue.svg"
                alt="wavelength"
                width={408}
                height={171}
                style={{
                  width: '100%',
                  height: 'auto',
                }}
                // className={classNames('absolute bottom-0 left-1/2 translate-x-neg-1/2', styles.blueWave)}
              />
            </div>
          </div>
          <div className={classNames('absolute', styles.wavelengthImageWrapper)}>
            <div className="relative">
              <Image
                src="/wavelength-orange.svg"
                alt="wavelength"
                width={403}
                height={171}
                style={{
                  width: '100%',
                  height: 'auto',
                }}
                // className="absolute bottom-0 left-1/2 translate-x-neg-1/2"
              />
            </div>
          </div>
          <div
            ref={pinkWave}
            className={classNames('absolute', styles.wavelengthImageWrapper)}
            style={{ left: '20px' }}
          >
            <div className="relative">
              <Image
                src="/wavelength-pink.svg"
                alt="wavelength"
                width={408}
                height={171}
                style={{
                  width: '100%',
                  height: 'auto',
                }}
                // className={classNames('absolute bottom-0 left-1/2 translate-x-neg-1/2', styles.redWave)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wavelengths;
