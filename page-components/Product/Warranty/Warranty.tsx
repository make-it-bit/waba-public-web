import React from "react";
import Image from "next/image";
import classNames from "classnames";

import styles from "./_warranty.module.scss";

const Warranty = () => {
  return (
    <div className={classNames("py-72", styles.background)}>
      <div className="container">
        <div className="grid grid-cols-12">
          <div className="col-start-1 col-span-12">
            <div className="relative flex items-center w-full min-h-[577px] z-10">
              <Image
                src="/product-warranty-img.png"
                fill
                className="absolute w-full h-full object-cover inset-0 z-[-1]"
                alt="product warranty image"
              />
              <div className="grid grid-cols-12">
                <div className="col-start-7 col-span-5">
                  <div className="flex flex-col gap-40">
                    <Image
                      src="/icons/warranty.svg"
                      alt="warranty"
                      width={102}
                      height={102}
                    />
                    <div>
                      <h1 className="font-rufina text-4xl leading-4xl text-white-100 mb-16">
                        Confidence in Quality
                      </h1>
                      <p className="text-sm leading-sm text-white-100">
                        Commit to your skin's health with absolute peace of
                        mind. Every purchase is protected by a 2-year warranty,
                        ensuring that your journey towards radiant skin is
                        accompanied by our unwavering support.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Warranty;
