import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { getPageData, getComponentData } from '@/lib/strapi';

import { Footer } from '@/page-components';

export const dynamic = 'force-static';

export async function generateMetadata() {
  const termPageData = await getPageData('term');
  return {
    title: termPageData.attributes.seo.title,
    description: termPageData.attributes.seo.description,
    alternates: {
      canonical: '/terms',
    },
    openGraph: {
      //images: [seo_component.og_image || null],
    },
  };
}

const Terms = async () => {
  const termPageData = await getPageData('term');
  const footerData = await getComponentData('footer');

  return (
    <>
      <div className="container my-64">
        {termPageData.attributes.content.split('\n').map((line, index) => (
          <div key={index} className="text-base leading-base text-justify my-8">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{line}</ReactMarkdown>
          </div>
        ))}
      </div>
      <Footer footerData={footerData.attributes} small />
    </>
  );
};

export default Terms;
