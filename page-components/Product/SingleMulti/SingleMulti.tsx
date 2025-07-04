'use client'
import { ReactSVG } from "react-svg";
import Image from 'next/image';
import { Button, NumberInput } from "@/gui-components/client";
import { useState } from "react";
import { useCartStore } from "@/page-components/CartContent/CartContent";
import { Slide, toast, ToastContainer } from "react-toastify";
import { flattenNewPrice } from "@/utils/flattenNewPrice";
import { useProductPrice, useProductPriceCurrency } from "@/utils/useProductPrice";
import styles from './SingleMultiOverride.module.scss';

const SingleMulti = ({ new_price }: { new_price: any }) => {
  const { setStoreQuantity } = useCartStore();
  const [quantity, setQuantity] = useState(1);
  const flatNewPrice = flattenNewPrice(new_price);
  const price = useProductPrice(flatNewPrice, 495);
  const currency = useProductPriceCurrency(flatNewPrice);
  
  const filterPrice = (priceValue: number) => {
    return priceValue.toString().replace('€', '').trim();
  };
  const calculateMonthlyPayment = (price: number) => {
    return (price / 12).toFixed(2);
  }
  const convertValue = (price: number) => {
    if (currency === 'EUR') {
      return price;
    }
    else if (currency === 'AED') {
      return price * 4.3;
    }
    return price;
  }

  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setQuantity(parseInt(e.target.value));
  const addToCart = (quantity: number) => {
    setStoreQuantity(quantity);
    toast.info('Added to Cart!');
  };
  return (
    <div className={`container md:py-[108px] ${styles['force-mobile']}`}>
      <ToastContainer
        className="block md:hidden"
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="light"
        transition={Slide}
      />
      <div className="text-center pb-20">
        <h3 className="font-rufina text-5xl">Single versus Multi-Use Products</h3>
      </div>
      <div className="md:grid grid-cols-12 md:gap-x-[50px] md:gap-y-[5px]">
        <div className="col-span-12 md:col-span-6 bg-[#F3ECEE] order-1">
          <div className="grid grid-cols-12 p-10">
            <div className="col-span-12 md:col-span-6 relative flex pt-[25px] md:pt-auto">
              <div className="bg-white-100 px-3 p-2 absolute -top-[20px] z-10">
                <p className="text-sm">Other products in the market - {convertValue(550)} {currency}</p>
              </div>
              <Image
                src="/mask-red-dots.jpg"
                alt="mask red dots"
                width={312}
                height={312}
                quality={100}
                className="absolute -bottom-[40px] z-0 hidden md:block"
              />
            </div>
            <div className="col-span-12 md:col-span-6">
              <div className="flex flex-row items-center">
                <div>
                  <p className="text-[#FF3672] text-[40px]">50%</p>
                </div>
                <div>
                  <p className="text-[#FF3672] text-[16px] leading-[18px]">skin <br /> coverage</p>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="mt-5">
                  <p className="text-2sm">Masks only cover about 50% of your face, with LEDs fixed in place, leaving key areas untreated.</p>
                </div>
                <div className="mt-5">
                  <div className="flex flex-row items-center pb-2">
                    <div>
                      <ReactSVG
                        src="icons/close.svg"
                        className="cursor-pointer block"
                      />
                    </div>
                    <div>
                      <p className="text-2sm ml-2">Blue or red only light mask +{convertValue(690)} {currency}</p>
                    </div>
                  </div>
                  <div className="flex flex-row items-center pb-2">
                    <div>
                      <ReactSVG
                        src="icons/close.svg"
                        className="cursor-pointer block"
                      />
                    </div>
                    <div>
                      <p className="text-2sm ml-2">Decollatage mask +{convertValue(690)} {currency}</p>
                    </div>
                  </div>
                  <div className="flex flex-row items-center pb-2">
                    <div>
                      <ReactSVG
                        src="icons/close.svg"
                        className="cursor-pointer block"
                      />
                    </div>
                    <div>
                      <p className="text-2sm ml-2">Hand mask +{convertValue(690)} {currency}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-12 md:col-span-6 bg-[#F3ECEE] text-center p-5 order-3 md:order-3">
          <p className="text-2sm">Each wavelength and body area requires a separate device, adding cost.</p>
          <div className="grid grid-cols-12">
            <div className="col-span-4 h-[200px] relative flex items-end">
              <div className="bg-white-100 p-2 absolute top-[50px] md:top-[70px] md:right-0 z-10">
                <p className="text-sm">+{convertValue(690)} {currency}</p>
              </div>
              <Image
                src="/mask-blue-dots.jpg"
                alt="mask red dots"
                width={200}
                height={200}
                quality={100}
                className="absolute md:-bottom-[62px] z-0"
              />
            </div>
            <div className="col-span-4 relative flex items-end">
              <div className="bg-white-100 p-2 absolute top-[50px] md:top-[160px] md:right-0 z-10">
                <p className="text-sm">+{convertValue(690)} {currency}</p>
              </div>
              <Image
                src="/mask-body.jpg"
                alt="mask red dots"
                width={200}
                height={200}
                quality={100}
                className="absolute md:-bottom-[62px] z-0"
              />
            </div>
            <div className="col-span-4  relative flex items-end">
              <div className="bg-white-100 p-2 absolute top-[50px] md:top-[130px] md:right-0 z-10">
                <p className="text-sm">+{convertValue(690)} {currency}</p>
              </div>
              <Image
                src="/mask-hand.jpg"
                alt="mask red dots"
                width={140}
                height={135}
                quality={100}
                className="absolute md:-bottom-[35px] md:right-[40px] z-0"
              />
              <div className="bg-black-100 px-2 p-2 absolute md:-bottom-[62px] md:-right-[20px] -right-[20px] z-10">
                <p className="text-sm md:text-2sm px-[10px] text-white-100">Total {convertValue(2000)}+ {currency}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-12 md:col-span-6 bg-[#F3ECEE] order-2 md:order-2">
          <div className="grid grid-cols-12 p-10">
            <div className="col-span-12 md:col-span-6 relative flex pt-[25px] md:pt-auto">
              <div className="bg-white-100 px-3 p-2 absolute -top-[20px] z-10">
                <p className="text-sm">WABA Eclatia - {price} {currency}</p>
              </div>
              <Image
                src="/mask-waba-device.jpg"
                alt="mask blue dots"
                width={312}
                height={312}
                quality={100}
                className="absolute -bottom-[40px] z-0 hidden md:block"
              />
            </div>
            <div className="col-span-12 md:col-span-6">
              <div className="flex flex-ro items-center">
                <div>
                  <p className="text-[#9747FF] text-[40px]">100%</p>
                </div>
                <div>
                  <p className="text-[#9747FF] text-[16px] leading-[18px]">skin <br /> coverage</p>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="mt-5">
                  <p className="text-2sm">Our device ensures full skin coverage, reaching every area with targeted precision for maximum effectiveness.</p>
                </div>
                <div className="mt-5">
                  <div className="flex flex-row items-center pb-2">
                    <div>
                      <ReactSVG
                        src="icons/checkmark.svg"
                        className="cursor-pointer block"
                      />
                    </div>
                    <div>
                      <p className="text-2sm ml-2">Blue light included</p>
                    </div>
                  </div>
                  <div className="flex flex-row items-center pb-2">
                    <div>
                      <ReactSVG
                        src="icons/checkmark.svg"
                        className="cursor-pointer block"
                      />
                    </div>
                    <div>
                      <p className="text-2sm ml-2">Red light included</p>
                    </div>
                  </div>
                  <div className="flex flex-row items-center pb-2">
                    <div>
                      <ReactSVG
                        src="icons/checkmark.svg"
                        className="cursor-pointer block"
                      />
                    </div>
                    <div>
                      <p className="text-2sm ml-2">Infrared light included</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-12 md:col-span-6 bg-[#F3ECEE] text-center pt-5 order-4">
          <p className="text-2sm pb-5">One product with three light wavelengths, no extras needed.</p>
          <div className="grid grid-cols-12 gap-0">
            <div className="col-span-4 relative flex items-end">
              <div className="bg-white-100 p-2 px-[10px] absolute md:top-[20px] md:left-5 top-[0px] left-[0px] z-10">
                <p className="text-sm">included</p>
              </div>
              <Image
                src="/red-collar.jpg"
                alt="mask red dots"
                width={200}
                height={200}
                quality={100}
                className="w-full object-cover z-0"
              />
            </div>
            <div className="col-span-4 relative flex items-end">
              <div className="bg-white-100 p-2 px-[10px] absolute md:top-[20px] md:left-5 top-[0px] left-[0px] z-10">
                <p className="text-sm">included</p>
              </div>
              <Image
                src="/red-neck.jpg"
                alt="mask red dots"
                width={200}
                height={200}
                quality={100}
                className="w-full z-0"
              />
            </div>
            <div className="col-span-4 relative flex items-end">
              <div className="bg-white-100 p-2 px-[10px] absolute md:top-[20px] md:left-5 top-[0px] left-[0px] z-10">
                <p className="text-sm">included</p>
              </div>
              <Image
                src="/red-hand.jpg"
                alt="mask red dots"
                width={200}
                height={200}
                quality={100}
                className="w-full object-cover z-0"
              />
              <div className="bg-black-100 px-2 p-2 absolute bottom-0 right-0 z-10">
                <p className="text-sm md:text-2sm px-[10px] text-white-100">Total {price} {currency}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-12 mt-[50px] md:gap-[50px] single-multi-maxw ">
        <div className="col-span-12 md:col-span-6 md:p-5 mt-5 md:mt-0 md:order-1 order-2">
          <h3 className="font-rufina text-3xl leading-3xl md:text-5xl md:leading-5xl">Professional-Grade Results At No Cost</h3>
          <p className="text-2sm leading-2sm mt-10">
            Similar to many in-clinic and salon skin treatments, maintaining the benefits of light therapy requires consistent sessions.
          </p>
          <p className="text-2sm leading-2sm mt-10">
            With the investment equivalent to just a couple of professional light therapy sessions, you can own the WABA Eclatia. Enjoy the convenience of treating your skin from just 3 minutes, anytime and anywhere you choose.
          </p>
          <p className="text-2sm leading-2sm mt-10">Interested in making it yours?</p>
          <div className="grid grid-cols-12 mt-10 gap-5">
            <div className="col-span-12 md:col-span-2">
              <NumberInput label="Quantity" name="product-quantity" value={quantity} minValue={0} onChange={handleChange} />
            </div>
            <div className="col-span-12 md:col-span-10">
              <div className="pt-5">
                <Button onClick={() => addToCart(quantity)} style="tertiary" otherClassnames='w-full' CTA={'Add to cart'} svg />
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center mt-5 text-center md:flex-row md:items-start md:justify-start md:text-left">
            {currency === 'EUR' && <p className="text-sm text-black-60">Buy Now, Pay Later options from €{calculateMonthlyPayment(Number(price))}/month (12 payments)</p>}
          </div>
        </div>
        <div className="col-span-12 md:col-span-6 p-5 bg-[#F3ECEE] py-[20px] md:py-[100px] md:order-2 order-1">
          <div className="grid grid-cols-12">
            <div className="col-span-6 border-r-2 border-black-100 relative p-10 md:p-20">
              <div className="bg-white-100 p-5 absolute md:top-[20px] -top-[10px] -left-[10px] md:left-5 z-10">
                <p className="text-sm">Waba Eclatia</p>
                <p className="text-sm font-bold">{price} {currency}</p>
              </div>
              <div className="absolute top-[95px] left-[10px] md:top-auto md:left-auto w-[150px] h-[200px] md:w-[210px] md:h-[260px]">
                <Image
                  src="/device-blue.png"
                  alt="mask red dots"
                  fill
                  quality={100}
                  className="object-contain z-0"
                />
              </div>
            </div>
            <div className="col-span-6 relative flex flex-col pl-10 py-10">
              <div className="mt-2 md:mt-5">
                <p className="text-2sm font-thin">Cost of Alternatives</p>
              </div>
              <div className="mt-[25px] md:mt-10">
                <p className="text-sm font-bold">Beauty salon*</p>
                <p className="text-sm">{convertValue(1500)}+ {currency}</p>
              </div>
              <div className="mt-[25px] md:mt-10">
                <p className="text-sm font-bold">Light therapy clinics*</p>
                <p className="text-sm">{convertValue(1200)}+ {currency}</p>
              </div>
              <div className="mt-[25px] md:mt-10 md:pb-5">
                <p className="text-sm font-bold">Traditional skincare*</p>
                <p className="text-sm">{convertValue(700)}+ {currency}</p>
              </div>
              <div className="absolute -bottom-[10px] md:-bottom-[90px] right-0">
                <p className="text-sm">*Yearly cost, in {currency}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SingleMulti;
