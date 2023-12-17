'use client';

import React, { useState } from 'react';

import { FaqShipping, LogoBar, CTABlock, PreFooterCard, Footer } from '../../page-components';

import { ProductPageNav } from '../../components';

const FAQ = () => {
  const navbarPages = [<FaqShipping key={0} />];
  const [pageIndex, setPageIndex] = useState(0);

  const handleClick = (index) => {
    setPageIndex(0);
  };

  return (
    <>
      <div className="bg-supplementary-warm-gray">
        <div className="container">
          <div className="grid grid-cols-12">
            <div className="sm:col-start-3 col-start-1 sm:col-span-8 col-span-12">
              <h1 className="font-rufina md:text-7xl text-5xl md:leading-7xl leading-5xl md:text-left text-center md:mt-176 mt-160 md:mb-72 mb-144">
                Questions Are Welcome
              </h1>
            </div>
            <div className="md:col-start-3 col-start-1 md:col-span-8 col-span-12">
              <ProductPageNav
                pageIndex={pageIndex}
                navbarItems={['Shipping', 'Returns & Refunds', 'Payments', 'Benefits', 'Device technical', 'Safety']}
                handleClick={handleClick}
                justify="justify-between"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="grid grid-cols-12">{navbarPages[pageIndex]}</div>
      </div>
      <LogoBar />
      <CTABlock />
      <PreFooterCard />
      <Footer />
    </>
  );
};

export default FAQ;
