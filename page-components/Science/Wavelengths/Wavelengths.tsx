import React from 'react';
import Image from 'next/image';
import classNames from 'classnames';

import styles from './_wavelenghts.module.scss';

const Wavelengths = ({ wavelengthsData }) => {
  return (
    <div className="container overflow-hidden">
      <div className="grid grid-cols-12 items-center my-272">
        <div className="col-start-2 col-span-5">
          <div className="flex flex-col gap-32">
            <h1 className="font-rufina text-5xl leading-5xl">{wavelengthsData.title}</h1>
            <p className="text-sm leading-sm">{wavelengthsData.description}</p>
          </div>
        </div>
        <div className="col-start-8 col-span-5">
          <div className="relative h-[219px]">
            <Image
              src="/wavelength-blue.svg"
              alt="wavelength"
              width={408}
              height={171}
              className={classNames('absolute bottom-0 left-1/2 translate-x-neg-1/2', styles.blueWave)}
            />
            <Image
              src="/wavelength-orange.svg"
              alt="wavelength"
              width={403}
              height={171}
              className="absolute bottom-0 left-1/2 translate-x-neg-1/2"
            />
            <Image
              src="/wavelength-pink.svg"
              alt="wavelength"
              width={408}
              height={171}
              className={classNames('absolute bottom-0 left-1/2 translate-x-neg-1/2', styles.redWave)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wavelengths;
