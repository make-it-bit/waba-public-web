"use client";

import React from "react";
import { useRouter } from "next/navigation";
import classNames from "classnames";

import { Tag } from "../../../components";

import { Button } from "../../../gui-components/client";

import styles from "./_hero.module.scss";

const Hero = () => {
  const router = useRouter();

  return (
    <div
      className={classNames(
        "relative min-h-screen overflow-hidden",
        styles.background
      )}
    >
      <div className="container">
        <video
          autoPlay
          muted
          loop
          className="absolute lg:top-0 top-400 lg:left-248 left-0 w-full h-full object-cover mix-blend-darken lg:z-[-1]"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
        <div className="lg:grid grid-cols-12">
          <div className="col-start-1 col-end-7 flex flex-col lg:items-start items-center lg:text-left text-center lg:mt-248 mt-56 mb-104">
            <div>
              <h1 className="font-rufina lg:text-7xl text-5xl lg:leading-7xl leading-5xl mb-32">
                Discover Liberating Beauty
              </h1>
              <h2 className="text-base leading-base">
                Our innovative light-based device is more than just a skincare
                solution.
              </h2>
              <h2 className="text-base leading-base">
                It's a gateway to a freer, more confident you.
              </h2>
            </div>
            <div className="flex lg:mt-48 lg:mb-88 my-40 gap-8">
              <Button CTA="Shop now" onClick={() => router.push("#")} />
              <Button
                CTA="Learn more"
                style="secondary"
                onClick={() => router.push("#")}
                svg={false}
              />
            </div>
            <div className="flex lg:justify-start justify-center flex-wrap gap-8">
              <Tag text="Made in EU" svg />
              <Tag text="CE Certified" />
              <Tag text="2-year warranty" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
