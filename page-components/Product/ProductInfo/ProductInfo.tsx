'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import classNames from 'classnames';

import Features from './Features/Features';
import Included from './Included/Included';
import Science from './Science/Science';
import Specifications from './Specifications/Specifications';
import { ScrollableNavbar } from '@/components';

import styles from './_productInfo.module.scss';
import Compare from '@/page-components/Index/Compare';
import ProductFAQ from '../ProductFAQ';

const ProductInfo = ({ productInfoData, compareSection, faqData }) => {
  const backgrounds = [
    styles.backgroundBeige,
    styles.background3,
    styles.backgroundBeige,
    styles.backgroundBeige,
    styles.backgroundBeige,
    styles.backgroundBeige,
  ];
  const navbarItems = ['User stories', 'The Science Behind', 'Features', 'Technical specifications', 'What’s included', 'FAQ'];
  const navbarPages = [
    <Compare isTab={true} key={0} compareData={{title: productInfoData.compare_title}} compareSection={compareSection} />,
    <Science key={1} background={styles.background1} scienceData={productInfoData.photobiomodulation} />,
    <Features key={2} featuresData={productInfoData.feature_cards} />,
    <Specifications
      key={3}
      title={productInfoData.specifications_title}
      specificationsData={productInfoData.specifications}
    />,
    <Included
      key={4}
      title={productInfoData.included_title}
      includedData={productInfoData.included}
      includedImage={productInfoData.included_image}
    />,
    <ProductFAQ key={5} productFaqData={faqData} />
  ];
  const [pageIndex, setPageIndex] = useState(0);

  const gradientsLeft = [
    styles.gradientLeft0,
    styles.gradientLeft3,
    styles.gradientLeft2,
    styles.gradientLeft2,
    styles.gradientLeft4,
  ];
  const gradientsRight = [
    styles.gradientRight0,
    styles.gradientRight3,
    styles.gradientRight2,
    styles.gradientRight2,
    styles.gradientRight4,
  ];
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
    <div className={classNames('relative', backgrounds[pageIndex])}>
      <div className="container">
        <div className="grid grid-cols-12">
          <div className="xl:static relative col-span-12">
            <ScrollableNavbar
              scrollableNavbarRef={scrollContainerRef}
              pageIndex={pageIndex}
              navbarItems={navbarItems}
              handleClick={setPageIndex}
              justify="justify-between"
            />
            {gradientLeftIsVisible && (
              <div className="z-10">
                <div
                  className={classNames(
                    'absolute top-1/2 translate-y-neg-1/2 left-0 h-[29px] w-40',
                    gradientsLeft[pageIndex]
                  )}
                />
                <div className="absolute top-1/2 translate-y-neg-1/2 left-0 h-[29px] w-40">
                  <Image
                    src="/icons/arrow-white-left.svg"
                    alt="arrow left"
                    width={8}
                    height={8}
                    quality={100}
                    className="absolute top-1/2 translate-y-neg-1/2 left-1/2 translate-x-neg-1/2 animate-scale"
                  />
                </div>
              </div>
            )}
            {gradientRightIsVisible && (
              <div className="z-10">
                <div
                  className={classNames(
                    'absolute top-1/2 translate-y-neg-1/2 right-[-1px] h-[29px] w-80',
                    gradientsRight[pageIndex]
                  )}
                />
                <div className="absolute top-1/2 translate-y-neg-1/2 right-[-1px] h-[29px] w-80">
                  <Image
                    src="/icons/arrow-white-right.svg"
                    alt="arrow right"
                    width={8}
                    height={8}
                    quality={100}
                    className="absolute top-1/2 translate-y-neg-1/2 left-1/2 translate-x-neg-1/2 animate-scale"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
        {navbarPages[pageIndex]}
      </div>
    </div>
  );
};

export default ProductInfo;
