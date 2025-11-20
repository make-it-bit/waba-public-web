'use client';

import React from 'react';
import Image from 'next/image';

const WabaPeople = () => {
  return (
    <div className="container pb-[108px]">
      <div className="flex flex-col">
        <div className="grid grid-cols-12">
          <div className="col-span-12 text-center md:mt-160 mt-72 md:mb-88 mb-40">
            <h1 className="font-rufina sm:text-6xl text-4xl sm:leading-4xl leading-3xl">
              The People Behind WABA
            </h1>
          </div>
        </div>
        <div className="grid grid-cols-12 md:mb-80 mb-40 md:gap-10 gap-y-10">
          <div className="md:col-span-4 md:col-start-3 col-span-12">
            <div className="flex flex-col">
              <Image src="/people/mart-lakspere.jpg" quality={100} alt="founder mart" width={0} height={0} sizes='100vw' style={{ width: '100%', height: 'auto' }} />
              <p className="font-bold text-[#31115B] pt-5">Founder</p>
              <h3 className="font-rufina text-3xl text-left pt-5">Mart Lakspere</h3>
              <p className="sm:leading-2xl leading-2xl pt-5">Mechanical Engineer with extensive experience in Swiss pharma and surgical tools development. As a lifelong inventor, Mart merges technical skill with problem-solving to drive Waba products.</p>
            </div>
          </div>
          <div className="md:col-span-4 md:col-start-7 col-span-12">
            <Image src="/people/mari-lakspere.jpg" quality={100} alt="founder mart" width={0} height={0} sizes='100vw' style={{ width: '100%', height: 'auto' }} />
            <p className="font-bold text-[#31115B] pt-5">Wellness Advisor</p>
            <h3 className="font-rufina text-3xl text-left pt-5">Mari Lakspere</h3>
            <p className="sm:leading-2xl leading-2xl pt-5">Mari is a world-renowned facefitness and natural beauty coach based in Abu Dhabi. With over 15 years of experience, she has operated beauty salons in France, bringing her expertise in natural beauty to a global clientele.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WabaPeople;
