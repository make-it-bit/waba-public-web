import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

import { getPageData, getComponentData } from '@/lib/strapi';

import { Footer } from '@/page-components';

export const dynamic = 'force-static';

export async function generateMetadata() {
  const privacyPageData = await getPageData('privacy-policy');
  return {
    title: privacyPageData.attributes.seo?.title ?? '',
    description: privacyPageData.attributes.seo?.description ?? '',
    alternates: {
      canonical: '/privacy-policy',
    },
    openGraph: {
      images: [
        `/api/og?title=${privacyPageData.attributes.seo?.title ?? ''}&desc=${
          privacyPageData.attributes.seo?.description ?? ''
        }` || null,
      ],
    },
  };
}

const PrivacyPolicy = async () => {
  const privacyPageData = await getPageData('privacy-policy');
  const footerData = await getComponentData('footer');

  return (
    <>
      <div className="container my-64">
        <div className="text-base leading-base text-justify">
          <ReactMarkdown rehypePlugins={[rehypeRaw]}>{privacyPageData.attributes.content}</ReactMarkdown>
        </div>
      </div>
      <Footer footerData={footerData.attributes} small />
    </>
  );
};

export default PrivacyPolicy;
