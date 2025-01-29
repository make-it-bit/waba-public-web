'use client';

import React, { useState, useEffect, useRef } from 'react';

import { ScrollableNavbar } from '@/components';


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
    <div>
      <div className="container pt-[50px]">
        <div className="grid grid-cols-12">
          <div className="lg:col-start-3 lg:col-span-8 col-span-12">
            <div className="relative">
              <ScrollableNavbar
                scrollableNavbarRef={scrollContainerRef}
                pageIndex={pageIndex}
                navbarItems={navbarItems}
                handleClick={setPageIndex}
                justify="justify-between"
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-12 md:mt-64 mt-8 md:pb-160 pb-64">
          <div className="grid md:col-start-3 md:col-span-8 col-span-12 gap-y-16">
            {categorizedElements[navbarItems[pageIndex]].map((element, index) => (
              <div key={index} className="flex flex-col gap-16 border-b border-black-100 p-32">
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
