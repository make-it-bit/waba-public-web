'use client';

import React, { useState, useEffect, useRef } from 'react';
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

  const gradients = [styles.gradient0, styles.gradient1, styles.gradient2, styles.gradient3, styles.gradient4];
  const scrollContainerRef = useRef<any>(null);
  const [gradientIsVisible, setGradientIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        if (scrollContainerRef.current.scrollLeft > 0) {
          setGradientIsVisible(false);
        } else {
          setGradientIsVisible(true);
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
          <div className="xl:static relative md:col-start-3 md:col-span-8 col-span-12">
            <ScrollableNavbar
              scrollableNavbarRef={scrollContainerRef}
              pageIndex={pageIndex}
              navbarItems={navbarItems}
              handleClick={setPageIndex}
              justify="justify-between"
            />
            {gradientIsVisible && (
              <div
                className={classNames(
                  'absolute top-1/2 translate-y-neg-1/2 right-[-1px] h-[28px] w-40',
                  gradients[pageIndex]
                )}
              ></div>
            )}
          </div>
        </div>
        {navbarPages[pageIndex]}
      </div>
    </div>
  );
};

export default ProductInfo;
