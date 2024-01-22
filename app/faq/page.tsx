import React from 'react';

import { getPageData, getComponentData } from '@/lib/strapi';

import { FAQ, LogoBar, CTABlock, PreFooterCard, Footer } from '@/page-components';

export const dynamic = 'force-static';

export async function generateMetadata() {
  const faqPageData = await getPageData('faq');
  return {
    title: faqPageData.attributes.seo.title,
    description: faqPageData.attributes.seo.description,
    alternates: {
      canonical: '/faq',
    },
    openGraph: {
      images: ['/api/og' || null],
    },
  };
}

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
