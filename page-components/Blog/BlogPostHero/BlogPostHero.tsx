import React from 'react';
import Image from 'next/image';

import { Tag } from '@/components';
import Link from 'next/link';

const BlogPostHero = () => {
  return (
    <div className="container mt-64 mb-40">
      <div className="grid grid-cols-12">
        <div className="xl:col-start-4 xl:col-span-6 md:col-start-3 md:col-span-8 col-span-12 border-b border-black-10 pb-24">
          <div className="flex flex-col gap-24">
            <Link href="/blog" className="text-deep-purple-100 font-bold">
              {`<`} BACK TO BLOG
            </Link>
            <div className="relative w-auto h-[400px]">
              <Image src="/product-main-info-img-2.png" alt="blog hero image" fill className="absolute object-cover" />
            </div>
            <div className="flex gap-8 text-deep-purple-100">
              <Tag text="category 1" />
              <Tag text="category 2" />
            </div>
            <div className="flex flex-col gap-8 text-justify">
              <h1 className="font-rufina text-5xl leading-5xl">Bringing Truth and Clarity to the Market</h1>
              <h2 className="text-base leading-base text-black-60">
                In an industry rife with exaggerated claims and misleading information, we take pride in being the
                torchbearers of the truth. Our dedication to transparency is exemplified by our willingness to share
                every detail about our products, from technology to proven benefits. Through rigorous development and
                testing, conducted in collaboration with pioneering experts, we ensure the effectiveness and safety of
                WABA's devices. We continuously strive to improve and introduce new solutions to the market.
              </h2>
              <p className="text-base leading-base">AUTHOR KEEGI﹒ 2021-09-01</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPostHero;
