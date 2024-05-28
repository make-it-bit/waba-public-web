import React from 'react';
import Image from 'next/image';
import classNames from 'classnames';

// client because the higher order component is a client component
import { getImageFullUrl_client } from '@/lib/getImgFullUrl';

const Science = ({ background, scienceData }) => {
  return (
    <>
      <div className="grid grid-cols-12 lg:mt-152 mt-72 lg:pb-288 pb-64">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute w-full h-full object-cover mix-blend-luminosity inset-0 z-[-1]"
        >
          <source
            src={getImageFullUrl_client(scienceData.background_video.data)}
            type={scienceData.background_video.data.attributes.mime}
          />
        </video>
        <div className={classNames('absolute w-full h-full inset-0 z-[-2]', background)}></div>
        <div className="col-span-12">
          <h1 className="lg:hidden block font-rufina md:text-4xl text-3xl md:leading-4xl leading-3xl text-white-100 text-center mb-48">
            {scienceData.title}
          </h1>
        </div>
        <div className="lg:col-start-2 lg:col-span-4 col-span-12 text-white-100 lg:order-1 order-2">
          <div className="flex flex-col justify-center gap-32 h-full">
            <h1 className="lg:block hidden font-rufina md:text-4xl text-3xl md:leading-4xl leading-3xl">
              {scienceData.title}
            </h1>
            <p className="text-sm leading-sm lg:text-left text-center lg:mt-0 mt-48">{scienceData.description}</p>
          </div>
        </div>
        <div className="lg:col-start-6 lg:col-span-6 col-span-12 lg:order-2 order-1">
          <div className="flex justify-center items-center h-full">
            <Image
              src={getImageFullUrl_client(scienceData.image.data[0])}
              alt="photobiomodulation graph"
              width={635}
              height={396}
              quality={100}
              className="lg:block hidden"
            />
            <Image
              src={getImageFullUrl_client(scienceData.image.data[1])}
              alt="photobiomodulation graph"
              width={635}
              height={396}
              quality={100}
              className="lg:hidden block"
            />
          </div>
        </div>
        <div className="col-start-6 col-span-6"></div>
      </div>
    </>
  );
};

export default Science;
