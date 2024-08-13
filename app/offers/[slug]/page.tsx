import { redirect } from 'next/navigation';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { getImageFullUrl_server } from '@/lib/getImgFullUrl';
import { getComponentData, getCollectionSlugs, getCollectionItem } from '@/lib/strapi';

import { FooterSlim } from '@/page-components';
import { RichTextBlock, StrapiForm } from '@/components';
import { Button } from '@/gui-components/client';

export const dynamic = 'force-dynamic';

export async function generateStaticParams() {
  const slugs = await getCollectionSlugs('offers');
  return slugs.map((slug: string) => ({ params: { slug } }));
}

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const pageData = await getCollectionItem('offers', params.slug);
  if (!pageData) redirect('/not-found');
  const { seo } = pageData;
  return {
    title: seo.title,
    description: seo.description,
    alternates: {
      canonical: '/',
    },
    openGraph: {
      images: [`/api/og?title=${seo.title}&desc=${seo.description}` ?? null],
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
  const downloadableData = await getCollectionItem('offers', params.slug);

  if (!downloadableData) redirect('/not-found');

  const { content, form } = downloadableData;
  const {
    intro_title: introTitle,
    main_title: mainTitle,
    description,
    button_cta: buttonCta,
    button_href: buttonHref,
    bg_image: bgImage,
    file,
  } = content;

  return (
    <>
      <div className="relative w-screen lg:h-[700px] h-[800px]">
        <Image src={getImageFullUrl_server(bgImage.data)} fill alt="Downloadables" className="object-cover" />
        <div className="container relative">
          <div className="grid grid-cols-12">
            <div className="lg:col-start-3 lg:col-span-8 col-span-12">
              <div className="flex flex-col lg:mt-104 mt-[30px] lg-72 gap-48">
                {introTitle && <h4 className="text-3xl font-bold text-purple-40 text-center m-0">{introTitle}</h4>}
                <h1 className="text-4xl font-rufina font-bold text-white-100 text-center m-0">{mainTitle}</h1>
                <RichTextBlock content={description} />
                {!file.data && !buttonHref && <StrapiForm form={form} buttonCta={buttonCta} />}
                {file.data && (
                  <Link href={getImageFullUrl_server(file.data)} target="_blank" className="self-center">
                    <Button CTA={buttonCta} style="tertiary" size="reg" />
                  </Link>
                )}
                {buttonHref && !file.data && (
                  <Link href={buttonHref} target="_blank" className="self-center">
                    <Button CTA={buttonCta} style="tertiary" size="reg" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterSlim footerData={footerData.attributes} />
    </>
  );
};

export default Downloadables;
