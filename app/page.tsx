"use client";

import React from "react";

export const dynamic = "force-static";

import {
  Hero,
  Colors,
  Foundations,
  Video,
  Testimonials,
  CTABlock,
  PreFooterCard,
  Footer,
} from "../page-components";

import { ScrollingBar } from "../components";

const Home = () => {
  return (
    <>
      <Hero />
      <Colors />
      <Foundations />
      <Video />
      <Testimonials />
      <ScrollingBar />
      <CTABlock />
      <PreFooterCard />
      <Footer mt />
    </>
  );
};

export default Home;
