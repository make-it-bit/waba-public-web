import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { getImageFullUrl_server } from '@/lib/getImgFullUrl';

import { CategoryTag } from '@/components';

const BlogHero = ({ blogHeroData }) => {
  return (
    <div className="container mt-64 mb-40">
      <div className="grid grid-cols-12 md:gap-x-32">
        <div className="lg:col-start-4 lg:col-span-6 col-span-12 text-center">
          <p className="text-base leading-base font-bold text-deep-purple-100 mb-16">
            {blogHeroData.before_title_text}
          </p>
          <h1 className="font-rufina md:text-5xl md:leading-5xl text-3xl leading-3xl lg:mb-88 md:mb-64 mb-40">
            {blogHeroData.title}
          </h1>
        </div>
        <div className="lg:col-start-2 lg:col-span-5 md:col-span-6 col-span-12">
          <Link href={`/blog${blogHeroData.featured_blog_post.data.attributes.slug}`}>
            <div className="relative w-auto md:h-full h-400 md:mb-0 mb-16">
              <Image
                src={getImageFullUrl_server(blogHeroData.featured_blog_post.data.attributes.image.data)}
                alt="blog hero image"
                fill
                className="absolute object-cover"
              />
            </div>
          </Link>
        </div>
        <div className="lg:col-span-5 md:col-span-6 col-span-12">
          <div className="flex flex-col justify-end h-full text-justify">
            <div className="flex gap-8">
              {blogHeroData.featured_blog_post.data.attributes.categories.data.map((category, index) => (
                <CategoryTag key={index} text={category.attributes.name} />
              ))}
            </div>
            <Link href={`/blog${blogHeroData.featured_blog_post.data.attributes.slug}`}>
              <h2 className="font-rufina md:text-4xl md:leading-4xl text-2xl leading-2xl my-16">
                {blogHeroData.featured_blog_post.data.attributes.title}
              </h2>
              <p className="text-sm leading-sm">{blogHeroData.featured_blog_post.data.attributes.description}</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogHero;
