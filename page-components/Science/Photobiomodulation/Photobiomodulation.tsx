import React from 'react';
import Image from 'next/image';

import { getImageFullUrl } from '@/lib/getImgFullUrl';

const Photobiomodulation = ({ photobiomodulationData }) => {
  return (
    <div className="bg-supplementary-warm-gray">
      <div className="container">
        <div className="grid grid-cols-12 lg:py-272 pt-72 pb-48">
          <div className="col-span-12">
            <h1 className="lg:hidden block font-rufina md:text-4xl text-3xl md:leading-4xl leading-3xl text-center mb-48">
              {photobiomodulationData.title}
            </h1>
          </div>
          <div className="lg:col-start-2 lg:col-span-4 col-span-12 lg:order-1 order-2">
            <div className="flex flex-col justify-center gap-32 h-full">
              <h1 className="lg:block hidden font-rufina md:text-4xl text-3xl md:leading-4xl leading-3xl">
                {photobiomodulationData.title}
              </h1>
              <p className="text-sm leading-sm lg:text-left text-center lg:mt-0 mt-48">
                {photobiomodulationData.description}
              </p>
            </div>
          </div>
          <div className="lg:col-start-6 lg:col-span-6 col-span-12 lg:order-2 order-1">
            <div className="flex justify-center items-center h-full">
              <Image
                src={getImageFullUrl(photobiomodulationData.image.data[0])}
                alt="photobiomodulation graph"
                width={635}
                height={396}
                className="lg:block hidden"
              />
              <Image
                src={getImageFullUrl(photobiomodulationData.image.data[1])}
                alt="photobiomodulation graph"
                width={635}
                height={396}
                className="lg:hidden block"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Photobiomodulation;
