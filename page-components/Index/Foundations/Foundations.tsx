'use client';

import React from 'react';
import Link from 'next/link';

import { getImageFullUrl } from '../../../lib/strapi';

import { FoundationCard } from '../../../components';

import { Button } from '../../../gui-components/client';

import styles from './_foundations.module.scss';

const Foundations = ({ foundationsData }) => {
  return (
    <div className={styles.background}>
      <div className="container">
        <div className="flex flex-col">
          <div className="grid grid-cols-12">
            <div className="col-start-5 col-span-4 text-center mt-160 mb-144">
              <h1 className="font-rufina text-4xl leading-4xl">{foundationsData.title}</h1>
            </div>
          </div>
          <div className="grid grid-cols-12 mb-80">
            <div className="col-start-1 col-span-4">
              <FoundationCard
                icon={getImageFullUrl(foundationsData.foundation_card_1.icon.data)}
                title={foundationsData.foundation_card_1.title}
                content={foundationsData.foundation_card_1.description}
                paddingMargin="px-80 py-48"
              />
            </div>
            <div className="col-start-5 col-span-4">
              <FoundationCard
                icon="/icons/effective.svg"
                title={foundationsData.foundation_card_2.title}
                content={foundationsData.foundation_card_2.description}
                leftBorder
                rightBorder
                paddingMargin="px-80 py-48"
              />
            </div>
            <div className="col-start-9 col-span-4">
              <FoundationCard
                icon="/icons/safe.svg"
                title={foundationsData.foundation_card_3.title}
                content={foundationsData.foundation_card_3.description}
                paddingMargin="px-80 py-48"
              />
            </div>
          </div>
          <div className="flex justify-center mb-[108px]">
            <Link href={foundationsData.button.href_src}>
              <Button CTA={foundationsData.button.href_text} svg />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Foundations;
