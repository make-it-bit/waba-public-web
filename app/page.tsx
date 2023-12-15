import React from "react";

export const dynamic = "force-static";

import {
  Hero,
  Colors,
  Foundations,
  Video,
  Testimonials,
  LogoBar,
  CTABlock,
  PreFooterCard,
  Footer,
} from "../page-components";

const Home = () => {
  return (
    <>
      <Hero />
      <Colors />
      <Foundations />
      <Video />
      <Testimonials />
      <LogoBar />
      <CTABlock />
      <PreFooterCard />
      <Footer />
    </>
  );
};

export default Home;
