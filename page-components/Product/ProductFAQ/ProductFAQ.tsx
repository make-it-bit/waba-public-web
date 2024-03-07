'use client';

import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';

import { ScrollableNavbar } from '@/components';

import styles from './_productFAQ.module.scss';

const ProductFAQ = ({ productFaqData }) => {
  const categorizedElements = productFaqData.faq_elements.data.reduce((acc, element) => {
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
    <div className={classNames('relative', styles.background)}>
      <div className="container md:pt-160 pt-72">
        <div className="grid grid-cols-12">
          <div className="lg:col-start-3 lg:col-span-8 col-span-12">
            <h1 className="font-rufina md:text-4xl text-3xl md:leading-4xl leading-3xl text-center">
              {productFaqData.title}
            </h1>
            <div className="relative">
              {gradientLeftIsVisible && (
                <div
                  className={classNames(
                    'absolute top-1/2 translate-y-neg-1/2 left-0 h-[28px] w-40',
                    styles.gradientLeft
                  )}
                ></div>
              )}
              <ScrollableNavbar
                scrollableNavbarRef={scrollContainerRef}
                pageIndex={pageIndex}
                navbarItems={navbarItems}
                handleClick={setPageIndex}
                justify="justify-between"
              />
              {gradientRightIsVisible && (
                <div
                  className={classNames(
                    'absolute top-1/2 translate-y-neg-1/2 right-[-1px] h-[28px] w-40',
                    styles.gradientRight
                  )}
                ></div>
              )}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-12 md:mt-64 mt-8 md:pb-160 pb-64">
          <div className="grid md:col-start-3 md:col-span-8 col-span-12 gap-y-16">
            {categorizedElements[navbarItems[pageIndex]].map((element, index) => (
              <div key={index} className="flex flex-col gap-16 bg-white-100 p-32">
                <p className="text-base leading-base">{element.attributes.question}</p>
                <p className="text-xs leading-xs">{element.attributes.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductFAQ;
