import React from 'react';
import Image from 'next/image';

const Origins = ({ originData }) => {
  return (
    <div className="relative bg-supplementary-warm-gray overflow-hidden">
      <div className="container">
        <div className="relative grid grid-cols-12 z-10">
          <div className="sm:col-start-4 col-start-1 sm:col-span-6 col-span-12">
            <div className="flex flex-col gap-32 text-center lg:px-48 sm:py-280 pt-96 pb-184">
              <h1 className="font-rufina text-5xl leading-5xl">{originData.title}</h1>
              <p className="text-base leading-base">{originData.description}</p>
            </div>
          </div>
        </div>
      </div>
      <Image
        src="/about-us-device-img-1.png"
        alt="device"
        width={1440}
        height={830}
        className="absolute bottom-0 left-1/2 !translate-x-neg-1/2"
      />
    </div>
  );
};

export default Origins;
