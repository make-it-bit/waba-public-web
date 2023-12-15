import React from "react";
import Image from "next/image";
import classNames from "classnames";

import styles from "./_beam.module.scss";

const Beam = () => {
  return (
    <>
      <div className={classNames("relative", styles.background)}>
        <div className="container">
          <div className="grid grid-cols-12">
            <div className="col-start-7 col-span-5">
              <div className="flex flex-col gap-32 text-right my-288">
                <h1 className="font-rufina text-5xl leading-5xl text-white-100">
                  Beam shaping
                </h1>
                <p className="text-sm leading-sm text-supplementary-warm-gray">
                  Unlike traditional LED devices, our innovation lies in
                  shifting the diffuser's position from the LED directly to the
                  lens. This advanced method not only optimizes the distribution
                  of light across the skin but also maximizes energy efficiency
                  by eliminating waste. With precision engineering, we deliver a
                  targeted treatment, ensuring every photon counts towards your
                  skin's health and vitality. Welcome to the future of light
                  therapy, where every detail is designed for perfection.
                </p>
              </div>
            </div>
          </div>
        </div>
        <video
          autoPlay
          muted
          loop
          className="absolute top-0 left-[-320px] w-full h-full object-cover mix-blend-lighten"
        >
          <source src="/device-beam.mp4" type="video/mp4" />
        </video>
        {/* <Image
          src="/science-behind-device.png"
          alt="device"
          width={416}
          height={228}
          className="absolute bottom-0 left-184"
        /> */}
      </div>
    </>
  );
};

export default Beam;
