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

const Home = async () => {
  console.log('started getting index page data');
  const indexPageData = await getPageData('index');
  console.log('finished getting index page data');
  console.log('started getting cta block data');
  const ctaBlockData = await getComponentData('cta-block');
  console.log('finished getting cta block data');
  console.log('started getting pre footer card data');
  const preFooterCardData = await getComponentData('pre-footer-card');
  console.log('finished getting pre footer card data');
  console.log('started getting footer data');
  const footerData = await getComponentData('footer');
  console.log('finished getting footer data');

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
