'use client';

import React from 'react';
import { useLogger } from 'next-axiom';

import { paymentFormValidation } from '@/utils/formValidation';

import { Button } from '@/gui-components/client';

import styles from './_checkoutButton.module.scss';

const CheckoutButton = ({
  CTA,
  style = 'primary',
  paymentForm,
  setInputErrors,
  setInitCheckoutError,
}: {
  CTA: string;
  style?: 'primary' | 'tertiary';
  paymentForm: {
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    city: string;
    region: string;
    country: string;
    postalCode: string;
    quantity: number;
  };
  setInputErrors: React.Dispatch<React.SetStateAction<Object>>;
  setInitCheckoutError: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const log = useLogger();

  const initCheckout = async () => {
    const formCheck = paymentFormValidation(paymentForm);

    if (Object.keys(formCheck).length === 0) {
      setInitCheckoutError('');
      log.info('Checkout process started (button clicked).', { quantity: paymentForm.quantity ?? null });

      const response = await fetch('/api/montonio/initiate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(paymentForm),
      });

      if (!response.ok) {
        log.error('Failed to initiate checkout process.', { error: response.statusText || 'Unknown error' });
        return setInitCheckoutError('Failed to initiate checkout process. Please try again later.');
      }

      const { data } = await response.json();

      window.location.href = data.paymentUrl;
      log.info('Checkout process in progress. Redirecting to payment page.', { data });
    } else {
      setInputErrors(formCheck);
    }
  };

  return (
    <div className={styles.checkoutButtonWrapper}>
      <Button onClick={initCheckout} CTA={CTA} style={style} svg />
    </div>
  );
};

export default CheckoutButton;
