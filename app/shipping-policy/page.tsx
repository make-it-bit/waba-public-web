import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { getPageData, getComponentData } from '@/lib/strapi';

import { Footer } from '@/page-components';

export const dynamic = 'force-static';

export async function generateMetadata() {
  const shippingPageData = await getPageData('shipping-policy');
  return {
    title: shippingPageData.attributes.seo.title,
    description: shippingPageData.attributes.seo.description,
    alternates: {
      canonical: '/shipping-policy',
    },
    openGraph: {
      //images: [seo_component.og_image || null],
    },
  };
}

const ShippingPolicy = async () => {
  const shippingPageData = await getPageData('shipping-policy');
  const footerData = await getComponentData('footer');

  return (
    <>
      <div className="container my-64">
        {shippingPageData.attributes.content.split('\n').map((line, index) => (
          <div key={index} className="text-base leading-base text-justify my-8">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{line}</ReactMarkdown>
          </div>
        ))}
      </div>
      <Footer footerData={footerData.attributes} small />
    </>
  );
};

export default ShippingPolicy;
