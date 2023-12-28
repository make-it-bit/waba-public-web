'use client';

import React from 'react';
import Link from 'next/link';
import classNames from 'classnames';

import { getImageFullUrl } from '../../../lib/strapi';

import { Tag } from '../../../components';

import { Button } from '../../../gui-components/client';

import styles from './_hero.module.scss';

const Hero = ({ heroData }) => {
  return (
    <div className={classNames('relative lg:block flex flex-col lg:min-h-screen overflow-hidden', styles.background)}>
      <video
        autoPlay
        muted
        loop
        className="lg:absolute lg:top-0 top-144 lg:left-248 left-0 w-full lg:h-full lg:object-cover object-contain mix-blend-darken lg:z-[-1] order-2 lg:mt-0 mt-32"
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>
      <div className="container relative order-1">
        <div className="lg:grid grid-cols-12">
          <div className="col-start-1 xl:col-span-6 col-span-4 flex flex-col lg:items-start items-center lg:text-left text-center lg:mt-248 mt-56 lg:mb-104">
            <div>
              <h1 className="font-rufina lg:text-7xl text-5xl lg:leading-7xl leading-5xl mb-32">{heroData.title}</h1>
              {heroData.description.split('\n').map((paragraph, index) => (
                <h2 key={index} className="text-base leading-base">
                  {paragraph}
                </h2>
              ))}
            </div>
            <div className="flex lg:mt-48 lg:mb-88 my-40 gap-8">
              <Link href={heroData.button_1.href_src}>
                <Button CTA={heroData.button_1.href_text} svg />
              </Link>
              {heroData.button_2.map((button, index) => (
                <Link key={index} href={button.href_src}>
                  <Button CTA={button.href_text} style="secondary" />
                </Link>
              ))}
            </div>
            <div className="flex lg:justify-start justify-center flex-wrap gap-8">
              {heroData.tags.data.map((tag, index) => (
                <Tag
                  key={index}
                  text={tag.attributes.text}
                  svg={tag.attributes.logo.data && getImageFullUrl(tag.attributes.logo.data)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
