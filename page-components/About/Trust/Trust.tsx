"use client";

import React from "react";

import { FoundationCard } from "../../../components";

import styles from "./_trust.module.scss";

const Trust = () => {
  return (
    <div className={styles.background}>
      <div className="container">
        <div className="flex flex-col">
          <div className="grid grid-cols-12">
            <div className="col-start-4 col-span-6 text-center mt-160 mb-72">
              <div className="flex flex-col gap-24"></div>
              <h1 className="font-rufina text-4xl leading-4xl">
                Why Trust WABA?
              </h1>
              <p className="text-sm leading-sm">
                We understand that trust is earned, and we are committed to
                earning yours. Our values shine through every aspect of WABA's
                brand and products.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-12 mb-80">
            <div className="col-start-1 col-span-3">
              <FoundationCard
                icon="/icons/integrity.svg"
                title="Intergity & Accountability"
                content="WABA's devices are backed by scientific research and out-of-this-world results. We under promise and over deliver our promises offering products that have been thoroughly tested and validated for their effectiveness."
                paddingMargin="px-48 pt-56 pb-40"
              />
            </div>
            <div className="col-start-4 col-span-3">
              <FoundationCard
                icon="/icons/innovation.svg"
                title="Innovation"
                content="Our team is a melting pot of diverse talents, cultures, and perspectives, enriching our innovation. Every aspect of our devices has been developed in-house within the EU, setting us apart from other manufacturers."
                leftBorder
                rightBorder
                paddingMargin="px-48 pt-56 pb-40"
              />
            </div>
            <div className="col-start-7 col-span-3">
              <FoundationCard
                icon="/icons/feather.svg"
                title="Sustainability"
                content="As advocates of sustainability, we aim to make a positive impact on the environment while creating products that enhance your life. By choosing WABA, you become a part of a larger movement towards a greener future."
                rightBorder
                paddingMargin="px-48 pt-56 pb-40"
              />
            </div>
            <div className="col-start-10 col-span-3">
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
