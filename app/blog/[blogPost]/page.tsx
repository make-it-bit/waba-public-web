import React from 'react';

import { getComponentData } from '@/lib/strapi';

import { BlogPostHero, BlogPost, Footer } from '@/page-components';

const BlogPostPage = async () => {
  const footerData = await getComponentData('footer');

  return (
    <>
      <BlogPostHero />
      <BlogPost />
      <Footer footerData={footerData.attributes} small />
    </>
  );
};

export default BlogPostPage;
