import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

import { getPageData, getComponentData } from '@/lib/strapi';

import { Footer } from '@/page-components';

export const dynamic = 'force-static';

export async function generateMetadata() {
  const shippingPageData = await getPageData('shipping-policy');
  return {
    title: shippingPageData.attributes.seo?.title ?? '',
    description: shippingPageData.attributes.seo?.description ?? '',
    alternates: {
      canonical: '/shipping-policy',
    },
    openGraph: {
      images: [
        `/api/og?title=${shippingPageData.attributes.seo?.title ?? ''}&desc=${
          shippingPageData.attributes.seo?.description ?? ''
        }` || null,
      ],
    },
  };
}

const ShippingPolicy = async () => {
  const shippingPageData = await getPageData('shipping-policy');
  const footerData = await getComponentData('footer');

  return (
    <>
      <div className="container my-64">
        <div className="text-base leading-base text-justify">
          <ReactMarkdown rehypePlugins={[rehypeRaw]}>{shippingPageData.attributes.content}</ReactMarkdown>
        </div>
      </div>
      <Footer footerData={footerData.attributes} small />
    </>
  );
};

export default ShippingPolicy;
