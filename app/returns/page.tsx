import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { getPageData, getComponentData } from '@/lib/strapi';

import { Footer } from '@/page-components';

export const dynamic = 'force-static';

export async function generateMetadata() {
  const returnPageData = await getPageData('return');
  return {
    title: returnPageData.attributes.seo.title,
    description: returnPageData.attributes.seo.description,
    alternates: {
      canonical: '/returns',
    },
    openGraph: {
      images: ['/api/og' || null],
    },
  };
}

const Returns = async () => {
  const returnPageData = await getPageData('return');
  const footerData = await getComponentData('footer');

  return (
    <>
      <div className="container my-64">
        {returnPageData.attributes.content.split('\n').map((line, index) => (
          <div key={index} className="text-base leading-base text-justify my-8">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{line}</ReactMarkdown>
          </div>
        ))}
      </div>
      <Footer footerData={footerData.attributes} small />
    </>
  );
};

export default Returns;
