'use client';

import React, { useState } from 'react';
import classNames from 'classnames';

import Shipping from './Shipping/Shipping';

import { ScrollableNavbar } from '../../../components';

import styles from './_productFAQ.module.scss';

const ProductFAQ = () => {
  const backgrounds = [styles.background0];
  const navbarPages = [<Shipping key={0} />];
  const [pageIndex, setPageIndex] = useState(0);

  const handleClick = (index) => {
    setPageIndex(0);
  };

  return (
    <div className={classNames('relative', backgrounds[pageIndex])}>
      <div className="container pt-160">
        <div className="grid grid-cols-12">
          <div className="col-start-3 col-span-8">
            <h1 className="font-rufina text-4xl leading-4xl text-center">Questions Are Welcome</h1>
            <ScrollableNavbar
              pageIndex={pageIndex}
              navbarItems={['Shipping', 'Returns & Refunds', 'Payments', 'Benefits', 'Device technical', 'Safety']}
              handleClick={handleClick}
              justify="justify-evenly"
            />
          </div>
        </div>
        {navbarPages[pageIndex]}
      </div>
    </div>
  );
};

export default ProductFAQ;
