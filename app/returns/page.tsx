import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

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
      images: [
        `/api/og?title=${returnPageData.attributes.seo.title}&desc=${returnPageData.attributes.seo.description}` ||
          null,
      ],
    },
  };
}

const Returns = async () => {
  const returnPageData = await getPageData('return');
  const footerData = await getComponentData('footer');

  return (
    <>
      <div className="container my-64">
        <div className="text-base leading-base text-justify">
          <ReactMarkdown rehypePlugins={[rehypeRaw]}>{returnPageData.attributes.content}</ReactMarkdown>
        </div>
      </div>
      <Footer footerData={footerData.attributes} small />
    </>
  );
};

export default Returns;
