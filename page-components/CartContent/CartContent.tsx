'use client'
import { Button, PaymentRadio, TextInput } from "@/gui-components/client";
import { PaymentRadioEnum } from "@/gui-components/client/PaymentRadio/PaymentRadio";
import { flattenNewPrice } from "@/utils/flattenNewPrice";
import { useProductPrice, useProductPriceCurrency } from "@/utils/useProductPrice";
import Link from "next/link";
import { useState, useRef, useEffect, startTransition, useMemo } from "react";
import { ReactSVG } from "react-svg";
import { create } from "zustand";
import { useCurrencyStore } from "../Navbar/currencyStore";

export interface CartState {
  cartPrice: number;
  quantity: number;
  setPrice: (newPrice: number) => void;
  setStoreQuantity: (newQuantity: number) => void;
  removeItems: () => void;
}

// Cart state
export const useCartStore = create<CartState>((set) => ({
  cartPrice: 0,
  quantity: 0,
  setPrice: (newPrice) => set(() => ({ cartPrice: newPrice })),
  setStoreQuantity: (newQuantity) => set(() => ({ quantity: newQuantity })),
  removeItems: () => set(() => ({ quantity: 0})),
}));

interface ModenaError {
  error: string;
  details?: string;
  technicalDetails?: any;
}

interface CustomerDetails {
  fullName: string;
  phoneNumber: string;
  email: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
}

