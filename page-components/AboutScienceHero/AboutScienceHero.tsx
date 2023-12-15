import React from "react";
import Image from "next/image";
import classNames from "classnames";

import styles from "./_aboutScienceHero.module.scss";

const AboutScienceHero = ({
  title,
  content,
  image = null,
  video = null,
  background = null,
}) => {
  return (
    <div
      className={classNames(
        "relative overflow-hidden",
        background && background
      )}
    >
      {image && (
        <>
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
        </>
      )}
      {video && (
        <video
          autoPlay
          muted
          loop
          className="absolute top-0 right-[-184px] w-full h-full object-cover mix-blend-difference rotate-[75deg]"
        >
          <source src={video} type="video/mp4" />
        </video>
      )}
      <div className="container relative">
        <div className="grid grid-cols-12 pt-456 pb-104">
          <div className="col-start-1 col-span-6">
            <div className="flex flex-col gap-32">
              <h1 className="font-rufina lg:text-7xl text-5xl lg:leading-7xl leading-5xl text-white-100">
                {title}
              </h1>
              <p className="text-sm leading-sm text-supplementary-warm-gray">
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
