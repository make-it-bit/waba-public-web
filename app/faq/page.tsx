import React from 'react';

import { getComponentData } from '../../lib/strapi';

import { FAQ, LogoBar, CTABlock, PreFooterCard, Footer } from '../../page-components';

const FAQPage = async () => {
  const footerData = await getComponentData('footer');

  return (
    <>
      <FAQ />
      <LogoBar />
      <CTABlock />
      <PreFooterCard />
      <Footer footerData={footerData.attributes} />
    </>
  );
};

export default FAQPage;
