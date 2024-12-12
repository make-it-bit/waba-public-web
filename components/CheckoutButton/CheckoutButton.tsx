'use client';

import React from 'react';
import { useLogger } from 'next-axiom';

import { Button } from '@/gui-components/client';

import styles from './_checkoutButton.module.scss';

export enum CHECKOUT_TYPE {
 STRIPE = 'stripe',
 PAY_LASTER = 'pay_later',
}

const CheckoutButton = ({
  CTA,
  style = 'primary',
  type,
  quantity,
  setInitCheckoutError,
}: {
  CTA: string;
  type: CHECKOUT_TYPE,
  style?: 'primary' | 'tertiary';
  quantity: number;
  setInitCheckoutError: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const log = useLogger();

  const initCheckout = async () => type === CHECKOUT_TYPE.STRIPE
    ? window.location.href = 'https://buy.stripe.com/bIY3dicSV4jJ0W44gi'
    : setInitCheckoutError('Currently only e-mail based Buy Now Pay later checkout is available.');

  return (
    <div className={styles.checkoutButtonWrapper}>
      <Button onClick={initCheckout} CTA={CTA} style={style} svg />
    </div>
  );
};

export default CheckoutButton;
