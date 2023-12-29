import React from 'react';

import { getFaqElements, getPageData, getComponentData } from '../../lib/strapi';

import { FAQ, LogoBar, CTABlock, PreFooterCard, Footer } from '../../page-components';

const FAQPage = async () => {
  const faqPageData = await getPageData('faq');
  const ctaBlockData = await getComponentData('cta-block');
  const preFooterCardData = await getComponentData('pre-footer-card');
  const footerData = await getComponentData('footer');

  return (
    <>
      <FAQ faqPageData={faqPageData.attributes} />
      <LogoBar />
      <CTABlock ctaBlockData={ctaBlockData.attributes} />
      <PreFooterCard preFooterCardData={preFooterCardData.attributes} />
      <Footer footerData={footerData.attributes} />
    </>
  );
};

export default FAQPage;
