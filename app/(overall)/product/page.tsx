import React from 'react';

import { getPageData, getComponentData } from '@/lib/strapi';

import { MainInfo, ProductInfo, Warranty, ProductFAQ, LogoBar, CTABlock, Footer } from '@/page-components';

export const dynamic = 'force-static';

const Product = async () => {
  const productPageData = await getPageData('product');
  const ctaBlockData = await getComponentData('cta-block');
  const footerData = await getComponentData('footer');

  return (
    <>
      <MainInfo mainInfoData={productPageData.attributes.hero} />
      <ProductInfo productInfoData={productPageData.attributes.product_info} />
      <Warranty warrantyData={productPageData.attributes.warranty} />
      <ProductFAQ productFaqData={productPageData.attributes.faq} />
      <LogoBar />
      <CTABlock ctaBlockData={ctaBlockData.attributes} />
      <Footer footerData={footerData.attributes} small />
    </>
  );
};

export default Product;
