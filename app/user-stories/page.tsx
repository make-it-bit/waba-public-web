import React from 'react';

import { getPageData, getComponentData } from '@/lib/strapi';

import {
  UserStoriesHero,
  Examples,
  UserStoriesTestimonials,
  UserStoriesWarranty,
  LogoBar,
  CTABlock,
  PreFooterCard,
  Footer,
} from '@/page-components';

import { InstagramBlock } from '@/components';

export const dynamic = 'force-static';

export async function generateMetadata() {
  const userStoriesPageData = await getPageData('result');
  return {
    title: userStoriesPageData.attributes.seo?.title ?? '',
    description: userStoriesPageData.attributes.seo?.description ?? '',
    alternates: {
      canonical: '/user-stories',
    },
    openGraph: {
      images: [
        `/api/og?title=${userStoriesPageData.attributes.seo?.title ?? ''}&desc=${
          userStoriesPageData.attributes.seo?.description ?? ''
        }` || null,
      ],
    },
  };
}

const findMatchingPosts = (igPosts, igBlock) => {
  const igBlockCaptions = [
    igBlock.first_caption,
    igBlock.second_caption,
    igBlock.third_caption,
    igBlock.fourth_caption,
    igBlock.fifth_caption,
  ];

  const matchingPosts = igPosts.filter((post) => {
    return igBlockCaptions.some((blockCaption) => post.caption.includes(blockCaption));
  });

  return matchingPosts;
};

const UserStories = async () => {
  // user stories page api route is named 'result' in strapi
  const userStoriesPageData = await getPageData('result');
  const ctaBlockData = await getComponentData('cta-block');
  const preFooterCardData = await getComponentData('pre-footer-card');
  const footerData = await getComponentData('footer');

  const { data: posts } = await fetch(
    `https://graph.instagram.com/me/media?fields=media_url,permalink,caption&access_token=${process.env.INSTAGRAM_ACCESS_TOKEN}`,
    { method: 'GET', headers: { 'Content-Type': 'application/json' } }
  ).then((res) => res.json());

  const { ig_block: igBlock } = userStoriesPageData.attributes;

  const matchingPosts = findMatchingPosts(posts, igBlock);

  return (
    <>
      <UserStoriesHero userStoriesHeroData={userStoriesPageData.attributes.hero} />
      <Examples examplesData={userStoriesPageData.attributes.example} />
      <UserStoriesTestimonials testimonialsData={userStoriesPageData.attributes.testimonial} />
      <InstagramBlock posts={matchingPosts} blockData={igBlock} />
      <LogoBar />
      <CTABlock ctaBlockData={ctaBlockData.attributes} />
      <PreFooterCard preFooterCardData={preFooterCardData.attributes} />
      <Footer footerData={footerData.attributes} />
    </>
  );
};

export default UserStories;
