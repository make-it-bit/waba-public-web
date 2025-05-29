import { getComponentData, getPageData } from '@/lib/strapi';
import { CartContent, Footer } from '@/page-components';
import React from 'react';

const Cart = async () => {
  const productPageData = await getPageData('product');
  const footerData = await getComponentData('footer');

  return (
    <>
      <CartContent productData={productPageData.attributes.hero}/>
      <Footer footerData={footerData.attributes} small/>
    </>
  );
};

export default Cart;
