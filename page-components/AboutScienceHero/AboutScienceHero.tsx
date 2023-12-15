import React from "react";
import Image from "next/image";
import classNames from "classnames";

import styles from "./_aboutScienceHero.module.scss";

const AboutScienceHero = ({ image, title, content }) => {
  return (
    <div className="relative">
      <Image
        src={image}
        alt="waba about image"
        fill
        className="absolute w-full h-full left-104 object-cover inset-0 z-[-1]"
      />
      <div
        className={classNames(
          "absolute w-full h-full top-0 left-0 z-[-1]",
          styles.background
        )}
      ></div>
      <div className="container">
        <div className="grid grid-cols-12 pt-456 pb-104">
          <div className="col-start-1 col-span-6">
            <div className="flex flex-col gap-32">
              <h1 className="font-rufina lg:text-7xl text-5xl lg:leading-7xl leading-5xl text-white-100">
                {title}
              </h1>
              <p className="text-sm leading-sm lg:text-left text-center text-supplementary-warm-gray">
                {content}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutScienceHero;
