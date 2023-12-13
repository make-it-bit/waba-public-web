import React from "react";
import Image from "next/image";
import classNames from "classnames";

import styles from "./_businessCareersHero.module.scss";

const BusinessCareersHero = ({ image, title, content }) => {
  return (
    <div className={classNames("relative z-10", styles.background)}>
      <Image
        src={image}
        alt="waba business-careers image"
        fill
        className="absolute w-full h-full object-cover inset-0 z-[-1]"
      />
      <div className="container">
        <div className="grid grid-cols-12 md:grid-flow-col grid-flow-row gap-y-24 text-white-100 md:pt-192 md:pb-464 py-104">
          <div className="md:col-start-2 col-start-1 md:col-span-4 col-span-12">
            <div className="flex md:justify-start justify-center md:items-end h-full">
              <h1 className="font-rufina md:text-7xl text-5xl md:leading-7xl leading-5xl">
                {title}
              </h1>
            </div>
          </div>
          <div className="md:col-start-7 col-start-1 md:col-span-5 col-span-12">
            <div className="flex md:items-end h-full">
              <p className="text-sm leading-sm md:text-left text-center">
                {content}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessCareersHero;
