import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '../../gui-components/client';

const CTABlock = ({ ctaBlockData }) => {
  return (
    <div className="container relative">
      <Image
        src="/device-upside.png"
        alt="device"
        width={196}
        height={308}
        className="absolute top-0 left-1/2 translate-x-neg-1/2"
      />
      <div className="grid grid-cols-12">
        <div className="md:col-start-3 col-start-1 md:col-span-8 col-span-12">
          <div className="flex flex-col gap-56 justify-center md:items-center text-center mt-360 md:mb-80 mb-72">
            <h1 className="font-rufina md:text-7xl text-5xl md:leading-7xl leading-5xl">{ctaBlockData.title}</h1>
            <Link href={ctaBlockData.button_1.href_src} className="md:flex contents justify-center">
              <Button CTA={ctaBlockData.button_1.href_text} svg />
            </Link>
            <div className="border border-black-20"></div>
            <div className="flex md:flex-row flex-col gap-y-16">
              <div className="flex flex-col grow-1 md:text-left text-center gap-8">
                <p className="font-rufina text-xl leading-xl">{ctaBlockData.trade_in_line_1}</p>
                <p className="text-sm leading-sm text-black-80">{ctaBlockData.trade_in_line_2}</p>
              </div>
              <Link href={ctaBlockData.button_2.href_src} className="md:flex justify-center items-center contents">
                <Button CTA={ctaBlockData.button_2.href_text} style="secondary" svg />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTABlock;
