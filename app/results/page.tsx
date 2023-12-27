import React from 'react';

import { getPageData, getComponentData } from '../../lib/strapi';

export const dynamic = 'force-static';

import {
  ResultsHero,
  Examples,
  ResultsTestimonials,
  ResultsWarranty,
  LogoBar,
  CTABlock,
  PreFooterCard,
  Footer,
} from '../../page-components';

const Results = async () => {
  const resultsPageData = await getPageData('result');
  const ctaBlockData = await getComponentData('cta-block');
  const preFooterCardData = await getComponentData('pre-footer-card');
  const footerData = await getComponentData('footer');

  return (
    <>
      <ResultsHero resultsHeroData={resultsPageData.attributes.hero} />
      <Examples examplesData={resultsPageData.attributes.example} />
      <ResultsTestimonials testimonialsData={resultsPageData.attributes.testimonial} />
      <ResultsWarranty warrantyData={resultsPageData.attributes.warranty} />
      <LogoBar />
      <CTABlock ctaBlockData={ctaBlockData.attributes} />
      <PreFooterCard preFooterCardData={preFooterCardData.attributes} />
      <Footer footerData={footerData.attributes} />
    </>
  );
};

export default Results;
