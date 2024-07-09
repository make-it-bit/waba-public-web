import { redirect } from 'next/navigation';
import React from 'react';

import { getComponentData, getCollectionSlugs, getCollectionItem } from '@/lib/strapi';
import { DownloadablesContent, FooterSlim } from '@/page-components';

export const dynamic = 'force-static';

export async function generateStaticParams() {
  const slugs = await getCollectionSlugs('downloadables');
  return slugs.map((slug: string) => ({ params: { slug } }));
}

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const pageData = await getCollectionItem('downloadables', params.slug);
  if (!pageData) redirect('/not-found');
  const { seo } = pageData;
  return {
    title: seo.title,
    description: seo.description,
    alternates: {
      canonical: '/',
    },
    openGraph: {
      images: [`/api/og?title=${seo.title}&desc=${seo.description}` || null],
    },
  };
}

const Downloadables = async ({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const footerData = await getComponentData('footer');
  const downloadableData = await getCollectionItem('downloadables', params.slug);

  if (!downloadableData) redirect('/not-found');

  return (
    <>
      <DownloadablesContent downloadableData={downloadableData} />
      <FooterSlim footerData={footerData.attributes} />
    </>
  );
};

export default Downloadables;
