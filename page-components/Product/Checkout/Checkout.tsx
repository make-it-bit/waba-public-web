'use client';

import React, { useState } from 'react';
import Image from 'next/image';

import { TextInput, NumberInput } from '@/gui-components/client';
import { CheckoutButton } from '@/components';
import { PaymentMethodEnum } from '@/components/CheckoutButton/CheckoutButton';

import { getImageFullUrl_client } from '@/lib/getImgFullUrl';

export type PaymentForm = {
  quantity: number;
  period: number;
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  region: string;
  country: string;
  postalCode: string;
};

type PaymentFormErrors = {
  quantity?: string;
  period?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  address?: string;
  city?: string;
  region?: string;
  country?: string;
  postalCode?: string;
};

const Checkout = ({ mainInfoData }) => {
  const [paymentForm, setPaymentForm] = useState<PaymentForm>({
    quantity: 1,
    period: 1,
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    region: '',
    country: '',
    postalCode: '',
  });
  const [inputErrors, setInputErrors] = useState<PaymentFormErrors>({});
  const [initCheckoutError, setInitCheckoutError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentForm((prev) => ({ ...prev, [name]: name === 'quantity' || name === 'period' ? parseInt(value) : value }));
  };

  return (
    <>
      <div className="flex flex-col gap-16">
        <NumberInput
          label="Quantity"
          name="quantity"
          value={paymentForm.quantity}
          minValue={0}
          onChange={(e) => handleChange(e)}
          errorMessage={inputErrors.quantity}
        />
        <NumberInput
          label="Period (specify if preferred payment method is Buy Now Pay Later)"
          name="period"
          value={paymentForm.period}
          minValue={1}
          maxValue={3}
          onChange={(e) => handleChange(e)}
          errorMessage={inputErrors.period}
        />
      </div>
      <div className="flex flex-col gap-8 mt-24">
        <TextInput
          name="firstName"
          value={paymentForm.firstName}
          placeholder="First name"
          onChange={(e) => handleChange(e)}
          errorMessage={inputErrors.firstName}
        />
        <TextInput
          name="lastName"
          value={paymentForm.lastName}
          placeholder="Last name"
          onChange={(e) => handleChange(e)}
          errorMessage={inputErrors.lastName}
        />
        <TextInput
          name="email"
          value={paymentForm.email}
          placeholder="Email"
          onChange={(e) => handleChange(e)}
          errorMessage={inputErrors.email}
        />
        <TextInput
          name="address"
          value={paymentForm.address}
          placeholder="Address"
          onChange={(e) => handleChange(e)}
          errorMessage={inputErrors.address}
        />
        <TextInput
          name="city"
          value={paymentForm.city}
          placeholder="Locality"
          onChange={(e) => handleChange(e)}
          errorMessage={inputErrors.city}
        />
        <TextInput
          name="region"
          value={paymentForm.region}
          placeholder="Region"
          onChange={(e) => handleChange(e)}
          errorMessage={inputErrors.region}
        />
        <TextInput
          name="country"
          value={paymentForm.country}
          placeholder="Country"
          onChange={(e) => handleChange(e)}
          errorMessage={inputErrors.country}
        />
        <TextInput
          name="postalCode"
          value={paymentForm.postalCode}
          placeholder="Postal code"
          onChange={(e) => handleChange(e)}
          errorMessage={inputErrors.postalCode}
        />
      </div>
      <div className="flex flex-col gap-16">
        <div className="flex flex-wrap gap-16 mt-16">
          <CheckoutButton
            // CTA={mainInfoData.button_1.href_text}
            CTA="Payment Initiation"
            method={PaymentMethodEnum.PAYMENT_INITIATION}
            paymentForm={paymentForm}
            setInputErrors={setInputErrors}
            setInitCheckoutError={setInitCheckoutError}
          />
          <CheckoutButton
            CTA="Card Payments"
            method={PaymentMethodEnum.CARD_PAYMENTS}
            style="tertiary"
            paymentForm={paymentForm}
            setInputErrors={setInputErrors}
            setInitCheckoutError={setInitCheckoutError}
          />
          <CheckoutButton
            CTA="Hire Purchase"
            method={PaymentMethodEnum.HIRE_PURCHASE}
            style="tertiary"
            paymentForm={paymentForm}
            setInputErrors={setInputErrors}
            setInitCheckoutError={setInitCheckoutError}
          />
          <CheckoutButton
            CTA={mainInfoData.button_2.href_text}
            method={PaymentMethodEnum.BNPL}
            style="tertiary"
            paymentForm={paymentForm}
            setInputErrors={setInputErrors}
            setInitCheckoutError={setInitCheckoutError}
          />
        </div>
        <div className="flex">
          <div className="flex-1 items-center">
            <div className="flex justify-center items-center gap-2 lg:w-auto w-full">
              <p className="text-xs leading-xs">powered by</p>
              <Image
                src={getImageFullUrl_client(mainInfoData.powered_by_logos.data[0])}
                width={35}
                height={21}
                quality={100}
                alt="stripe"
              />
            </div>
          </div>
          <div className="flex-1 items-center">
            <div className="flex justify-center items-center gap-2 lg:w-auto w-full">
              <p className="text-xs leading-xs">powered by</p>
              <Image
                src={getImageFullUrl_client(mainInfoData.powered_by_logos.data[1])}
                width={45}
                height={13}
                quality={100}
                alt="klarna"
              />
            </div>
          </div>
        </div>
      </div>
      {initCheckoutError && (
        <>
          <p className="text-xs text-center leading-xs text-signal-red-100 mt-8">
            {initCheckoutError}{' '}
            {/* Please contact us via{' '}
            <a className="underline" href="mailto:info@wabaskin.com">
              info@wabaskin.com
            </a>
            . */}
          </p>
        </>
      )}
    </>
  );
};

export default Checkout;
