'use client';

import React from 'react';

import { FoundationCard } from '../../../components';

import styles from './_trust.module.scss';

const Trust = () => {
  return (
    <div className={styles.background}>
      <div className="container">
        <div className="flex flex-col">
          <div className="grid grid-cols-12">
            <div className="sm:col-start-4 col-start-1 sm:col-span-6 col-span-12 text-center sm:mt-160 mt-72 sm:mb-72 mb-32">
              <div className="flex flex-col gap-24">
                <h1 className="font-rufina text-4xl leading-4xl">Why Trust WABA?</h1>
                <p className="text-sm leading-sm">
                  We understand that trust is earned, and we are committed to earning yours. Our values shine through
                  every aspect of WABA's brand and products.
                </p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-12 lg:mb-80 mb-32">
            <div className="col-start-1 lg:col-span-3 col-span-12">
              <FoundationCard
                icon="/icons/integrity.svg"
                title="Intergity & Accountability"
                content="WABA's devices are backed by scientific research and out-of-this-world results. We under promise and over deliver our promises offering products that have been thoroughly tested and validated for their effectiveness."
                bottomBorder
                paddingMargin="px-48 pt-56 pb-40"
              />
            </div>
            <div className="lg:col-start-4 col-start-1 lg:col-span-3 col-span-12">
              <FoundationCard
                icon="/icons/innovation.svg"
                title="Innovation"
                content="Our team is a melting pot of diverse talents, cultures, and perspectives, enriching our innovation. Every aspect of our devices has been developed in-house within the EU, setting us apart from other manufacturers."
                leftBorder
                rightBorder
                bottomBorder
                paddingMargin="px-48 pt-56 pb-40"
              />
            </div>
            <div className="lg:col-start-7 col-start-1 lg:col-span-3 col-span-12">
              <FoundationCard
                icon="/icons/feather.svg"
                title="Sustainability"
                content="As advocates of sustainability, we aim to make a positive impact on the environment while creating products that enhance your life. By choosing WABA, you become a part of a larger movement towards a greener future."
                rightBorder
                bottomBorder
                paddingMargin="px-48 pt-56 pb-40"
              />
            </div>
            <div className="lg:col-start-10 col-start-1 lg:col-span-3 col-span-12">
              <FoundationCard
                icon="/icons/diamond.svg"
                title="Customer Satisfaction"
                content="Your satisfaction is our priority. We are dedicated to providing exceptional customer service, addressing your queries and concerns promptly, and ensuring a seamless experience with WABA."
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
