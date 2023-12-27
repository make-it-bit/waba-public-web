'use client';

import React from 'react';

import { getImageFullUrl } from '../../../lib/strapi';

import { FoundationCard } from '../../../components';

import styles from './_trust.module.scss';

const Trust = ({ trustData }) => {
  console.log('trustData: ', trustData.reason_1);
  return (
    <div className={styles.background}>
      <div className="container">
        <div className="flex flex-col">
          <div className="grid grid-cols-12">
            <div className="sm:col-start-4 col-start-1 sm:col-span-6 col-span-12 text-center sm:mt-160 mt-72 sm:mb-72 mb-32">
              <div className="flex flex-col gap-24">
                <h1 className="font-rufina text-4xl leading-4xl">{trustData.title}</h1>
                <p className="text-sm leading-sm">{trustData.description}</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-12 lg:mb-80 mb-32">
            <div className="col-start-1 lg:col-span-3 col-span-12">
              <FoundationCard
                icon={getImageFullUrl(trustData.reason_1.icon.data)}
                title={trustData.reason_1.title}
                content={trustData.reason_1.description}
                bottomBorder
                paddingMargin="px-48 pt-56 pb-40"
              />
            </div>
            <div className="lg:col-start-4 col-start-1 lg:col-span-3 col-span-12">
              <FoundationCard
                icon={getImageFullUrl(trustData.reason_2.icon.data)}
                title={trustData.reason_2.title}
                content={trustData.reason_2.description}
                leftBorder
                rightBorder
                bottomBorder
                paddingMargin="px-48 pt-56 pb-40"
              />
            </div>
            <div className="lg:col-start-7 col-start-1 lg:col-span-3 col-span-12">
              <FoundationCard
                icon={getImageFullUrl(trustData.reason_3.icon.data)}
                title={trustData.reason_3.title}
                content={trustData.reason_3.description}
                rightBorder
                bottomBorder
                paddingMargin="px-48 pt-56 pb-40"
              />
            </div>
            <div className="lg:col-start-10 col-start-1 lg:col-span-3 col-span-12">
              <FoundationCard
                icon={getImageFullUrl(trustData.reason_4.icon.data)}
                title={trustData.reason_4.title}
                content={trustData.reason_4.description}
                paddingMargin="px-48 pt-56 pb-40"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trust;
