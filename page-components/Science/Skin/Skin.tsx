'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import classNames from 'classnames';

import { getImageFullUrl_client } from '@/lib/getImgFullUrl';

import { ScrollableNavbar } from '@/components';

import styles from './_skin.module.scss';

const Skin = ({ skinData }) => {
  const categorizedElements = skinData.reduce((acc, element) => {
    const category = element.attributes.category;
    acc[category] = acc[category] ? [...acc[category], element] : [element];
    return acc;
  }, {});
  const navbarItems = Object.keys(categorizedElements);
  const [pageIndex, setPageIndex] = useState(0);

  const scrollContainerRef = useRef<any>(null);
  const [windowWidth, setWindowWidth] = useState(0);
  const [gradientLeftIsVisible, setGradientLeftIsVisible] = useState(false);
  const [gradientRightIsVisible, setGradientRightIsVisible] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setGradientRightIsVisible(scrollContainerRef.current.scrollWidth > scrollContainerRef.current.clientWidth);
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [windowWidth]);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current.scrollLeft === 0) {
        setGradientLeftIsVisible(false);
      } else {
        setGradientLeftIsVisible(true);
      }

      if (scrollContainerRef.current) {
        if (
          scrollContainerRef.current.scrollLeft > 0 &&
          scrollContainerRef.current.scrollWidth <=
            scrollContainerRef.current.scrollLeft + scrollContainerRef.current.clientWidth + 0.5
        ) {
          setGradientRightIsVisible(false);
        } else {
          setGradientRightIsVisible(true);
        }
      }
    };

    if (scrollContainerRef.current) {
      scrollContainerRef.current.addEventListener('scroll', handleScroll, { passive: true });
    }
    return () => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return (
    <div className="container">
      <div className="relative">
        {gradientLeftIsVisible && (
          <>
            <div
              className={classNames('absolute top-1/2 translate-y-neg-1/2 left-0 h-[29px] w-40', styles.gradientLeft)}
            ></div>
            <div className="absolute top-1/2 translate-y-neg-1/2 left-0 h-[29px] w-40">
              <Image
                src="/icons/arrow-left.svg"
                alt="arrow left"
                width={8}
                height={8}
                className="absolute top-1/2 translate-y-neg-1/2 left-1/2 translate-x-neg-1/2 animate-scale"
              />
            </div>
          </>
        )}
        <ScrollableNavbar
          scrollableNavbarRef={scrollContainerRef}
          pageIndex={pageIndex}
          navbarItems={navbarItems}
          handleClick={setPageIndex}
          justify="md:justify-evenly justify-between"
        />
        {gradientRightIsVisible && (
          <>
            <div
              className={classNames(
                'absolute top-1/2 translate-y-neg-1/2 right-[-1px] h-[29px] w-40',
                styles.gradientRight
              )}
            ></div>
            <div className="absolute top-1/2 translate-y-neg-1/2 right-[-1px] h-[29px] w-40">
              <Image
                src="/icons/arrow-right.svg"
                alt="arrow right"
                width={8}
                height={8}
                className="absolute top-1/2 translate-y-neg-1/2 left-1/2 translate-x-neg-1/2 animate-scale"
              />
            </div>
          </>
        )}
      </div>
      {categorizedElements[navbarItems[pageIndex]].map((element, index) => (
        <div key={index} className="grid grid-cols-12 items-center md:mt-80 mt-8 md:mb-176 mb-80">
          <div className="xl:col-start-3 xl:col-span-4 lg:col-start-2 lg:col-span-5 md:col-span-6 col-span-12 md:order-1 order-2">
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
          <div className="xl:col-start-8 xl:col-span-3 lg:col-start-8 lg:col-span-4 md:col-start-8 md:col-span-5 col-span-12 md:order-2 order-1">
            <div className="relative w-full md:h-400 h-[352px]">
              <Image
                src={getImageFullUrl_client(element.attributes.image.data)}
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
