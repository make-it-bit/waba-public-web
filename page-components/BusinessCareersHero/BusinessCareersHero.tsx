"use client";

import React from "react";
import Image from "next/image";
import classNames from "classnames";

import { Form } from "../../components";

import styles from "./_businessCareersHero.module.scss";

const BusinessCareersHero = ({ title, content, formTitle, formContent }) => {
  return (
    <div className={classNames("relative", styles.background)}>
      <Image
        src="/waba-for-business-hero-img.png"
        alt="Waba for Business"
        fill
        className="absolute w-full h-full object-cover inset-0 z-[-1]"
      />
      <div className="container">
        <div className="grid grid-cols-12 text-white-100 pt-192 pb-464">
          <div className="col-start-2 col-span-4">
            <div className="flex items-end h-full">
              <h1 className="font-rufina text-7xl leading-7xl">{title}</h1>
            </div>
          </div>
          <div className="col-start-7 col-span-5">
            <div className="flex items-end h-full">
              <p className="text-sm leading-sm">{content}</p>
            </div>
          </div>
        </div>
      </div>
      <Form title={formTitle} content={formContent} />
    </div>
  );
};

export default BusinessCareersHero;
