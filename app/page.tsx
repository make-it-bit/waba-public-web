import React from 'react';

import { getComponentData, getPageData } from '@/lib/strapi';

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
} from '@/page-components';

export const dynamic = 'force-static';

export async function generateMetadata({ params: { locale } }) {
  const indexPageData = await getPageData('index');
  return {
    title: indexPageData.attributes.seo.title,
    description: indexPageData.attributes.seo.description,
  };
}

const Home = async () => {
  const indexPageData = await getPageData('index');

  const ctaBlockData = await getComponentData('cta-block');
  const preFooterCardData = await getComponentData('pre-footer-card');
  const footerData = await getComponentData('footer');

  return (
    <>
      <Hero heroData={indexPageData.attributes.hero} />
      <Colors colorsData={indexPageData.attributes.color} />
      <Foundations foundationsData={indexPageData.attributes.foundation} />
      <Video videoData={indexPageData.attributes.peek_inside} />
      <Testimonials testimonialsData={indexPageData.attributes.testimonial} />
      <LogoBar />
      <CTABlock ctaBlockData={ctaBlockData.attributes} />
      <PreFooterCard preFooterCardData={preFooterCardData.attributes} />
      <Footer footerData={footerData.attributes} />
    </>
  );
};

export default Home;
