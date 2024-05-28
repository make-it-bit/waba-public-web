import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { getImageFullUrl_server } from '@/lib/getImgFullUrl';

import { CategoryTag } from '@/components';

const BlogPostHero = ({ backToBlog, image, categories, title, description, author, date }) => {
  return (
    <div className="container mt-64 mb-16">
      <div className="grid grid-cols-12">
        <div className="xl:col-start-4 xl:col-span-6 lg:col-start-3 lg:col-span-8 col-span-12 border-b border-black-10 pb-24">
          <div className="flex flex-col gap-24">
            <Link href="/blog" className="text-deep-purple-100 font-bold">
              {`< ${backToBlog.href_text}`}
            </Link>
            <div className="relative w-auto h-[400px]">
              <Image
                src={getImageFullUrl_server(image.data)}
                alt="blog hero image"
                fill
                quality={100}
                className="absolute object-cover"
              />
            </div>
            <div className="flex gap-8 text-deep-purple-100">
              {categories.data.map((category, index) => (
                <CategoryTag key={index} text={category.attributes.name} />
              ))}
            </div>
            <div className="flex flex-col gap-8 text-justify">
              <h1 className="font-rufina md:text-5xl md:leading-5xl text-4xl leading-4xl">{title}</h1>
              <h2 className="text-base leading-base text-black-60">{description}</h2>
              <p className="text-base leading-base">{`${author}${date ? ` ﹒ ${date}` : ''}`}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPostHero;
