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
        "relative h-screen overflow-hidden",
        styles.background
      )}
    >
      <video
        autoPlay
        muted
        loop
        className={classNames("absolute top-0 left-216", styles.video)}
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>
      <div className="container">
        <div className="grid grid-cols-12">
          <div className="col-start-1 col-end-7 flex flex-col mt-248 mb-104">
            <div>
              <h1 className="text-7xl mb-32 font-rufina">
                Discover Liberating Beauty
              </h1>
              <h2 className="text-base ">
                Our innovative light-based device is more than just a skincare
                solution. It's a gateway to a freer, more confident you.
              </h2>
            </div>
            <div className="flex mt-48 mb-88 gap-8">
              <Button CTA="Shop now" onClick={() => router.push("#")} />
              <Button
                CTA="Learn more"
                style="secondary"
                onClick={() => router.push("#")}
                svg={false}
              />
            </div>
            <div className="flex gap-8">
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
