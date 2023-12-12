import React from "react";
import Image from "next/image";

const ResultsHero = () => {
  return (
    <div className="relative bg-supplementary-warm-gray overflow-hidden">
      <Image
        src="/results-hero-img-1.png"
        alt="results hero image"
        width={305}
        height={336}
        className="absolute top-64 left-0"
      />
      <video
        autoPlay
        muted
        loop
        className="absolute top-416 left-[1172px] w-[306px] h-[322px] object-cover"
      >
        <source src="/results-hero-video-6.mp4" type="video/mp4" />
      </video>
      <div className="absolute top-[661px] left-[732px] w-[196px] h-[218px]">
        <Image
          src="/results-hero-img-4.png"
          alt="results hero image"
          fill
          className="object-cover"
        />
      </div>
      <div className="container">
        <div className="relative grid grid-cols-12">
          <Image
            src="/results-hero-img-2.png"
            alt="results hero image"
            width={306}
            height={392}
            className="absolute bottom-0 left-0"
          />
          <video
            autoPlay
            muted
            loop
            className="absolute top-64 left-1/2 translate-x-neg-1/2 w-[416px] h-[161px] object-cover"
          >
            <source src="/chest-video.mp4" type="video/mp4" />
          </video>
          <video
            autoPlay
            muted
            loop
            className="absolute top-64 right-0 w-[196px] h-[239px] object-cover"
          >
            <source src="/results-hero-video-5.mp4" type="video/mp4" />
          </video>
          <div className="col-start-4 col-span-6">
            <div className="flex flex-col gap-32 pt-288 pb-248 text-center">
              <h1 className="font-rufina text-7xl leading-7xl">
                Visible Results in Just 12 Weeks
              </h1>
              <div className="grid grid-cols-12">
                <div className="col-start-3 col-span-8">
                  <p className="text-base leading-base">
                    Elevate your skincare with WABA and witness a remarkable
                    difference. Experience the change, embrace the glow.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsHero;
