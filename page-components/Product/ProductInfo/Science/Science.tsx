import React from 'react';
import classNames from 'classnames';
import Image from 'next/image';

const Science = ({ background, scienceData }) => {
  return (
    <>
      <div className="grid grid-cols-12 lg:mt-152 mt-72 lg:pb-288 pb-64">
        <video autoPlay muted loop className="absolute w-full h-full object-cover mix-blend-luminosity inset-0 z-[-1]">
          <source src="/chest-video.mp4" type="video/mp4" />
        </video>
        <div className={classNames('absolute w-full h-full inset-0 z-[-1]', background)}></div>
        <div className="lg:col-start-2 lg:col-span-4 col-span-12 text-white-100 lg:text-left text-center">
          <h1 className="font-rufina text-4xl leading-4xl mb-32">{scienceData.title}</h1>
          <p className="text-sm leading-sm">{scienceData.description}</p>
        </div>
        <div className="col-start-6 col-span-6"></div>
      </div>
    </>
  );
};

export default Science;
