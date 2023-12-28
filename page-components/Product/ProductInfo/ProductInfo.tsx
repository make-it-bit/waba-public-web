'use client';

import React, { useState } from 'react';
import classNames from 'classnames';

import Features from './Features/Features';
import Science from './Science/Science';
import Included from './Included/Included';
import Results from './Results/Results';
import Specifications from './Specifications/Specifications';

import { ScrollableNavbar } from '../../../components';

import styles from './_productInfo.module.scss';

const ProductInfo = ({ productInfoData }) => {
  //console.log('productInfoData: ', productInfoData);
  const backgrounds = [
    styles.background0,
    styles.background1,
    styles.background2,
    styles.background3,
    styles.background4,
  ];
  const navbarPages = [
    <Features key={0} featuresData={productInfoData.feature_cards} />,
    <Science key={1} background={styles.background1} scienceData={productInfoData.photobiomodulation} />,
    <Included key={2} />,
    <Results key={3} />,
    <Specifications key={4} />,
  ];
  const [pageIndex, setPageIndex] = useState(0);

  const handleClick = (index) => {
    setPageIndex(index);
  };

  return (
    <div className={classNames('relative', backgrounds[pageIndex])}>
      <div className="container">
        <div className="grid grid-cols-12">
          <div className="lg:col-start-3 lg:col-span-8 col-span-12">
            <ScrollableNavbar
              pageIndex={pageIndex}
              navbarItems={['Features', 'The Science Behind', 'What’s included', 'Results', 'Technical specifications']}
              handleClick={handleClick}
              justify="justify-between"
            />
          </div>
        </div>
        {navbarPages[pageIndex]}
      </div>
    </div>
  );
};

export default ProductInfo;
