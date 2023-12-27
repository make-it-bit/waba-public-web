'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import classNames from 'classnames';

import { getImageFullUrl } from '../../../lib/strapi';

import { Button } from '../../../gui-components/client';

import { Tag } from '../../../components';

import styles from './_mainInfo.module.scss';

const MainInfo = ({ mainInfoData }) => {
  return (
    <div className="container mt-64 mb-72">
      <div className="grid grid-cols-12 gap-y-24">
        <div className="col-start-1 col-span-5">
          <div className="relative w-full h-full min-h-[526px]">
            {/* <Image
              src="/device.png"
              fill
              className="absolute rotate-90 w-full h-full object-contain"
              alt="device"
            /> */}
            <div className="absolute bg-[#f3ecee] w-full h-full top-0 left-0 z-[-1]"></div>
          </div>
        </div>
        <div className="col-start-7 col-span-5">
          <div className="flex flex-col">
            <div className="flex gap-8 mb-48">
              <Tag text="Made in EU" svg />
              <Tag text="CE Certified" />
              <Tag text="2-year warranty" />
            </div>
            <h1 className="font-rufina text-4xl leading-4xl">{mainInfoData.title}</h1>
            <h2 className="text-2xl leading-2xl">{mainInfoData.price}</h2>
            <p className="text-sm leading-sm mt-32 mb-40">{mainInfoData.description}</p>
            <div className={classNames('flex flex-wrap gap-16', styles.button)}>
              <div className="flex flex-col items-center gap-8 lg:w-auto w-full">
                <Link href={mainInfoData.button_1.href_src}>
                  <Button CTA={mainInfoData.button_1.href_text} svg />
                </Link>
                <div className="flex gap-2">
                  <p className="text-xs leading-xs">powered by</p>
                  <Image
                    src={getImageFullUrl(mainInfoData.powered_by_logos.data[0])}
                    width={35}
                    height={21}
                    alt="stripe"
                  />
                </div>
              </div>
              <div className="flex flex-col items-center gap-8 lg:w-auto w-full">
                <Link href={mainInfoData.button_2.href_src}>
                  <Button CTA={mainInfoData.button_2.href_text} style="tertiary" svg />
                </Link>
                <div className="flex gap-2">
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
        <div className="col-start-1 col-span-5">
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
        <div className="col-start-1 col-span-5">
          <div className="relative w-full h-full min-h-[217px]">
            {/* <Image
              src="/device.png"
              fill
              className="absolute rotate-90 w-full h-full object-contain"
              alt="device"
            /> */}
            <div className="absolute bg-[#f3ecee] w-full h-full top-0 left-0 z-[-1]"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainInfo;
