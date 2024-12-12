'use client';

import React, { useState } from 'react';
import Image from 'next/image';

import { NumberInput } from '@/gui-components/client';
import { CheckoutButton } from '@/components';

import { getImageFullUrl_client } from '@/lib/getImgFullUrl';
import { CHECKOUT_TYPE } from '@/components/CheckoutButton/CheckoutButton';

const Checkout = ({ mainInfoData }) => {
  const [quantity, setQuantity] = useState(1);
  const [initCheckoutError, setInitCheckoutError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setQuantity(parseInt(e.target.value));

  return (
    <>
      <NumberInput label="Quantity" name="product-quantity" value={quantity} minValue={0} onChange={handleChange} />
      <div className="flex flex-wrap gap-16 mt-16">
        <div className="flex flex-col items-center gap-8 grow-1">
          <CheckoutButton
            type={CHECKOUT_TYPE.STRIPE}
            setInitCheckoutError={setInitCheckoutError}
            quantity={quantity}
            CTA={mainInfoData.button_1.href_text}
          />
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
        <div className="flex flex-col items-center gap-8 grow-1">
          <CheckoutButton
            type={CHECKOUT_TYPE.PAY_LASTER}
            setInitCheckoutError={setInitCheckoutError}
            quantity={quantity}
            CTA={mainInfoData.button_2.href_text}
            style="tertiary"
          />
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
      {initCheckoutError && (
        <>
          <p className="text-xs text-center leading-xs text-signal-red-100 mt-8">
            {initCheckoutError} Please contact us via{' '}
            <a className="underline" href="mailto:info@waba.health">
              info@waba.health
            </a>{' '}
            or via{' '}
            <a className="underline" href="https://www.instagram.com/wabahealth">
              Instagram
            </a>
            .
          </p>
        </>
      )}
    </>
  );
};

export default Checkout;
