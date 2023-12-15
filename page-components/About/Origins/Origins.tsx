import React from "react";
import Image from "next/image";

const Origins = () => {
  return (
    <div className="relative bg-supplementary-warm-gray overflow-hidden">
      <div className="container">
        <div className="grid grid-cols-12">
          <div className="col-start-4 col-span-6">
            <div className="flex flex-col gap-32 text-center px-48 my-280">
              <h1 className="font-rufina text-5xl leading-5xl">
                The Origins of WABA
              </h1>
              <p className="text-base leading-base">
                The name "WABA" originates from the Estonian word "vaba," which
                translates to "free." This embodies our brand ideology of
                granting people freedom from various skin concerns, ultimately
                empowering them to feel liberated. Originally conceived in
                Switzerland, the pharma and medical capital of the world, WABA
                has now found its home in Tallinn, Estonia, the hub of
                innovative developments in EU.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Image
        src="/device.png"
        alt="device"
        width={1440}
        height={830}
        className="absolute top-328 right-56"
      />
    </div>
  );
};

export default Origins;
