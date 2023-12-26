import React from 'react';

import { getComponentData } from '../../lib/strapi';

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
  const footerData = await getComponentData('footer');

  return (
    <>
      <ResultsHero />
      <Examples />
      <ResultsTestimonials />
      <ResultsWarranty />
      <LogoBar />
      <CTABlock />
      <PreFooterCard />
      <Footer footerData={footerData.attributes} />
    </>
  );
};

export default Results;
