"use client";

import React, { useState } from "react";
import Image from "next/image";

import { ProductPageNav } from "../../../components";

import Ageing from "./Ageing/Ageing";

const Skin = () => {
  const navbarPages = [<Ageing key={0} />];
  const [pageIndex, setPageIndex] = useState(0);

  const handleClick = (index) => {
    setPageIndex(0);
  };

  return (
    <div className="container">
      <ProductPageNav
        pageIndex={pageIndex}
        navbarItems={["Ageing", "Acne", "Redness", "Dark spots"]}
        handleClick={handleClick}
        justify="justify-center gap-64"
      />
      <div className="grid grid-cols-12">
        <div className="col-start-2 col-span-5">
          <div className="flex flex-col justify-center gap-48 h-full">
            <h1 className="font-rufina text-5xl leading-5xl">
              Our Skin Ages in Two Ways
            </h1>
            <div className="flex flex-col gap-40">
              <div className="flex flex-col gap-16">
                <p className="font-rufina text-2xl leading-2xl">
                  Intrinsic Factors
                </p>
                <p className="text-sm leading-sm">
                  Intrinsic aging is influenced by genetic and biological
                  processes that dictate inherent characteristics of the skin,
                  including thickness and elasticity. As individuals age, the
                  production of essential proteins like collagen and elastin
                  decreases, leading to a loss of skin firmness and the
                  emergence of wrinkles.
                </p>
              </div>
              <div className="border border-black-100"></div>
              <div className="flex flex-col gap-16">
                <p className="font-rufina text-2xl leading-2xl">
                  Extrinsic Factors
                </p>
                <p className="text-sm leading-sm">
                  External factors, known as extrinsic aging factors, notably
                  impact skin aging. Prolonged sun exposure, especially to UV
                  radiation, leads to photoaging with wrinkles and sunspots.
                  Poor nutrition, inadequate hydration, and repetitive facial
                  expressions further contribute to extrinsic aging.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-start-8 col-span-5 my-80">
          <div className="relative w-[526px] h-[554px]">
            <Image
              src="/ageing-img.png"
              alt="ageing image"
              fill
              className="absolute object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skin;
