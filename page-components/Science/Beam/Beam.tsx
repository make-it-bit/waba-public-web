import React from 'react';
import Image from 'next/image';
import classNames from 'classnames';

import styles from './_beam.module.scss';

const Beam = ({ beamData }) => {
  return (
    <div className={classNames('relative overflow-hidden', styles.background)}>
      <div className="container">
        <div className="grid grid-cols-12">
          <div className="col-span-12 md:col-start-7 md:col-span-5">
            <div className="flex flex-col gap-32 text-center md:text-right mb-288 mt-72 md:mt-288">
              <h1 className="font-rufina text-5xl leading-5xl text-white-100">{beamData.title}</h1>
              <p className="text-sm leading-sm text-supplementary-warm-gray">{beamData.description}</p>
            </div>
          </div>
        </div>
      </div>
      <video
        autoPlay
        muted
        loop
        className="absolute bottom-0 mix-blend-lighten h-[1080px] w-[1920px] max-w-[1920px] rotate-180 left-1/2 transform -translate-x-[960px]"
      >
        <source src="/device-beam.mp4" type="video/mp4" />
      </video>
      <Image
        src="/beam-device.png"
        alt="device"
        width={221}
        height={407}
        className="absolute bottom-[-120px] left-0 max-md:right-0 md:right-unset max-md:m-auto"
      />
    </div>
  );
};

export default Beam;
