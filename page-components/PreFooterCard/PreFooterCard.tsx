import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import classNames from 'classnames';

import { getImageFullUrl } from '@/lib/strapi';

import { Button } from '@/gui-components/client';

import styles from './_preFooterCard.module.scss';

const PreFooterCard = ({ preFooterCardData }) => {
  const { pre_footer_card_1, pre_footer_card_2 } = preFooterCardData;

  return (
    <div className="container relative z-10 md:mb-[-64px] mb-[-48px]">
      <div className="grid grid-cols-12 gap-24">
        <div className="lg:col-span-6 col-span-12">
          <div className="flex h-full">
            <div className="relative flex flex-col justify-end w-full min-h-[522px] p-64">
              <Image
                src={getImageFullUrl(pre_footer_card_1.background_image.data)}
                fill
                className="absolute w-full h-full object-cover object-right inset-0 z-[-1]"
                alt="pre-footer image"
              />
              <div className={classNames('absolute w-full h-full top-0 left-0 z-[-1]', styles.background)}></div>
              <h1 className="font-rufina text-3xl leading-3xl text-white-100">{pre_footer_card_1.title}</h1>
              <p className="text-sm leading-sm text-white-100 mt-24 mb-40">{pre_footer_card_1.description}</p>
              <div>
                <Link href={pre_footer_card_1.button.href_src}>
                  <Button CTA={pre_footer_card_1.button.href_text} svg />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:col-span-6 col-span-12">
          <div className="flex h-full">
            <div className="relative flex flex-col justify-end w-full min-h-[522px] p-64">
              <Image
                src={getImageFullUrl(pre_footer_card_2.background_image.data)}
                fill
                className="absolute w-full h-full object-cover inset-0 z-[-1]"
                alt="pre-footer image"
              />
              <div className={classNames('absolute w-full h-full top-0 left-0 z-[-1]', styles.background)}></div>
              <h1 className="font-rufina text-3xl leading-3xl text-white-100">{pre_footer_card_2.title}</h1>
              <p className="text-sm leading-sm text-white-100 mt-24 mb-40">{pre_footer_card_2.description}</p>
              <div>
                <Link href={pre_footer_card_2.button.href_src}>
                  <Button CTA={pre_footer_card_2.button.href_text} svg />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreFooterCard;
