import React from 'react';

export const dynamic = 'force-static';

import { getProductById, createCheckout } from '../../lib/shopify';

import { MainInfo, ProductInfo, Warranty, ProductFAQ, LogoBar, CTABlock, Footer } from '../../page-components';

const Product = async () => {
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
      <Footer small />
    </>
  );
};

export default Product;
