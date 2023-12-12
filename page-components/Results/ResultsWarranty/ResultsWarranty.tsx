import React from "react";
import Image from "next/image";
import classNames from "classnames";

import styles from "./_resultsWarranty.module.scss";

const ResultsWarranty = () => {
  return (
    <div className="py-72">
      <div className="container">
        <div className="grid grid-cols-12">
          <div className="col-start-1 col-span-12">
            <div
              className={classNames(
                "relative flex items-center w-full min-h-[577px] z-10 overflow-hidden",
                styles.background
              )}
            >
              <video
                autoPlay
                muted
                loop
                className="absolute left-[-400px] w-full h-full object-cover inset-0 mix-blend-lighten z-[-1]"
              >
                <source src="/warranty-video.mp4" type="video/mp4" />
              </video>
              <div className="grid grid-cols-12">
                <div className="col-start-7 col-span-5">
                  <div className="flex flex-col gap-16">
                    <h1 className="font-rufina text-3xl leading-3xl text-white-100">
                      "Six months with WABA and I've rediscovered my reflection,
                      finding freedom in my skin. Each session is a step toward
                      liberation, leaving me and my reflection in a love that
                      grows deeper every day."
                    </h1>
                    <p className="text-sm leading-sm text-white-100">
                      - Sarah, 62
                    </p>
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

export default ResultsWarranty;
