import React from 'react';

import { getPageData, getComponentData } from '@/lib/strapi';

import { MainInfo, ProductInfo, Warranty, ProductFAQ, LogoBar, CTABlock, Footer } from '@/page-components';

export const dynamic = 'force-static';

export async function generateMetadata() {
  const productPageData = await getPageData('product');
  return {
    title: productPageData.attributes.seo?.title ?? '',
    description: productPageData.attributes.seo?.description ?? '',
    alternates: {
      canonical: '/product',
    },
    openGraph: {
      images: [
        `/api/og?title=${productPageData.attributes.seo?.title ?? ''}&desc=${
          productPageData.attributes.seo?.description ?? ''
        }` || null,
      ],
    },
  };
}

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
