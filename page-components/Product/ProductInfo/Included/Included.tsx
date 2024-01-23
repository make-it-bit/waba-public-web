import React from 'react';
import Image from 'next/image';

import { getImageFullUrl_client } from '@/lib/getImgFullUrl';

const Included = ({ title, includedData, includedImage }) => {
  return (
    <div className="grid grid-cols-12 mt-40 lg:pb-112 pb-64">
      <div className="lg:col-start-2 lg:col-span-4 col-span-12">
        <h1 className="font-rufina text-4xl leading-4xl mb-48 lg:text-left text-center">{title}</h1>
        {includedData.map((item, index) => {
          return (
            <div key={index} className="flex flex-col border-b border-black-100 px-16 py-24">
              <p className="text-base leading-base">{item.title}</p>
              <div>
                {item.items.split('/n').map((subitem, index) => {
                  return (
                    <p key={index} className="text-xs leading-xs">
                      {subitem}
                    </p>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      <div className="lg:col-start-7 lg:col-span-5 col-span-12 lg:mt-0 mt-48">
        <div className="relative w-auto lg:h-full h-400">
          <Image
            src={getImageFullUrl_client(includedImage.data)}
            alt="inlcuded image"
            fill
            className="lg:absolute object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default Included;
