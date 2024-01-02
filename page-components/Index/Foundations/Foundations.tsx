'use client';

import React from 'react';
import Link from 'next/link';

import { getImageFullUrl } from '@/lib/strapi';

import { FoundationCard } from '@/components';

import { Button } from '@/gui-components/client';

import styles from './_foundations.module.scss';

const Foundations = ({ foundationsData }) => {
  return (
    <div className={styles.background}>
      <div className="container pb-[108px]">
        <div className="flex flex-col md:items-center">
          <div className="grid grid-cols-12">
            <div className="md:col-start-5 col-start-2 md:col-span-4 col-span-10 text-center md:mt-160 mt-72 md:mb-144 mb-40">
              <h1 className="font-rufina sm:text-4xl text-3xl sm:leading-4xl leading-3xl">{foundationsData.title}</h1>
            </div>
          </div>
          <div className="grid grid-cols-12 md:mb-80 mb-40">
            <div className="col-start-1 md:col-span-4 col-span-12">
              <FoundationCard
                icon={getImageFullUrl(foundationsData.foundation_card_1.icon.data)}
                title={foundationsData.foundation_card_1.title}
                content={foundationsData.foundation_card_1.description}
                bottomBorder
                paddingMargin="md:px-80 px-16 md:py-48 py-40"
              />
            </div>
            <div className="md:col-start-5 col-start-1 md:col-span-4 col-span-12">
              <FoundationCard
                icon="/icons/effective.svg"
                title={foundationsData.foundation_card_2.title}
                content={foundationsData.foundation_card_2.description}
                leftBorder
                rightBorder
                bottomBorder
                paddingMargin="md:px-80 px-16 md:py-48 py-40"
              />
            </div>
            <div className="md:col-start-9 col-start-1 md:col-span-4 col-span-12">
              <FoundationCard
                icon="/icons/safe.svg"
                title={foundationsData.foundation_card_3.title}
                content={foundationsData.foundation_card_3.description}
                paddingMargin="md:px-80 px-16 md:py-48 py-40"
              />
            </div>
          </div>
          <Link href={foundationsData.button.href_src} className="contents justify-center">
            <Button CTA={foundationsData.button.href_text} svg />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Foundations;
