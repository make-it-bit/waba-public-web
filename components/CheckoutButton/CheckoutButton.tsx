'use client';

import React from 'react';

import { Button } from '@/gui-components/client';

import styles from './_checkoutButton.module.scss';

const CheckoutButton = ({
  CTA,
  style = 'primary',
  quantity,
  setInitCheckoutError,
}: {
  CTA: string;
  style?: 'primary' | 'tertiary';
  quantity: number;
  setInitCheckoutError: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const initCheckout = async () => {
    try {
      const response = await fetch(`/api/shopify/checkout?quantity=${quantity}`);
      if (!response.ok) return setInitCheckoutError('Network response was not ok.');
      const { data } = await response.json();
      window.location.href = data.URL;
    } catch (error) {
      console.log('error: ', error);
      setInitCheckoutError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className={styles.checkoutButtonWrapper}>
      <Button onClick={initCheckout} CTA={CTA} style={style} svg />
    </div>
  );
};

export default CheckoutButton;
