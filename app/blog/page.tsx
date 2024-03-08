import React from 'react';

import { getPageData, getComponentData, getBlogPosts } from '@/lib/strapi';

import { BlogHero, BlogPosts, Footer } from '@/page-components';

export const dynamic = 'force-static';

export async function generateMetadata() {
  const blogData = await getPageData('blog');
  return {
    title: blogData.attributes.seo?.title ?? '',
    description: blogData.attributes.seo?.description ?? '',
    alternates: {
      canonical: '/blog',
    },
    openGraph: {
      images: [
        `/api/og?title=${blogData.attributes.seo?.title ?? ''}&desc=${blogData.attributes.seo?.description ?? ''}` ||
          null,
      ],
    },
  };
}

const Blog = async () => {
  const blogData = await getPageData('blog');
  const blogPosts = await getBlogPosts();
  const footerData = await getComponentData('footer');

  return (
    <>
      <BlogHero blogHeroData={blogData.attributes.hero} />
      <BlogPosts blogData={blogData.attributes} blogPosts={blogPosts} />
      <Footer footerData={footerData.attributes} small />
    </>
  );
};

export default Blog;
