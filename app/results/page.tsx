"use client";

import React from "react";

export const dynamic = "force-static";

import {
  ResultsHero,
  Examples,
  ResultsTestimonials,
  ResultsWarranty,
  CTABlock,
  PreFooterCard,
  Footer,
} from "../../page-components";

import { ScrollingBar } from "../../components";

const Results = () => {
  return (
    <>
      <ResultsHero />
      <Examples />
      <ResultsTestimonials />
      <ResultsWarranty />
      <ScrollingBar />
      <CTABlock />
      <PreFooterCard />
      <Footer />
    </>
  );
};

export default Results;
