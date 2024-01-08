import React from 'react';
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
    </div>
  );
};

export default Beam;
