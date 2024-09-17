'use client';

import React, { useState } from 'react';
import Image from 'next/image';

import { TextInput, SelectInput } from '@/gui-components/client';
import { CheckoutButton } from '@/components';
import { PaymentMethodEnum } from '@/lib/enums';

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
    period: 0,
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
    setPaymentForm((prev) => ({
      ...prev,
      [name]: name === 'quantity' || name === 'period' ? (value === '' ? 0 : parseInt(value)) : value,
    }));
  };

  return (
    <>
      <div className="flex flex-col gap-16">
        <TextInput
          type="number"
          label="Quantity*"
          name="quantity"
          value={paymentForm.quantity.toString()}
          onChange={(e) => handleChange(e)}
          errorMessage={inputErrors.quantity}
        />
        <SelectInput
          label="Period (specify if preferred payment method is Buy Now Pay Later)"
          name="period"
          value={paymentForm.period === 0 ? '' : paymentForm.period.toString()}
          options={[
            { value: '1', label: '1 month' },
            { value: '2', label: '2 months' },
            { value: '3', label: '3 months' },
          ]}
          onChange={(e) => handleChange(e)}
          errorMessage={inputErrors.period}
        />
      </div>
      <div className="flex flex-col gap-8 mt-24">
        <TextInput
          label="First name*"
          name="firstName"
          value={paymentForm.firstName}
          onChange={(e) => handleChange(e)}
          errorMessage={inputErrors.firstName}
        />
        <TextInput
          label="Last name*"
          name="lastName"
          value={paymentForm.lastName}
          onChange={(e) => handleChange(e)}
          errorMessage={inputErrors.lastName}
        />
        <TextInput
          label="Email*"
          name="email"
          value={paymentForm.email}
          onChange={(e) => handleChange(e)}
          errorMessage={inputErrors.email}
        />
        <TextInput
          label="Address*"
          name="address"
          value={paymentForm.address}
          onChange={(e) => handleChange(e)}
          errorMessage={inputErrors.address}
        />
        <TextInput
          label="City*"
          name="city"
          value={paymentForm.city}
          onChange={(e) => handleChange(e)}
          errorMessage={inputErrors.city}
        />
        <TextInput
          label="Region*"
          name="region"
          value={paymentForm.region}
          onChange={(e) => handleChange(e)}
          errorMessage={inputErrors.region}
        />
        <TextInput
          label="Country*"
          name="country"
          value={paymentForm.country}
          onChange={(e) => handleChange(e)}
          errorMessage={inputErrors.country}
        />
        <TextInput
          label="Postal code*"
          name="postalCode"
          value={paymentForm.postalCode}
          onChange={(e) => handleChange(e)}
          errorMessage={inputErrors.postalCode}
        />
      </div>
      <div className="flex flex-col gap-16">
        <div className="flex flex-wrap gap-16 mt-16">
          <CheckoutButton
            // CTA={mainInfoData.button_1.href_text}
            CTA="Bank Payments"
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
