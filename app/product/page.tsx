"use client";

import React from "react";

export const dynamic = "force-static";

import {
  MainInfo,
  ProductInfo,
  Warranty,
  FAQ,
  CTABlock,
  Footer,
} from "../../page-components";

import { ScrollingBar } from "../../components";

const Product = () => {
  return (
    <>
      <MainInfo />
      <ProductInfo />
      <Warranty />
      <FAQ />
      <ScrollingBar />
      <CTABlock />
      <Footer />
    </>
  );
};

export default Product;
