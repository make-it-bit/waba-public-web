import React from 'react';

/* import { getPageData } from '../../lib/strapi'; */

import {
  AboutScienceHero,
  Skin,
  Photobiomodulation,
  Wavelengths,
  Beam,
  TextImage,
  ScienceWarranty,
  LogoBar,
  CTABlock,
  PreFooterCard,
  Footer,
} from '../../page-components';

const ScienceBehind = async () => {
  /* const scienceBehindPageData = await getPageData('science-behind'); */

  return (
    <>
      <AboutScienceHero
        title="The Science Behind"
        content="Explore the rigorous science that elevates WABA's skincare solutions, meticulously designed for tangible results and healthier skin. Discover how our devotion to research and development leads to superior products that do more than promise—they perform. Join us on an enlightening journey into the core of skincare science, where clarity meets efficacy."
        video="/science-behind-video.mp4"
        background="bg-black-100"
      />
      <Skin />
      <Photobiomodulation />
      <Wavelengths />
      <Beam />
      <TextImage
        title="3 changeable heads"
        content="WABA Eclatia is the only handheld device where the user can choose between using single wavelength or several together, catering to a wide variety of skin concerns one might encounter. It also gives the freedom to do targeted, accurate treatments at different locations on the body."
        image="/careers-at-waba-hero-img.png"
        imageSide="right"
      />
      <ScienceWarranty />
      <LogoBar />
      <CTABlock />
      <PreFooterCard />
      <Footer />
    </>
  );
};

export default ScienceBehind;
