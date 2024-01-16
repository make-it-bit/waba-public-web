import React from 'react';

import { getImageFullUrl } from '@/lib/getImgFullUrl';

import { getPageData, getComponentData } from '@/lib/strapi';

import {
  AboutScienceHero,
  Origins,
  TextImage,
  Sustainability,
  Trust,
  Difference,
  LogoBar,
  CTABlock,
  PreFooterCard,
  Footer,
} from '@/page-components';

export const dynamic = 'force-static';

const AboutUs = async () => {
  const aboutPageData = await getPageData('about-us');
  const ctaBlockData = await getComponentData('cta-block');
  const preFooterCardData = await getComponentData('pre-footer-card');
  const footerData = await getComponentData('footer');

  return (
    <>
      <AboutScienceHero
        title={aboutPageData.attributes.hero.title}
        content={aboutPageData.attributes.hero.description}
        image={getImageFullUrl(aboutPageData.attributes.hero.background_image.data)}
      />
      <Origins originData={aboutPageData.attributes.origin} />
      <TextImage
        title={aboutPageData.attributes.text_image_1.title}
        content={aboutPageData.attributes.text_image_1.description}
        image={getImageFullUrl(aboutPageData.attributes.text_image_1.image.data)}
        imageSide="right"
      />
      <Sustainability sustainabilityData={aboutPageData.attributes.sustainability} />
      <TextImage
        title={aboutPageData.attributes.text_image_2.title}
        content={aboutPageData.attributes.text_image_2.description}
        image={getImageFullUrl(aboutPageData.attributes.text_image_2.image.data)}
        imageSide="left"
      />
      <Trust trustData={aboutPageData.attributes.trust} />
      <Difference differenceData={aboutPageData.attributes.difference} />
      <LogoBar />
      <CTABlock ctaBlockData={ctaBlockData.attributes} />
      <PreFooterCard preFooterCardData={preFooterCardData.attributes} />
      <Footer footerData={footerData.attributes} />
    </>
  );
};

export default AboutUs;
