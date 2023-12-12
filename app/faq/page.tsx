"use client";

import React, { useState } from "react";

import {
  FaqShipping,
  CTABlock,
  PreFooterCard,
  Footer,
} from "../../page-components";

import { ProductPageNav, ScrollingBar } from "../../components";

const FAQ = () => {
  const navbarPages = [<FaqShipping key={0} />];
  const [pageIndex, setPageIndex] = useState(0);

  const handleClick = (index) => {
    setPageIndex(0);
  };

  return (
    <>
      <div className="bg-supplementary-warm-gray">
        <div className="container">
          <div className="grid grid-cols-12">
            <div className="col-start-3 col-span-8">
              <h1 className="font-rufina text-7xl leading-7xl mt-176 mb-72">
                Questions Are Welcome
              </h1>
              <ProductPageNav
                pageIndex={pageIndex}
                navbarItems={[
                  "Shipping",
                  "Returns & Refunds",
                  "Payments",
                  "Benefits",
                  "Device technical",
                  "Safety",
                ]}
                handleClick={handleClick}
                justify="justify-between"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="grid grid-cols-12">{navbarPages[pageIndex]}</div>
      </div>
      <ScrollingBar />
      <CTABlock />
      <PreFooterCard />
      <Footer />
    </>
  );
};

export default FAQ;
