import React from 'react';

import { getComponentData } from '../../lib/strapi';
import { getProductById, createCheckout } from '../../lib/shopify';

export const dynamic = 'force-static';

import { MainInfo, ProductInfo, Warranty, ProductFAQ, LogoBar, CTABlock, Footer } from '../../page-components';

const Product = async () => {
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
      <MainInfo />
      <ProductInfo />
      <Warranty />
      <ProductFAQ />
      <LogoBar />
      <CTABlock />
      <Footer footerData={footerData.attributes} small />
    </>
  );
};

export default Product;
