import React from 'react';
import classNames from 'classnames';

import styles from './_sustainability.module.scss';

const Sustainability = ({ sustainabilityData }) => {
  return (
    <div className="relative overflow-hidden">
      <video autoPlay muted loop className="absolute top-0 left-0 w-full h-full object-cover z-[-1]">
        <source src="/about-us-sustainability-video.mp4" type="video/mp4" />
      </video>
      <div className={classNames('absolute top-0 left-0 w-full h-full z-[-1]', styles.background)}></div>
      <div className="container">
        <div className="grid grid-cols-12">
          <div className="sm:col-start-4 col-start-1 sm:col-span-6 col-span-12 text-center sm:my-272 my-112">
            <div className="flex flex-col gap-32 text-white-100">
              <h1 className="font-rufina sm:text-5xl text-3xl sm:leading-5xl leading-3xl">
                {sustainabilityData.title}
              </h1>
              <p className="text-sm leading-sm">{sustainabilityData.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sustainability;
