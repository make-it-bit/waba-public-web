import React from 'react';

import { getBlogPosts, getCompareSection, getComponentData, getPageData, getUserVideos } from '@/lib/strapi';

import { 
  Hero, 
  Compare, 
  LogoBar, 
  CTABlock, 
  PreFooterCard, 
  Footer, 
  NewEra, 
  WabaPeople, 
  BestEveryCategory, 
  HappyUsers, 
  FeaturedIn, 
  SenjaTestimonials 
} from '@/page-components';
import ReadBlog from '@/page-components/Index/ReadBlog/ReadBlog';

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
        `/api/og?title=${indexPageData.attributes.seo.title}&desc=${indexPageData.attributes.seo.description}`,
      ],
    },
  };
}

const Home = async () => {
  const indexPageData = await getPageData('index');

  const ctaBlockData = await getComponentData('cta-block');
  const preFooterCardData = await getComponentData('pre-footer-card');
  const footerData = await getComponentData('footer');
  const blogPosts = await getBlogPosts();
  const compareSection = await getCompareSection();
  const userVideos = await getUserVideos();

  return (
    <>
      <Hero heroData={indexPageData.attributes.hero} />
      {/* <Colors colorsData={indexPageData.attributes.color} /> */}
      <FeaturedIn />
      <NewEra newEraData={indexPageData.attributes.new_era}/>
      <Compare compareData={indexPageData.attributes.compare_index} compareSection={compareSection}/>
      <SenjaTestimonials variant="thin" />
      <BestEveryCategory />
      <HappyUsers happyUsersData={indexPageData.attributes.waba_users} userVideos={userVideos}/>
      <WabaPeople />
      <ReadBlog blogPosts={blogPosts} />
      {/* <Foundations foundationsData={indexPageData.attributes.foundation} /> */}
      {/* <Video videoData={indexPageData.attributes.peek_inside} /> */}
      {/* <Foundations foundationsData={indexPageData.attributes.testimonial} /> */}
      <LogoBar />
      <CTABlock ctaBlockData={ctaBlockData.attributes} />
      <PreFooterCard preFooterCardData={preFooterCardData.attributes} />
      <Footer footerData={footerData.attributes} />
    </>
  );
};

export default Home;
