import React from 'react';
import Image from 'next/image';
import classNames from 'classnames';

import BeamVideo from '../BeamVideo';

import styles from './_beam.module.scss';

const Beam = ({ beamData }) => {
  return (
    <div className={classNames('relative overflow-hidden', styles.background)}>
      <div className="container">
        <div className="grid grid-cols-12">
          <div className="col-span-12 md:col-start-7 md:col-span-5">
            <div className="relative flex flex-col gap-32 text-center md:text-right mb-288 mt-72 md:mt-288">
              <h1 className="font-rufina text-5xl leading-5xl text-white-100">{beamData.title}</h1>
              <p className="text-sm leading-sm text-supplementary-warm-gray">{beamData.description}</p>
            </div>
          </div>
        </div>
      </div>
      <BeamVideo />
      <Image
        src="/beam-device.png"
        alt="device"
        width={221}
        height={407}
        className="absolute bottom-[-121px] max-md:right-0 max-md:m-auto left-0 md:left-[90px] lg:left-[190px] xl:left-[290px] 2xl:left-[390px]"
      />
      <Image
        src="/beam-green-light.png"
        alt="device"
        width={243}
        height={45}
        className="absolute bottom-[80px] max-md:right-0 max-md:m-auto left-0 md:left-[80px] lg:left-[180px] xl:left-[280px] 2xl:left-[380px]"
      />
      <Image
        src="/beam-top-light.png"
        alt="device"
        width={303}
        height={123}
        className="absolute bottom-[150px] max-md:right-0 max-md:m-auto left-0 md:left-[50px] lg:left-[150px] xl:left-[250px] 2xl:left-[350px]"
      />
    </div>
  );
};

export default Beam;
