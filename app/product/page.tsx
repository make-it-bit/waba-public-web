import React from 'react';

import { getPageData, getComponentData } from '@/lib/strapi';
import { getProductById, createCheckout } from '@/lib/shopify';

import { MainInfo, ProductInfo, Warranty, ProductFAQ, LogoBar, CTABlock, Footer } from '@/page-components';

export const dynamic = 'force-static';

const Product = async () => {
  const productPageData = await getPageData('product');
  const ctaBlockData = await getComponentData('cta-block');
  const footerData = await getComponentData('footer');

  const data = await getProductById('gid://shopify/Product/8668620783962');
  const checkout = await createCheckout([
    {
      variantId: data.product.variants.edges[0].node.id,
      quantity: 1,
    },
  ]);

  return (
    <>
      <MainInfo mainInfoData={productPageData.attributes.hero} checkoutUrl={checkout.checkoutCreate.checkout.webUrl} />
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
