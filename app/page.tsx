import React from 'react';

import { getComponentData, getPageData } from '@/lib/strapi';

import {
  Hero,
  Colors,
  Foundations,
  Video,
  Testimonials,
  LogoBar,
  CTABlock,
  PreFooterCard,
  Footer,
} from '@/page-components';

import { InstagramBlock } from '@/components';

export const dynamic = 'force-static';

export async function generateMetadata() {
  const indexPageData = await getPageData('index');
  return {
    title: indexPageData.attributes.seo.title,
    description: indexPageData.attributes.seo.description,
    alternates: {
      canonical: '/',
    },
    openGraph: {
      images: [
        `/api/og?title=${indexPageData.attributes.seo.title}&desc=${indexPageData.attributes.seo.description}` || null,
      ],
    },
  };
}

const Home = async () => {
  const indexPageData = await getPageData('index');

  const ctaBlockData = await getComponentData('cta-block');
  const preFooterCardData = await getComponentData('pre-footer-card');
  const footerData = await getComponentData('footer');

  const { data } = await fetch(`https://${process.env.NEXT_PUBLIC_BASE_URL}/api/instagram/posts`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());

  return (
    <>
      <Hero heroData={indexPageData.attributes.hero} />
      <Colors colorsData={indexPageData.attributes.color} />
      <Foundations foundationsData={indexPageData.attributes.foundation} />
      <Video videoData={indexPageData.attributes.peek_inside} />
      <Foundations foundationsData={indexPageData.attributes.testimonial} />
      <LogoBar />
      <CTABlock ctaBlockData={ctaBlockData.attributes} />
      <InstagramBlock posts={data} />
      <PreFooterCard preFooterCardData={preFooterCardData.attributes} />
      <Footer footerData={footerData.attributes} />
    </>
  );
};

export default Home;
