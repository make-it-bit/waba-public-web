'use client';

import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';

import { ScrollableNavbar } from '@/components';

const FAQ = ({ faqPageData }) => {
  const categorizedElements = faqPageData.faq_elements.data.reduce((acc, element) => {
    const category = element.attributes.category;
    acc[category] = acc[category] ? [...acc[category], element] : [element];
    return acc;
  }, {});
  const navbarItems = Object.keys(categorizedElements);
  const [pageIndex, setPageIndex] = useState(0);
  const [isSticky, setIsSticky] = useState(false);
  const faqContainerRef = useRef(null);

  const handleClick = (pageIndex) => {
    setPageIndex(pageIndex);
  };

  /* useEffect(() => {
    const handleScroll = () => {
      if (faqContainerRef.current) {
        const height = faqContainerRef.current.clientHeight;
        //console.log('window.scrollY: ', window.scrollY);
        //console.log('height: ', height);
        if (window.scrollY > height) {
          setIsSticky(false);
        } else {
          setIsSticky(true);
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); */

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
      <div className="border border-white-100"></div>
      <div className={classNames('bg-supplementary-warm-gray', isSticky && 'sticky top-[137px] z-[100]')}>
        <div className="container">
          <div className="grid grid-cols-12">
            <div className="lg:col-start-3 lg:col-span-8 col-span-12">
              <ScrollableNavbar
                pageIndex={pageIndex}
                navbarItems={navbarItems}
                handleClick={handleClick}
                justify="justify-between"
              />
            </div>
          </div>
        </div>
      </div>
      <div ref={faqContainerRef} className="container">
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
