import React from 'react';

export const dynamic = 'force-static';

import { MainInfo, ProductInfo, Warranty, ProductFAQ, LogoBar, CTABlock, Footer } from '../../page-components';

const Product = () => {
  return (
    <>
      <MainInfo />
      <ProductInfo />
      <Warranty />
      <ProductFAQ />
      <LogoBar />
      <CTABlock />
      <Footer small />
    </>
  );
};

export default Product;
