"use client";

import React from "react";
import Image from "next/image";
import classNames from "classnames";

import { Button } from "../../../gui-components/client";

import { Tag } from "../../../components";

import styles from "./_mainInfo.module.scss";

const MainInfo = () => {
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
            <h1 className="font-rufina text-4xl leading-4xl">WABA Eclatia</h1>
            <h2 className="text-2xl leading-2xl">1195€</h2>
            <p className="text-sm leading-sm mt-32 mb-40">
              WABA Eclactia is designed to unlock the secrets to a flawless
              complexion. Meticulously crafted to harness the power of light
              therapy, it stands at the intersection of science and beauty,
              offering a non-invasive, gentle yet potent treatment that caters
              to a diverse array of skin concerns. With each use, you'll
              experience the meticulous care of advanced technology working to
              rejuvenate, restore, and revitalize your skin, unveiling a
              healthier, more radiant you. Whether you're looking to smooth out
              fine lines, even out your skin tone, or give your skin the deep
              nourishment it craves, WABA Eclactia is your partner in achieving
              the luminous skin you deserve.
            </p>
            <div className={classNames("flex flex-wrap gap-16", styles.button)}>
              <div className="flex flex-col items-center gap-8 lg:w-auto w-full">
                <Button CTA="Checkout now" onClick={() => {}} svg />
                <div className="flex gap-2">
                  <p className="text-xs leading-xs">powered by</p>
                  <Image
                    src="/logos/stripe.svg"
                    width={35}
                    height={21}
                    alt="stripe"
                  />
                </div>
              </div>
              <div className="flex flex-col items-center gap-8 lg:w-auto w-full">
                <Button
                  CTA="Buy Now Pay Later"
                  style="tertiary"
                  onClick={() => {}}
                  svg
                />
                <div className="flex gap-2">
                  <p className="text-xs leading-xs">powered by</p>
                  <Image
                    src="/logos/klarna.svg"
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
