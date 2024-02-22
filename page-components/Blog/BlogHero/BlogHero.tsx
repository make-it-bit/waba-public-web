import React from 'react';
import Image from 'next/image';

import { Tag } from '@/components';

const BlogHero = () => {
  return (
    <div className="container mt-64 mb-40">
      <div className="grid grid-cols-12 gap-x-32">
        <div className="lg:col-start-4 lg:col-span-6 col-span-12 text-center">
          <p className="text-base leading-base font-bold text-deep-purple-100 mb-16">OUR BLOG</p>
          <h1 className="font-rufina text-5xl leading-5xl mb-88">Insight and advice from our expert team</h1>
        </div>
        <div className="lg:col-start-2 lg:col-span-5 col-span-6">
          <div className="relative w-auto h-full">
            <Image src="/product-main-info-img-2.png" alt="blog hero image" fill className="absolute object-cover" />
          </div>
        </div>
        <div className="lg:col-span-5 col-span-6">
          <div className="flex flex-col justify-end h-full text-justify">
            <div className="flex gap-8">
              <Tag text="UPDATES" />
              <Tag text="UPDATES" />
            </div>
            <h2 className="font-rufina text-4xl leading-4xl my-16">Bringing Truth and Clarity to the Market</h2>
            <p className="text-sm leading-sm">
              In an industry rife with exaggerated claims and misleading information, we take pride in being the
              torchbearers of the truth. Our dedication to transparency is exemplified by our willingness to share every
              detail about our products, from technology to proven benefits. Through rigorous development and testing,
              conducted in collaboration with pioneering experts, we ensure the effectiveness and safety of WABA's
              devices. We continuously strive to improve and introduce new solutions to the market.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogHero;
