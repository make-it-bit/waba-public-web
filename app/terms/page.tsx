import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

import { getPageData, getComponentData } from '@/lib/strapi';

import { Footer } from '@/page-components';

export const dynamic = 'force-static';

export async function generateMetadata() {
  const termPageData = await getPageData('term');

  if (!termPageData) return null;

  return {
    title: termPageData.attributes.seo?.title ?? '',
    description: termPageData.attributes.seo?.description ?? '',
    alternates: {
      canonical: '/terms',
    },
    openGraph: {
      images: [
        `/api/og?title=${termPageData.attributes.seo?.title ?? ''}&desc=${
          termPageData.attributes.seo?.description ?? ''
        }` || null,
      ],
    },
  };
}

const Terms = async () => {
  const termPageData = await getPageData('term');
  const footerData = await getComponentData('footer');

  return (
    <>
      {termPageData && (
        <div className="container my-64">
          <div className="text-base leading-base text-justify">
            <ReactMarkdown rehypePlugins={[rehypeRaw]}>{termPageData.attributes.content}</ReactMarkdown>
          </div>
        </div>
      )}
      <Footer footerData={footerData.attributes} small />
    </>
  );
};

export default Terms;
