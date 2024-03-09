'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import classNames from 'classnames';

import { ScrollableNavbar } from '@/components';

import styles from './_faq.module.scss';

const FAQ = ({ faqPageData }) => {
  const categorizedElements = faqPageData.faq_elements.data.reduce((acc, element) => {
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
            scrollContainerRef.current.scrollLeft + scrollContainerRef.current.clientWidth + 1
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
    <>
      <div className="bg-supplementary-warm-gray">
        <div className="container">
          <div className="grid grid-cols-12">
            <div className="sm:col-start-3 col-start-1 sm:col-span-8 col-span-12">
              <h1 className="font-rufina md:text-7xl text-5xl md:leading-7xl leading-5xl md:text-left text-center md:mt-176 mt-160 md:mb-40 mb-144">
                {faqPageData.hero_title}
              </h1>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="bg-supplementary-warm-gray sticky lg:top-[137px] top-[97px]">
          <div className="container md:px-12 px-0">
            <div className="grid grid-cols-12">
              <div className="xl:static relative md:col-start-3 md:col-span-8 col-span-12">
                {gradientLeftIsVisible && (
                  <>
                    <div
                      className={classNames(
                        'absolute top-1/2 translate-y-neg-1/2 left-[-1px] h-[29px] w-80',

                        styles.gradientLeft
                      )}
                    ></div>
                    <div className="absolute top-1/2 translate-y-neg-1/2 left-[-1px] h-[29px] w-40">
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
                  justify="justify-between"
                />
                {gradientRightIsVisible && (
                  <>
                    <div
                      className={classNames(

                        'absolute top-1/2 translate-y-neg-1/2 right-[-1px] h-[29px] w-80',

                        styles.gradientRight
                      )}
                    ></div>
                    <div className="absolute top-1/2 translate-y-neg-1/2 right-[-1px] h-[29px] w-80">
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
            </div>
          </div>
        </div>
        <div className="grid grid-cols-12">
          <div className="md:col-start-3 col-start-1 md:col-span-8 col-span-12 md:mt-48 md:mb-40 mb-16">
            <div className="flex flex-col">
              {categorizedElements[navbarItems[pageIndex]].map((element, index) => (
                <div key={index} className="flex flex-col gap-16 border-b border-black-100 px-16 py-32">
                  <p className="text-base leading-base">{element.attributes.question}</p>
                  <p className="text-xs leading-xs">{element.attributes.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FAQ;
