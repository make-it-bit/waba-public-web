"use client";

import React from "react";

import {
  AboutScienceHero,
  Origins,
  TextImage,
  Sustainability,
  Trust,
  Difference,
  CTABlock,
  PreFooterCard,
  Footer,
} from "../../page-components";

import { ScrollingBar } from "../../components";

const AboutUs = () => {
  return (
    <>
      <AboutScienceHero
        image="/about-us-hero-img.png"
        title="The Story of WABA"
        content="Our brand was born from the vision of diverse minds encompassing science, engineering, and design. We noticed a void in the beauty industry—a discrepancy between extravagant claims and the actual capabilities of products, fuelled by a web of misleading information and promises. With an unwavering passion for truth, we set out to bridge this gap and provide you with products that deliver real results."
      />
      <Origins />
      <TextImage
        title="Bringing Truth and Clarity to the Market"
        content="In an industry rife with exaggerated claims and misleading information, we take pride in being the torchbearers of the truth. Our dedication to transparency is exemplified by our willingness to share every detail about our products, from technology to proven benefits. Through rigorous development and testing, conducted in collaboration with pioneering experts, we ensure the effectiveness and safety of WABA's devices. We continuously strive to improve and introduce new solutions to the market."
        image="/about-us-img.png"
        imageSide="right"
      />
      <Sustainability />
      <TextImage
        title="People from Different Countries, United by a Purpose"
        content="Our diverse team hails from various backgrounds, cultures, and expertise, all united by a common goal—to offer you the best devices on the market. This international collaboration empowers us to blend knowledge and skills from around the world, leading to products that embody true global innovation."
        image="/careers-at-waba-hero-img.png"
        imageSide="left"
      />
      <Trust />
      <Difference />
      <ScrollingBar />
      <CTABlock />
      <PreFooterCard />
      <Footer />
    </>
  );
};

export default AboutUs;
