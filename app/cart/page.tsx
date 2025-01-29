import { getComponentData } from '@/lib/strapi';
import { CartContent, Footer } from '@/page-components';
import React from 'react';

const Cart = async () => {
  const footerData = await getComponentData('footer');

  return (
    <>
      <CartContent />
      <Footer footerData={footerData.attributes} small/>
    </>
  );
};

export default Cart;
