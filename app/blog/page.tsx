import React from 'react';

import { getComponentData } from '@/lib/strapi';

import { BlogHero, BlogPosts, Footer } from '@/page-components';

const Blog = async () => {
  const footerData = await getComponentData('footer');

  return (
    <>
      <BlogHero />
      <BlogPosts />
      <Footer footerData={footerData.attributes} small />
    </>
  );
};

export default Blog;
