import React from 'react';

import { getPageData, getComponentData } from '@/lib/strapi';

import {
  ResultsHero,
  Examples,
  ResultsTestimonials,
  ResultsWarranty,
  LogoBar,
  CTABlock,
  PreFooterCard,
  Footer,
} from '@/page-components';

export const dynamic = 'force-static';

export async function generateMetadata() {
  const resultsPageData = await getPageData('result');
  return {
    title: resultsPageData.attributes.seo.title,
    description: resultsPageData.attributes.seo.description,
    alternates: {
      canonical: '/results',
    },
    openGraph: {
      images: [
        `/api/og?title=${resultsPageData.attributes.seo.title}&desc=${resultsPageData.attributes.seo.description}` ||
          null,
      ],
    },
  };
}

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
