'use client';

import React from 'react';
import { useLogger } from 'next-axiom';

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
  const log = useLogger();

  const initCheckout = async () => {
    try {
      log.info('Checkout process started (button clicked).', { quantity: quantity ? quantity : null });
      const response = await fetch(`/api/shopify/checkout?quantity=${quantity}`);
      if (!response.ok) {
        log.error('Checkout process failed. Network response was not ok.', { response: response });

        return setInitCheckoutError(`Currently only e-mail based checkout is available.`);
      }
      const { data } = await response.json();
      window.location.href = data.URL;
      log.info('Checkout process in progress. Redirecting to checkout page.', { data: data });
    } catch (error) {
      console.log('error: ', error);
      log.error('Checkout process failed. Something went wrong.', { error: error });
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
