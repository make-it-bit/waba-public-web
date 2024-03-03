import React from 'react';

import { getComponentData, getBlogPosts } from '@/lib/strapi';

import { BlogPostHero, BlogPost, Footer } from '@/page-components';

export const dynamic = 'force-static';
export const dynamicParams = false;

export async function generateMetadata({ params: { blogPost } }) {
  const blogPosts = await getBlogPosts();
  const filteredPost = blogPosts?.filter((post) => post.attributes.slug === `/${blogPost}`)[0];
  return {
    title: filteredPost?.attributes.seo?.title ?? '',
    description: filteredPost?.attributes.seo?.description,
    alternates: {
      canonical: `/blog/${blogPost}`,
    },
    openGraph: {
      images: [
        `/api/og?title=${filteredPost?.attributes.seo?.title ?? ''}&description=${
          filteredPost?.attributes.seo?.description ?? ''
        }` || null,
      ],
    },
  };
}

export async function generateStaticParams() {
  const blogPosts = await getBlogPosts();
  return blogPosts?.map((post) => ({
    blogPost: post.attributes.slug.substring(1),
  }));
}

const BlogPostPage = async ({ params: { blogPost } }) => {
  const blogPosts = await getBlogPosts();
  const filteredPost = blogPosts?.filter((post) => post.attributes.slug === `/${blogPost}`)[0];
  const footerData = await getComponentData('footer');

  return (
    <>
      <BlogPostHero
        backToBlog={filteredPost?.attributes.back_to_blog}
        image={filteredPost?.attributes.image}
        categories={filteredPost?.attributes.categories}
        title={filteredPost?.attributes.title}
        description={filteredPost?.attributes.description}
        author={filteredPost?.attributes.author}
        date={filteredPost?.attributes.date}
      />
      <BlogPost content={filteredPost?.attributes.content} />
      <Footer footerData={footerData.attributes} small />
    </>
  );
};

export default BlogPostPage;
