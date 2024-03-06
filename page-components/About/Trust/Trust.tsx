'use client';

import React from 'react';

import { FoundationCard } from '@/components';

import styles from './_trust.module.scss';

const Trust = ({ trustData }) => {
  return (
    <div className={styles.background}>
      <div className="container">
        <div className="flex flex-col">
          <div className="grid grid-cols-12">
            <div className="lg:col-start-4 md:col-start-3 col-start-1 lg:col-span-6 md:col-span-8 col-span-12 text-center sm:mt-160 mt-72 sm:mb-72 mb-32">
              <div className="flex flex-col gap-24">
                <h1 className="font-rufina md:text-4xl text-3xl md:leading-4xl leading-3xl">{trustData.title}</h1>
                <p className="text-sm leading-sm">{trustData.description}</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-12 lg:mb-80 mb-32">
            <div className="col-start-1 lg:col-span-3 col-span-12">
              <FoundationCard foundationCardData={trustData.reason_1} bottomBorder paddingMargin="px-48 pt-56 pb-40" />
            </div>
            <div className="lg:col-start-4 col-start-1 lg:col-span-3 col-span-12">
              <FoundationCard
                foundationCardData={trustData.reason_2}
                leftBorder
                rightBorder
                bottomBorder
                paddingMargin="px-48 pt-56 pb-40"
              />
            </div>
            <div className="lg:col-start-7 col-start-1 lg:col-span-3 col-span-12">
              <FoundationCard
                foundationCardData={trustData.reason_3}
                rightBorder
                bottomBorder
                paddingMargin="px-48 pt-56 pb-40"
              />
            </div>
            <div className="lg:col-start-10 col-start-1 lg:col-span-3 col-span-12">
              <FoundationCard foundationCardData={trustData.reason_4} paddingMargin="px-48 pt-56 pb-40" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trust;
