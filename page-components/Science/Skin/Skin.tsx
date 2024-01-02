'use client';

import React, { useState } from 'react';
import Image from 'next/image';

import { getImageFullUrl } from '@/lib/strapi';

import { ScrollableNavbar } from '@/components';

const Skin = ({ skinData }) => {
  const categorizedElements = skinData.reduce((acc, element) => {
    const category = element.attributes.category;
    acc[category] = acc[category] ? [...acc[category], element] : [element];
    return acc;
  }, {});
  const navbarItems = Object.keys(categorizedElements);
  const [pageIndex, setPageIndex] = useState(0);

  const handleClick = (pageIndex) => {
    setPageIndex(pageIndex);
  };

  return (
    <div className="container">
      <ScrollableNavbar
        pageIndex={pageIndex}
        navbarItems={navbarItems}
        handleClick={handleClick}
        justify="md:justify-evenly justify-between"
      />
      {categorizedElements[navbarItems[pageIndex]].map((element, index) => (
        <div key={index} className="grid grid-cols-12 items-center my-80">
          <div className="md:col-start-2 md:col-span-5 col-span-12 md:order-1 order-2">
            <div className="flex flex-col justify-center gap-48">
              <h1 className="font-rufina text-5xl leading-5xl md:mt-0 mt-56">{element.attributes.title}</h1>
              <div className="flex flex-col gap-40">
                <div className="flex flex-col gap-16">
                  {pageIndex === 0
                    ? element.attributes.description.split('\n').map((description, index) =>
                        index % 2 === 0 ? (
                          <p key={index} className="font-rufina text-2xl leading-2xl">
                            {description}
                          </p>
                        ) : (
                          <React.Fragment key={index}>
                            <p className="text-sm leading-sm">{description}</p>
                            {index !== element.attributes.description.split('\n').length - 1 && (
                              <div className="border border-black-100 my-8"></div>
                            )}
                          </React.Fragment>
                        )
                      )
                    : element.attributes.description.split('\n').map((description, index) => (
                        <p key={index} className="text-sm leading-sm">
                          {description}
                        </p>
                      ))}
                </div>
              </div>
            </div>
          </div>
          <div className="md:col-start-8 md:col-span-5 col-span-12 md:order-2 order-1">
            <div className="relative w-full md:h-[554px] h-[352px]">
              <Image
                src={getImageFullUrl(element.attributes.image.data)}
                alt="ageing image"
                fill
                className="absolute object-cover"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Skin;
