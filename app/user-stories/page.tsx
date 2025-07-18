import React from 'react';

import { getPageData, getComponentData, getCompareSection, getUserVideos } from '@/lib/strapi';

import {
  UserStoriesHero,
  LogoBar,
  CTABlock,
  PreFooterCard,
  Footer,
  Compare,
  SenjaTestimonials,
  HappyUsers,
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
        `/api/og?title=${userStoriesPageData.attributes.seo?.title}&desc=${
          userStoriesPageData.attributes.seo?.description
        }`,
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

  if (igPosts) {
    const matchingPosts = igPosts.filter((post) => {
      return igBlockCaptions.some((blockCaption) => post.caption.includes(blockCaption));
    });

    return matchingPosts;
  } else {
    return [];
  }
};

const UserStories = async () => {
  // user stories page api route is named 'result' in strapi
  const userStoriesPageData = await getPageData('result');
  const ctaBlockData = await getComponentData('cta-block');
  const preFooterCardData = await getComponentData('pre-footer-card');
  const footerData = await getComponentData('footer');
  const compareSection = await getCompareSection();
  const userVideos = await getUserVideos();
  const queryParams = [
    'media_url',
    'username',
    'permalink',
    'caption',
    'media_type',
    'thumbnail_url',
    'children{media_url, media_type, thumbnail_url}'
  ];
  const queryLimit = 30;

  const fetchInstagramPosts = async () => {

    try {
      const { data: posts } = await fetch(
        `https://graph.instagram.com/v23.0/${process.env.INSTAGRAM_ACCOUNT_ID}/media?fields=${queryParams.toString()}&limit=${queryLimit}&access_token=${process.env.STRAPI_IG_TOKEN}`,
        { method: 'GET', headers: { 'Content-Type': 'application/json' } }
      ).then((res) => res.json());

      const processedPosts = posts.map((post) => {
        if (post.media_type === 'CAROUSEL_ALBUM') {
          return {
            ...post,
            media_url: post.children.data[0].media_url,
            thumbnail_url: post.children.data[0].thumbnail_url,
          };
        } else if (post.media_type === 'VIDEO') {
          return {
            ...post,
            media_url: post.thumbnail_url,
          };
        }
        return post;
      });
  
      const pinnedPostIds = ['18015646946580030', '17892689018984587'];
      const pinnedPosts = processedPosts.filter((post) =>
        pinnedPostIds.includes(post.id)
      );
  
      const regularPosts = processedPosts.filter(
        (post) => !pinnedPostIds.includes(post.id)
      );
      const combinedPosts = [...pinnedPosts, ...regularPosts];
  
      return combinedPosts;
    } catch (error) {
      console.error('Error fetching Instagram posts:', error);
      return [];
    }
  };
  

  const posts = await fetchInstagramPosts();

  return (
    <>
      <UserStoriesHero userStoriesHeroData={userStoriesPageData.attributes.hero} />
      <Compare compareData={{title: 'Salon-grade results. Minimal effort. A multi-use product.'}} compareSection={compareSection}/>
      <SenjaTestimonials variant="thin" />
      <HappyUsers happyUsersData={{title: 'Happy Waba Users'}} userVideos={userVideos}/>
      {/* <Examples examplesData={userStoriesPageData.attributes.example} /> */}
      {/* <UserStoriesTestimonials testimonialsData={userStoriesPageData.attributes.testimonial} /> */}
      <InstagramBlock posts={posts.slice(0, 6)} />
      <LogoBar />
      <CTABlock ctaBlockData={ctaBlockData.attributes} />
      <PreFooterCard preFooterCardData={preFooterCardData.attributes} />
      <Footer footerData={footerData.attributes} />
    </>
  );
};

export default UserStories;
