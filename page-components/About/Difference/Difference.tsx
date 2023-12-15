"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import classNames from "classnames";

import { Button } from "../../../gui-components/client";

import styles from "./_difference.module.scss";

const Difference = () => {
  const router = useRouter();

  return (
    <div className={classNames("relative", styles.background)}>
      <div className="container">
        <div className="grid grid-cols-12">
          <div className="col-start-2 col-span-5">
            <div className="flex flex-col gap-24 mt-392 mb-184">
              <h1 className="font-rufina text-5xl leading-5xl text-white-100">
                Embrace the WABA Difference
              </h1>
              <p className="text-sm leading-sm text-supplementary-warm-gray">
                When you choose WABA, you choose authenticity, sustainability,
                and innovation. Our devices are not merely products; they are
                symbols of our commitment to a better world and your well-being.
              </p>
              <p className="text-sm leading-sm text-supplementary-warm-gray">
                Join us on this journey towards a brighter and more sustainable
                future. Let WABA's devices illuminate your life with truth,
                embrace change, and make a positive impact.
              </p>
              <div className="flex mt-16">
                <Button
                  CTA="Choose WABA Today"
                  style="tertiary"
                  onClick={() => router.push("#")}
                  svg
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Image
        src="/about-us-device-img.png"
        alt="device"
        width={1038}
        height={585}
        className="absolute top-0 right-0"
      />
    </div>
  );
};

export default Difference;
