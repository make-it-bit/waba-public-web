import React from 'react';
import Image from 'next/image';

import { Tag } from '@/components';

import { Checkout } from '@/page-components';

import { getImageFullUrl_server } from '@/lib/getImgFullUrl';

const MainInfo = ({ mainInfoData }) => {
  const hasImages = mainInfoData.images.length > 0;

  return (
    <div className="container lg:mt-64 mt-24 lg:mb-72 mb-64">
      <div className="grid grid-cols-12 lg:gap-y-24 gap-y-32">
        {/* mobile images */}
        <div className="lg:hidden block col-span-12">
          <div className="flex gap-24 overflow-x-auto">
            {hasImages &&
              mainInfoData.images.map((imageData, index) => (
                <div key={index} className="relative min-w-[260px] h-[260px]">
                  <Image
                    src={getImageFullUrl_server(imageData.image.data)}
                    fill
                    className={`absolute w-full h-full object-${imageData.object_fit}`}
                    alt="product main info image"
                  />
                </div>
              ))}
          </div>
        </div>

        {/* desktop first image */}
        {hasImages && (
          <div className="lg:block hidden col-start-1 col-span-5">
            <div className="relative w-full h-full min-h-[526px]">
              <Image
                src={getImageFullUrl_server(mainInfoData?.images?.[0].image?.data)}
                fill
                className={`absolute w-full h-full object-${mainInfoData?.images?.[0].object_fit}`}
                alt="device"
              />
              <div className="absolute bg-[#f3ecee] w-full h-full top-0 left-0 z-[-1]"></div>
            </div>
          </div>
        )}

        <div className="lg:col-start-7 lg:col-span-5 col-span-12 sticky top-[201px]">
          <div className="flex flex-col">
            <div className="flex flex-wrap gap-8 lg:mb-48 mb-32">
              {mainInfoData.tags.data.map((tag, index) => (
                <Tag
                  key={index}
                  text={tag.attributes.text}
                  svg={tag.attributes.logo.data && getImageFullUrl_server(tag.attributes.logo.data)}
                />
              ))}
            </div>
            <h1 className="font-rufina text-4xl leading-4xl">{mainInfoData.title}</h1>
            <h2 className="text-2xl leading-2xl lg:my-8 my-16">{mainInfoData.price}</h2>
            <p className="text-sm leading-sm lg:mt-32 mt-16 lg:mb-40 mb-32">{mainInfoData.description}</p>
            <Checkout mainInfoData={mainInfoData} />
          </div>
        </div>

        <div className="lg:block hidden col-start-1 col-span-5">
          <div className="grid grid-cols-5 grid-flow-row gap-24">
            <div className="col-start-1 col-span-3 row-span-2">
              <div className="relative w-full h-full min-h-[416px]">
                {hasImages && (
                  <Image
                    src={getImageFullUrl_server(mainInfoData?.images[1].image.data)}
                    fill
                    className={`absolute w-full h-full object-${mainInfoData?.images?.[1].object_fit}`}
                    alt="product main info image"
                  />
                )}
              </div>
            </div>
            <div className="col-start-4 col-span-2">
              <div className="relative w-full h-full min-h-[196px]">
                {hasImages && (
                  <Image
                    src={getImageFullUrl_server(mainInfoData.images[2].image.data)}
                    fill
                    className={`absolute w-full h-full object-${mainInfoData?.images?.[2].object_fit}`}
                    alt="product main info image"
                  />
                )}
              </div>
            </div>
            <div className="col-start-4 col-span-2">
              <div className="relative w-full h-full min-h-[196px]">
                {hasImages && (
                  <Image
                    src={getImageFullUrl_server(mainInfoData.images[3].image.data)}
                    fill
                    className={`absolute w-full h-full object-${mainInfoData?.images?.[3].object_fit}`}
                    alt="product main info image"
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="lg:block hidden col-start-1 col-span-5">
          <div className="relative w-full h-full min-h-[217px]">
            {hasImages && (
              <Image
                src={getImageFullUrl_server(mainInfoData.images[4].image.data)}
                fill
                className={`absolute w-full h-full object-${mainInfoData?.images?.[4].object_fit}`}
                alt="device"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainInfo;