const CartContent = ({ productData }) => {
  const { cartPrice, quantity, setStoreQuantity, removeItems, setPrice } = useCartStore();
  const flatNewPrice = useMemo(() => flattenNewPrice(productData.new_price), [productData?.new_price]);
  const price = useProductPrice(flatNewPrice, 495);
  const currency = useProductPriceCurrency(flatNewPrice);
  const { currency: selectedCurrency, setCurrency } = useCurrencyStore();

  useEffect(() => {
    if (flatNewPrice && selectedCurrency) {
      const priceObj = flatNewPrice.find(
        (item) => item.country === selectedCurrency
      );
      const price = priceObj ? Number(priceObj.price) : 0;
      setPrice(price);
    }
  }, [flatNewPrice, selectedCurrency, setPrice]);

  const [selectedValue, setSelectedValue] = useState('');
  const [error, setError] = useState<ModenaError | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [customerDetails, setCustomerDetails] = useState<CustomerDetails>({
    fullName: '',
    phoneNumber: '',
    email: '',
    address: '',
    city: '',
    province: '',
    postalCode: '',
    country: ''
  });
  const [touchedFields, setTouchedFields] = useState({
    fullName: false,
    phoneNumber: false,
    email: false,
    address: false,
    city: false,
    province: false,
    postalCode: false,
    country: false
  });
  const [showErrors, setShowErrors] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState<number>(0);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight + 150);
    }
  }, [selectedValue]);

  const handleRadioChange = (value: string) => {
    setSelectedValue(value);
  };

  const isModenaFieldsValid = () => {
    if (selectedValue === 'radio4') {
      return customerDetails.fullName.trim() !== '' &&
             customerDetails.phoneNumber.trim() !== '' &&
             customerDetails.email.trim() !== '' &&
             customerDetails.address.trim() !== '' &&
             customerDetails.city.trim() !== '' &&
             customerDetails.province.trim() !== '' &&
             customerDetails.postalCode.trim() !== '' &&
             customerDetails.country.trim() !== '';
    }
    return true;
  };

  const isModenaSelected = selectedValue === 'radio4';
  const totalAmount = (quantity * cartPrice);

  const handleCustomerDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomerDetails(prev => ({
      ...prev,
      [name]: value
    }));
    setTouchedFields(prev => ({
      ...prev,
      [name]: true
    }));
  };

  const incrementQuantity = () => {
    setStoreQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    setStoreQuantity(quantity > 1 ? quantity - 1 : 1);
  };

  const navigateToStripe = () => {
    window.location.href = productData.button_1.href_src || 'https://buy.stripe.com/bIY3dicSV4jJ0W44gi';
  }

  const navigateToModena = async () => {
    try {
      setError(null);
      setIsLoading(true);

      const authResponse = await fetch('/api/modena/auth', {
        method: 'POST',
      });

      const authData = await authResponse.json();

      if (!authResponse.ok) {
        throw new Error(authData.error || 'Failed to authenticate with Modena');
      }

      const { access_token } = authData;

      const orderData = {
        maturityInMonths: 12,
        orderId: `WABA-${Date.now()}`,
        totalAmount: isModenaSelected ? Number((totalAmount * 1.04).toFixed(2)) : totalAmount,
        currency: "EUR",
        orderItems: [
          {
            description: "WABA Eclatia",
            amount: isModenaSelected ? Number((cartPrice * 1.04).toFixed(2)) : cartPrice,
            currency: "EUR",
            quantity: quantity
          }
        ],
        customer: {
          phoneNumber: customerDetails.phoneNumber,
          email: customerDetails.email,
          address: customerDetails.address
        },
        timestamp: new Date().toISOString(),
        returnUrl: `${window.location.origin}/success`,
        cancelUrl: `${window.location.origin}/cancel`,
        callbackUrl: `${window.location.origin}/api/modena/callback`
      };

      const paymentResponse = await fetch('/api/modena/create-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_token,
          orderData
        })
      });

      const paymentData = await paymentResponse.json();

      if (!paymentResponse.ok) {
        throw new Error(paymentData.error || 'Failed to create payment');
      }

      const { redirectUrl } = paymentData;
      if (redirectUrl) {
        window.location.href = redirectUrl;
      }
    } catch (error) {
      console.error('Modena payment error:', error);
      setError({
        error: error instanceof Error ? error.message : 'An error occurred during payment',
        details: error instanceof Error ? error.stack : undefined
      });
    } finally {
      setIsLoading(false);
    }
  }

  const handleCheckout = async () => {
    if (selectedValue === 'radio4' && !isModenaFieldsValid()) {
      setShowErrors(true);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const orderData = {
        full_name: customerDetails.fullName,
        phone: customerDetails.phoneNumber,
        email: customerDetails.email,
        address: customerDetails.address,
        city: customerDetails.city,
        province: customerDetails.province,
        postal_code: customerDetails.postalCode,
        country: customerDetails.country,
        amount: quantity
      };

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData)
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Failed to create order');
      }


      // Proceed with payment based on selected method
      if (selectedValue === 'radio1' || selectedValue === 'radio2') {
        navigateToStripe();
      } else if (selectedValue === 'radio4') {
        await navigateToModena();
      }
    } catch (error) {
      console.error('Error in handleCheckout:', error);
      setError({
        error: error instanceof Error ? error.message : 'An error occurred while creating the order',
        details: error instanceof Error ? error.stack : undefined
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getErrorMessage = (fieldName: keyof CustomerDetails) => {
    if (selectedValue === 'radio4' && (touchedFields[fieldName] || showErrors) && !customerDetails[fieldName].trim()) {
      return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`;
    }
    return undefined;
  };

  const isCheckoutDisabled = !selectedValue || !isModenaFieldsValid();

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
                    <p className="text-2sm select-none">{`${selectedCurrency === 'EUR' ? '€' : ''} ${cartPrice} ${selectedCurrency === 'AED' ? 'AED' : ''}`}</p>
                  </div>
                  <ReactSVG src="icons/trash.svg" className="inline-block cursor-pointer" onClick={() => removeItems()}/>
                </div>
              </div>
            </div>
            <div className="col-span-12 md:col-span-10 md:col-start-2">
              <div className="flex flex-row py-7 justify-end">
                <div className="mr-14">
                  <p className="text-2sm font-bold select-none">{`Total: ${selectedCurrency === 'EUR' ? '€' : ''} ${totalAmount.toFixed(2)} ${selectedCurrency === 'AED' ? 'AED' : ''}`}</p>
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
                  <p className="text-2sm font-bold">Credit Card</p>
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
                    disabled={currency !== 'EUR'}
                  />
                  <div className="flex flex-col">
                    <PaymentRadio
                      id="radio4"
                      label="Pay with"
                      type={PaymentRadioEnum.MODENA}
                      name="payment"
                      value="radio4"
                      checked={selectedValue === 'radio4'}
                      onChange={handleRadioChange}
                      disabled={currency !== 'EUR'}
                    />
                  </div>
                  <div
                    className={`overflow-hidden transition-[max-height] duration-300 ease-in-out`}
                    style={{ maxHeight: selectedValue === 'radio4' ? contentHeight : 0 }}
                  >
                    <div ref={contentRef} className="mt-[50px] space-y-3">
                      <div className="mb-4">
                        <h4 className="text-2sm font-bold">Billing Information</h4>
                      </div>
                      <div>
                        <TextInput
                          type="text"
                          name="fullName"
                          value={customerDetails.fullName}
                          onChange={handleCustomerDetailsChange}
                          placeholder="Full name"
                          theme="dark"
                        />
                      </div>
                      <div>
                        <TextInput
                          type="tel"
                          name="phoneNumber"
                          value={customerDetails.phoneNumber}
                          onChange={handleCustomerDetailsChange}
                          placeholder="Phone number"
                          theme="dark"
                        />
                      </div>
                      <div>
                        <TextInput
                          type="email"
                          name="email"
                          value={customerDetails.email}
                          onChange={handleCustomerDetailsChange}
                          placeholder="Email"
                          theme="dark"
                        />
                      </div>
                      <div>
                        <TextInput
                          type="text"
                          name="address"
                          value={customerDetails.address}
                          onChange={handleCustomerDetailsChange}
                          placeholder="Street address"
                          theme="dark"
                        />
                      </div>
                      <div>
                        <TextInput
                          type="text"
                          name="city"
                          value={customerDetails.city}
                          onChange={handleCustomerDetailsChange}
                          placeholder="City"
                          theme="dark"
                        />
                      </div>
                      <div>
                        <TextInput
                          type="text"
                          name="province"
                          value={customerDetails.province}
                          onChange={handleCustomerDetailsChange}
                          placeholder="Province/State"
                          theme="dark"
                        />
                      </div>
                      <div>
                        <TextInput
                          type="text"
                          name="postalCode"
                          value={customerDetails.postalCode}
                          onChange={handleCustomerDetailsChange}
                          placeholder="Postal code"
                          theme="dark"
                        />
                      </div>
                      <div>
                        <TextInput
                          type="text"
                          name="country"
                          value={customerDetails.country}
                          onChange={handleCustomerDetailsChange}
                          placeholder="Country"
                          theme="dark"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-12 md:col-span-10 md:col-start-2">
              <div className="mt-[25px]">
                <p className="text-sm"> 
                  I have read and agree with all the 
                  <Link href="/terms">
                    <span className="underline ml-[5px]">Terms of Use</span>
                  </Link> and  
                  <Link href="/privacy-policy">
                    <span className="underline ml-[5px]">Privacy Policy</span>
                  </Link>
                </p>
              </div>
            </div>
            <div className="col-span-12 md:col-span-10 md:col-start-2 py-[50px]">
              <Button
                onClick={handleCheckout}
                style="tertiary"
                otherClassnames='w-full'
                CTA={isLoading ? 'Processing...' : 'Checkout'}
                svg
                disabled={isCheckoutDisabled || isLoading}
              />
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
