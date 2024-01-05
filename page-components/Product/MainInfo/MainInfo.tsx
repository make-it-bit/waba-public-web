'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import classNames from 'classnames';

import { CheckoutButton, Tag } from '@/components';
import { Button, NumberInput } from '@/gui-components/client';

import { getImageFullUrl } from '@/lib/strapi';

import styles from './_mainInfo.module.scss';

const MainInfo = ({ mainInfoData }) => {
  const [quantity, setQuantity] = useState(1);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setQuantity(parseInt(e.target.value));

  return (
    <div className="container md:mt-64 mt-24 md:mb-72 mb-64">
      <div className="grid grid-cols-12 md:gap-y-24 gap-y-32">
        <div className="md:block hidden col-start-1 col-span-5">
          <div className="relative w-full h-full min-h-[526px]">
            <Image src="/device.png" fill className="absolute rotate-90 w-full h-full object-contain" alt="device" />
            <div className="absolute bg-[#f3ecee] w-full h-full top-0 left-0 z-[-1]"></div>
          </div>
        </div>

        <div className="md:hidden block col-span-12">
          <div className="flex gap-24 overflow-x-auto">
            {mainInfoData.images.data.map((image, index) => (
              <div key={index} className="relative min-w-[260px] h-[260px]">
                <Image
                  src={getImageFullUrl(image)}
                  fill
                  className="absolute w-full h-full object-cover"
                  alt="product main info image"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="md:col-start-7 md:col-span-5 col-span-12 sticky top-[201px]">
          <div className="flex flex-col">
            <div className="flex flex-wrap gap-8 md:mb-48 mb-32">
              {mainInfoData.tags.data.map((tag, index) => (
                <Tag
                  key={index}
                  text={tag.attributes.text}
                  svg={tag.attributes.logo.data && getImageFullUrl(tag.attributes.logo.data)}
                />
              ))}
            </div>
            <h1 className="font-rufina text-4xl leading-4xl">{mainInfoData.title}</h1>
            <h2 className="text-2xl leading-2xl md:my-8 my-16">{mainInfoData.price}</h2>
            <p className="text-sm leading-sm md:mt-32 mt-16 md:mb-40 mb-32">{mainInfoData.description}</p>
            <NumberInput
              label="Quantity"
              name="product-quantity"
              value={quantity}
              minValue={0}
              onChange={handleChange}
            />
            <div className={classNames('flex flex-wrap gap-16 mt-16', styles.button)}>
              <div className="flex flex-col items-center gap-8 grow-1 ">
                <CheckoutButton CTA={mainInfoData.button_2.href_text} />
                <div className="flex justify-center items-center justify-center gap-2 lg:w-auto w-full">
                  <p className="text-xs leading-xs">powered by</p>
                  <Image
                    src={getImageFullUrl(mainInfoData.powered_by_logos.data[0])}
                    width={35}
                    height={21}
                    alt="stripe"
                  />
                </div>
              </div>
              <div className="flex flex-col items-center gap-8 grow-1 ">
                <CheckoutButton CTA={mainInfoData.button_2.href_text} style="tertiary" />
                <div className="flex justify-center items-center justify-center gap-2 lg:w-auto w-full">
                  <p className="text-xs leading-xs">powered by</p>
                  <Image
                    src={getImageFullUrl(mainInfoData.powered_by_logos.data[1])}
                    width={45}
                    height={13}
                    alt="klarna"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="md:block hidden col-start-1 col-span-5">
          <div className="grid grid-cols-5 grid-flow-row gap-24">
            <div className="col-start-1 col-span-3 row-span-2">
              <div className="relative w-full h-full min-h-[416px]">
                <Image
                  src="/product-main-info-img-1.png"
                  fill
                  className="absolute w-full h-full object-cover"
                  alt="product main info image"
                />
              </div>
            </div>
            <div className="col-start-4 col-span-2">
              <div className="relative w-full h-full min-h-[196px]">
                <Image
                  src="/product-main-info-img-2.png"
                  fill
                  className="absolute w-full h-full object-cover"
                  alt="product main info image"
                />
              </div>
            </div>
            <div className="col-start-4 col-span-2">
              <div className="relative w-full h-full min-h-[196px]">
                <Image
                  src="/pre-footer-img-2.png"
                  fill
                  className="absolute w-full h-full object-cover"
                  alt="product main info image"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="md:block hidden col-start-1 col-span-5">
          <div className="relative w-full h-full min-h-[217px]">
            <Image src="/device.png" fill className="absolute rotate-90 w-full h-full object-contain" alt="device" />
            <div className="absolute bg-[#f3ecee] w-full h-full top-0 left-0 z-[-1]"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainInfo;
