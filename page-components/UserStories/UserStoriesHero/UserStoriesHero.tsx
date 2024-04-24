import React from 'react';
import Image from 'next/image';

import { getImageFullUrl_server } from '@/lib/getImgFullUrl';

import { LazyLoadVideo } from '@/components';

const UserStoriesHero = ({ userStoriesHeroData }) => {
  return (
    <div className="relative bg-supplementary-warm-gray overflow-hidden">
      <Image
        src={getImageFullUrl_server(userStoriesHeroData.background_media.data[0])}
        alt="user stories hero image"
        width={305}
        height={336}
        quality={100}
        className="lg:block hidden absolute top-64 left-0"
      />
      <LazyLoadVideo
        className="absolute lg:bottom-[93px] bottom-16 lg:right-[-38px] right-[-32px] lg:w-[306px] w-[154px] lg:h-[322px] h-[171px] object-cover"
        src={userStoriesHeroData.background_media.data[5]}
      />
      <div className="lg:block hidden absolute top-[661px] left-[732px] w-[196px] h-[218px]">
        <Image
          src={getImageFullUrl_server(userStoriesHeroData.background_media.data[3])}
          alt="user stories hero image"
          fill
          quality={100}
          className="object-cover"
        />
      </div>
      <Image
        src={getImageFullUrl_server(userStoriesHeroData.background_media.data[1])}
        alt="user stories hero image"
        width={184}
        height={236}
        quality={100}
        className="lg:hidden block absolute bottom-0 left-[-50px]"
      />
      <div className="container">
        <div className="relative grid grid-cols-12">
          <Image
            src={getImageFullUrl_server(userStoriesHeroData.background_media.data[1])}
            alt="user stories hero image"
            width={306}
            height={392}
            quality={100}
            className="lg:block hidden absolute bottom-0 left-0"
          />
          <LazyLoadVideo
            className="absolute top-64 left-1/2 translate-x-neg-1/2 w-[416px] h-[161px] object-cover"
            src={userStoriesHeroData.background_media.data[2]}
          />
          <LazyLoadVideo
            className="lg:block hidden absolute top-64 right-0 w-[196px] h-[239px] object-cover"
            src={userStoriesHeroData.background_media.data[4]}
          />
          <div className="lg:col-start-4 col-start-1 lg:col-span-6 col-span-12">
            <div className="flex flex-col gap-32 pt-288 pb-248 text-center">
              <h1 className="font-rufina md:text-7xl text-5xl md:leading-7xl leading-5xl">
                {userStoriesHeroData.title}
              </h1>
              <div className="grid lg:grid-cols-6 grid-cols-12">
                <div className="lg:col-start-2 col-start-1 lg:col-span-4 col-span-12">
                  <p className="text-base leading-base">{userStoriesHeroData.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserStoriesHero;
