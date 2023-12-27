import React from 'react';
import Image from 'next/image';
import classNames from 'classnames';

import styles from './_beam.module.scss';

const Beam = ({ beamData }) => {
  return (
    <>
      <div className={classNames('relative', styles.background)}>
        <div className="container">
          <div className="grid grid-cols-12">
            <div className="col-start-7 col-span-5">
              <div className="flex flex-col gap-32 text-right my-288">
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
          className="absolute top-0 left-[-320px] w-full h-full object-cover mix-blend-lighten"
        >
          <source src="/device-beam.mp4" type="video/mp4" />
        </video>
        {/* <Image
          src="/science-behind-device.png"
          alt="device"
          width={416}
          height={228}
          className="absolute bottom-0 left-184"
        /> */}
      </div>
    </>
  );
};

export default Beam;
