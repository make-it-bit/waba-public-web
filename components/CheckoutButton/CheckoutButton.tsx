'use client';

import React from 'react';
import { useLogger } from 'next-axiom';
import classNames from 'classnames';

import { PaymentForm } from '@/page-components/Product/Checkout/Checkout';
import { payingInPartsValidation, paymentFormValidation } from '@/utils/formValidation';

import { Button } from '@/gui-components/client';

import styles from './_checkoutButton.module.scss';

export enum PaymentMethodEnum {
  PAYMENT_INITIATION = 'paymentInitiation',
  CARD_PAYMENTS = 'cardPayments',
  HIRE_PURCHASE = 'hirePurchase',
  BNPL = 'bnpl',
}

const CheckoutButton = ({
  CTA,
  method,
  style = 'primary',
  paymentForm,
  setInputErrors,
  setInitCheckoutError,
}: {
  CTA: string;
  method: PaymentMethodEnum;
  style?: 'primary' | 'tertiary';
  paymentForm: PaymentForm;
  setInputErrors: React.Dispatch<React.SetStateAction<Object>>;
  setInitCheckoutError: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const log = useLogger();

  const initCheckout = async () => {
    setInitCheckoutError('');
    setInputErrors({});

    const payingInPartsCheck = payingInPartsValidation(paymentForm.quantity * 962, method, paymentForm.period);
    if (payingInPartsCheck) {
      setInitCheckoutError(payingInPartsCheck);
      return;
    }

    const formCheck = paymentFormValidation(paymentForm, method);

    if (Object.keys(formCheck).length === 0) {
      log.info('Checkout process started (button clicked).', { quantity: paymentForm.quantity ?? null });

      const response = await fetch('/api/montonio/initiate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...paymentForm, paymentMethod: method }),
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
    <div className={classNames('flex flex-1', styles.checkoutButtonWrapper)}>
      <Button onClick={initCheckout} CTA={CTA} style={style} svg />
    </div>
  );
};

export default CheckoutButton;
