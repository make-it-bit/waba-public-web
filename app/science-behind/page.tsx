import React from 'react';

import { getImageFullUrl } from '@/lib/strapi';

import { getPageData, getComponentData } from '@/lib/strapi';

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
} from '@/page-components';

export const dynamic = 'force-static';

const ScienceBehind = async () => {
  const sciencePageData = await getPageData('science-behind');
  const ctaBlockData = await getComponentData('cta-block');
  const preFooterCardData = await getComponentData('pre-footer-card');
  const footerData = await getComponentData('footer');

  return (
    <>
      <AboutScienceHero
        title={sciencePageData.attributes.hero.title}
        content={sciencePageData.attributes.hero.description}
        video="/science-behind-video.mp4"
        background="bg-black-100"
      />
      <Skin skinData={sciencePageData.attributes.skin.skins.data} />
      <Photobiomodulation photobiomodulationData={sciencePageData.attributes.photobiomodulation} />
      <Wavelengths wavelengthsData={sciencePageData.attributes.wavelength} />
      <Beam beamData={sciencePageData.attributes.beam} />
      <TextImage
        title={sciencePageData.attributes.text_image.title}
        content={sciencePageData.attributes.text_image.description}
        image={getImageFullUrl(sciencePageData.attributes.text_image.image.data)}
        imageSide="right"
        animation
      />
      <ScienceWarranty warrantyData={sciencePageData.attributes.warranty} />
      <LogoBar />
      <CTABlock ctaBlockData={ctaBlockData.attributes} />
      <PreFooterCard preFooterCardData={preFooterCardData.attributes} />
      <Footer footerData={footerData.attributes} />
    </>
  );
};

export default ScienceBehind;
