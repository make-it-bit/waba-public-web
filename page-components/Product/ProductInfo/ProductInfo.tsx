'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import classNames from 'classnames';

import Features from './Features/Features';
import UserStories from './UserStories/UserStories';
import Included from './Included/Included';
import Science from './Science/Science';
import Specifications from './Specifications/Specifications';
import { ScrollableNavbar } from '@/components';

import styles from './_productInfo.module.scss';

const ProductInfo = ({ productInfoData }) => {
  const backgrounds = [
    styles.background0,
    styles.background1,
    styles.background2,
    styles.background3,
    styles.background4,
  ];
  const navbarItems = ['Features', 'User stories', 'What’s included', 'The Science Behind', 'Technical specifications'];
  const navbarPages = [
    <Features key={0} featuresData={productInfoData.feature_cards} />,
    <UserStories key={1} title={productInfoData.user_stories_title} userStoriesData={productInfoData.stories} />,
    <Included
      key={2}
      title={productInfoData.included_title}
      includedData={productInfoData.included}
      includedImage={productInfoData.included_image}
    />,
    <Science key={3} background={styles.background1} scienceData={productInfoData.photobiomodulation} />,
    <Specifications
      key={4}
      title={productInfoData.specifications_title}
      specificationsData={productInfoData.specifications}
    />,
  ];
  const [pageIndex, setPageIndex] = useState(0);

  const gradientsLeft = [
    styles.gradientLeft0,
    styles.gradientLeft1,
    styles.gradientLeft2,
    styles.gradientLeft3,
    styles.gradientLeft4,
  ];
  const gradientsRight = [
    styles.gradientRight0,
    styles.gradientRight1,
    styles.gradientRight2,
    styles.gradientRight3,
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
            {gradientLeftIsVisible && (
              <>
                <div
                  className={classNames(
                    'absolute top-1/2 translate-y-neg-1/2 left-0 h-[29px] w-40',
                    gradientsLeft[pageIndex]
                  )}
                ></div>
                <div className="absolute top-1/2 translate-y-neg-1/2 left-0 h-[29px] w-40">
                  <Image
                    src="/icons/arrow-white-left.svg"
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
                    gradientsRight[pageIndex]
                  )}
                ></div>
                <div className="absolute top-1/2 translate-y-neg-1/2 right-[-1px] h-[29px] w-80">
                  <Image
                    src="/icons/arrow-white-right.svg"
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
        {navbarPages[pageIndex]}
      </div>
    </div>
  );
};

export default ProductInfo;
