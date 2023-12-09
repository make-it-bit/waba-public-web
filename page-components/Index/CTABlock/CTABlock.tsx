"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { Button } from "../../../gui-components/client";

const CTABlock = () => {
  const router = useRouter();

  return (
    <div className="container relative">
      <Image
        src="/device-upside.png"
        alt="device"
        width={196}
        height={308}
        className="absolute top-0 left-1/2 translate-x-neg-1/2"
      />
      <div className="grid grid-cols-12">
        <div className="col-start-3 col-span-8">
          <div className="flex flex-col justify-center text-center mt-360 mb-80 gap-56">
            <h1 className="font-rufina text-7xl leading-7xl">
              Begin Your Journey to Flawless Skin
            </h1>
            <div className="flex justify-center">
              <Button
                CTA="Shop now"
                onClick={() => {
                  router.push("#");
                }}
                svg
              />
            </div>
            <div className="border border-black-100"></div>
            <div className="flex">
              <div className="flex flex-col grow-1 gap-8 text-left">
                <p className="font-rufina text-xl leading-xl">
                  Already have another LED device?
                </p>
                <p className="text-sm leading-sm">
                  Apply for a trade-in and save up to $500 on your purchase
                </p>
              </div>
              <div className="flex items-center">
                <Button
                  CTA="Apply now"
                  style="secondary"
                  onClick={() => {
                    router.push("#");
                  }}
                  svg
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTABlock;
