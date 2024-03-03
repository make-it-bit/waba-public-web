import React from 'react';

import { getComponentData, getPolicyPages } from '@/lib/strapi';

import { Policy, Footer } from '@/page-components';

export const dynamic = 'force-static';
export const dynamicParams = false;

export async function generateMetadata({ params: { slug } }) {
  const policyPages = await getPolicyPages();
  const filteredPage = policyPages?.filter((page) => page.attributes.slug === `/${slug}`)[0];
  return {
    title: filteredPage?.attributes.seo?.title ?? '',
    description: filteredPage?.attributes.seo?.description,
    alternates: {
      canonical: `/${slug}`,
    },
    openGraph: {
      images: [
        `/api/og?title=${filteredPage?.attributes.seo?.title ?? ''}&description=${
          filteredPage?.attributes.seo?.description ?? ''
        }` || null,
      ],
    },
  };
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const policyPages = await getPolicyPages();
  return (
    policyPages?.map((page) => ({
      slug: page.attributes.slug.substring(1),
    })) ?? []
  );
}

const PolicyPage = async ({ params: { slug } }) => {
  const policyPages = await getPolicyPages();
  const filteredPage = policyPages?.filter((page) => page.attributes.slug === `/${slug}`)[0];
  const footerData = await getComponentData('footer');

  return (
    <>
      <Policy policyPageData={filteredPage} />
      <Footer footerData={footerData.attributes} small />
    </>
  );
};

export default PolicyPage;
