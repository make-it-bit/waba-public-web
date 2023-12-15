import React from "react";

export const dynamic = "force-static";

import {
  ResultsHero,
  Examples,
  ResultsTestimonials,
  ResultsWarranty,
  LogoBar,
  CTABlock,
  PreFooterCard,
  Footer,
} from "../../page-components";

const Results = () => {
  return (
    <>
      <ResultsHero />
      <Examples />
      <ResultsTestimonials />
      <ResultsWarranty />
      <LogoBar />
      <CTABlock />
      <PreFooterCard />
      <Footer />
    </>
  );
};

export default Results;
