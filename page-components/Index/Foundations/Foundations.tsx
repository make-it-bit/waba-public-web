'use client';

import React from 'react';
import Link from 'next/link';

import { FoundationCard } from '@/components';

import { Button } from '@/gui-components/client';

import styles from './_foundations.module.scss';

const Foundations = ({ foundationsData }) => {
  return (
    <div className={styles.background}>
      <div className="container pb-[108px]">
        <div className="flex flex-col md:items-center">
          <div className="grid grid-cols-12">
            <div className="md:col-start-5 col-start-2 md:col-span-4 col-span-10 text-center md:mt-160 mt-72 md:mb-88 mb-40">
              <h1 className="font-rufina sm:text-4xl text-3xl sm:leading-4xl leading-3xl">{foundationsData.title}</h1>
            </div>
          </div>
          <div className="grid grid-cols-12 md:mb-80 mb-40">
            <div className="md:col-span-4 col-span-12">
              <FoundationCard
                foundationCardData={foundationsData.foundation_card_1}
                bottomBorder
                paddingMargin="lg:px-80 md:px-32 px-16 md:py-48 py-40"
                transition
              />
            </div>
            <div className="md:col-span-4 col-span-12">
              <FoundationCard
                foundationCardData={foundationsData.foundation_card_2}
                leftBorder
                rightBorder
                bottomBorder
                paddingMargin="lg:px-80 md:px-32 px-16 md:py-48 py-40"
                transition
              />
            </div>
            <div className="md:col-span-4 col-span-12">
              <FoundationCard
                foundationCardData={foundationsData.foundation_card_3}
                paddingMargin="lg:px-80 md:px-32 px-16 md:py-48 py-40"
                transition
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
