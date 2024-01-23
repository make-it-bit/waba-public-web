import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { getPageData, getComponentData } from '@/lib/strapi';

import { Footer } from '@/page-components';

export const dynamic = 'force-static';

export async function generateMetadata() {
  const privacyPageData = await getPageData('privacy-policy');
  return {
    title: privacyPageData.attributes.seo.title,
    description: privacyPageData.attributes.seo.description,
    alternates: {
      canonical: '/privacy-policy',
    },
    openGraph: {
      images: ['/api/og' || null],
    },
  };
}

const PrivacyPolicy = async () => {
  const privacyPageData = await getPageData('privacy-policy');
  const footerData = await getComponentData('footer');

  return (
    <>
      <div className="container my-64">
        {privacyPageData.attributes.content.split('\n').map((line, index) => (
          <div key={index} className="text-base leading-base text-justify my-8">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{line}</ReactMarkdown>
          </div>
        ))}
      </div>
      <Footer footerData={footerData.attributes} small />
    </>
  );
};

export default PrivacyPolicy;
