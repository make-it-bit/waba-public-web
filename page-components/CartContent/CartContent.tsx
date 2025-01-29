'use client'
import { Button, PaymentRadio, TermsRadio } from "@/gui-components/client";
import { PaymentRadioEnum } from "@/gui-components/client/PaymentRadio/PaymentRadio";
import Link from "next/link";
import { useState } from "react";
import { ReactSVG } from "react-svg";
import { create } from "zustand";

export interface CartState {
  price: number;
  quantity: number;
  setPrice: (newPrice: number) => void;
  setStoreQuantity: (newQuantity: number) => void;
  removeItems: () => void;
}

// Cart state
export const useCartStore = create<CartState>((set) => ({
  price: 475,
  quantity: 0,
  setPrice: (newPrice) => set(() => ({ price: newPrice })),
  setStoreQuantity: (newQuantity) => set(() => ({ quantity: newQuantity })),
  removeItems: () => set(() => ({ quantity: 0})),
}));

const CartContent = () => {
  const { price, quantity, setStoreQuantity, removeItems } = useCartStore();
  const [selectedValue, setSelectedValue] = useState('');
  const [termsSelectedValue, setTermsSelectedValue] = useState('');

  const handleRadioChange = (value: string) => {
    setSelectedValue(value);
  };

  const handleTermsRadioChange = (value: string) => {
    setTermsSelectedValue(value);
  };

  const incrementQuantity = () => {
    setStoreQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    setStoreQuantity(quantity > 1 ? quantity - 1 : 1);
  };

  const navigateToStripe = () => {
    window.location.href = 'https://buy.stripe.com/bIY3dicSV4jJ0W44gi'
  }

  const isCheckoutDisabled = !selectedValue || !termsSelectedValue;

  return (
    <>
      {quantity > 0 && (
        <div className="container">
          <div className="grid grid-cols-12">
            <div className="col-span-10 col-start-2 my-10">
              <div className="text-center">
                <h3 className="text-5xl leading-5xl font-rufina">Your Order</h3>
              </div>
            </div>
            <div className="col-span-12 md:col-span-10 md:col-start-2 border-b border-black-100 border-t py-7">
              <div className="flex flex-row justify-between">
                <div>
                  <h2 className="text-2sm">WABA Eclatia</h2>
                </div>
                <div>
                  <div className="flex flex-row">
                    <div>
                      <p className="text-2sm select-none">Qty:</p>
                    </div>
                    <div className="flex flex-row items-center gap-[15px] ml-[25px]">
                      <ReactSVG src="icons/minus.svg" className="inline-block cursor-pointer" onClick={decrementQuantity} />
                      <div className="text-center select-none">
                        {quantity}
                      </div>
                      <ReactSVG src="icons/plus.svg" className="inline-block cursor-pointer" onClick={incrementQuantity} />
                    </div>
                  </div>
                </div>
                <div className="flex flex-row items-center gap-10">
                  <div>
                    <p className="text-2sm select-none">{`€${price}`}</p>
                  </div>
                  <ReactSVG src="icons/trash.svg" className="inline-block cursor-pointer" onClick={() => removeItems()}/>
                </div>
              </div>
            </div>
            <div className="col-span-12 md:col-span-10 md:col-start-2">
              <div className="flex flex-row py-7 justify-end">
                <div className="mr-14">
                  <p className="text-2sm font-bold select-none">{`Total: €${quantity * price}`}</p>
                </div>
              </div>
            </div>
            <div className="col-span-12 md:col-span-10 md:col-start-2 border-b border-black-100">
              <div className="flex flex-row py-7">
                <div className="mr-14">
                  <p className="font-rufina text-2xl select-none">Select Payment</p>
                </div>
              </div>
            </div>
            <div className="col-span-12 md:col-span-10 md:col-start-2">
              <div className="grid grid-cols-10 py-[25px]">
                <div className="col-span-10 md:col-span-5 md:border-r-2 border-black-50 border-b-2 md:border-b-0 md:pl-0 pl-[25px] md:pb-0 pb-[25px]">
                  <p className="text-2sm font-bold">Credit Cart</p>
                  <PaymentRadio
                    id="radio1"
                    label="Pay with"
                    type={PaymentRadioEnum.STRIPE}
                    name="payment"
                    value="radio1"
                    checked={selectedValue === 'radio1'}
                    onChange={handleRadioChange}
                  />
                </div>
                <div className="col-span-10 md:col-span-5 pl-[25px] md:pt-0 pt-[25px]">
                  <p className="text-2sm font-bold">Buy Now Pay Later</p>
                  <PaymentRadio
                    id="radio2"
                    label="Pay with"
                    type={PaymentRadioEnum.KLARNA}
                    name="payment"
                    value="radio2"
                    checked={selectedValue === 'radio2'}
                    onChange={handleRadioChange}
                  />
                  <PaymentRadio
                    disabled={true}
                    id="radio3"
                    label="Pay with"
                    type={PaymentRadioEnum.MAKSEKESKUS}
                    name="payment"
                    value="radio3"
                    checked={selectedValue === 'radio3'}
                    onChange={handleRadioChange}
                  />
                </div>
              </div>
            </div>
            <div className="col-span-12 md:col-span-10 md:col-start-2">
              <TermsRadio id="radio4" name="terms" value="radio4" checked={termsSelectedValue === 'radio4'} onChange={handleTermsRadioChange} />
            </div>
            <div className="col-span-12 md:col-span-10 md:col-start-2 py-[50px]">
              <Button onClick={navigateToStripe} style="tertiary" otherClassnames='w-full' CTA={'Checkout'} svg disabled={isCheckoutDisabled} />
            </div>
          </div>
        </div>
      )}
      {quantity === 0 && (
        <div className="container">
          <div className="grid grid-cols-12">
            <div className="col-span-12 md:col-span-10 md:col-start-2 my-10">
              <div className="text-center">
                <h3 className="text-4xl leading-4xl font-rufina">Your Cart</h3>
                <p className="text-sm">Your cart is currently empty</p>
              </div>
            </div>
            <div className="col-span-12 md:col-span-2 md:col-start-6 mb-[50px]">
              <Link href="/product">
                <Button style="tertiary" otherClassnames='w-full' CTA={'Continue shopping'} svg />
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CartContent;
