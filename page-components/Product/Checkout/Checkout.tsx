'use client';

import React, { useState } from 'react';
import Image from 'next/image';

import { NumberInput } from '@/gui-components/client';
import { CheckoutButton } from '@/components';

import { getImageFullUrl } from '@/lib/strapi';

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
            setInitCheckoutError={setInitCheckoutError}
            quantity={quantity}
            CTA={mainInfoData.button_1.href_text}
          />
          <div className="flex justify-center items-center justify-center gap-2 lg:w-auto w-full">
            <p className="text-xs leading-xs">powered by</p>
            <Image src={getImageFullUrl(mainInfoData.powered_by_logos.data[0])} width={35} height={21} alt="stripe" />
          </div>
        </div>
        <div className="flex flex-col items-center gap-8 grow-1">
          <CheckoutButton
            setInitCheckoutError={setInitCheckoutError}
            quantity={quantity}
            CTA={mainInfoData.button_2.href_text}
            style="tertiary"
          />
          <div className="flex justify-center items-center justify-center gap-2 lg:w-auto w-full">
            <p className="text-xs leading-xs">powered by</p>
            <Image src={getImageFullUrl(mainInfoData.powered_by_logos.data[1])} width={45} height={13} alt="klarna" />
          </div>
        </div>
      </div>
      {initCheckoutError && (
        <p className="text-xs text-center leading-xs text-signal-red-100 mt-8">{initCheckoutError}</p>
      )}
    </>
  );
};

export default Checkout;
