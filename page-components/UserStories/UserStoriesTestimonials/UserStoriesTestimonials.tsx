'use client';

import React from 'react';
import classNames from 'classnames';

import { TestimonialCard } from '@/components';

import { getImageFullUrl_client } from '@/lib/getImgFullUrl';

import styles from './_userStoriesTestimonials.module.scss';

const UserStoriesTestimonials = ({ testimonialsData }) => {
  const style = { '--len': `${testimonialsData.user_stories.data.length}` } as React.CSSProperties;

  return (
    <div className={styles.background}>
      <div className="container">
        <div className="grid grid-cols-12">
          <div className="sm:col-start-4 col-start-1 sm:col-span-6 col-span-12 text-center sm:mt-160 sm:mb-104 my-72">
            <h1 className="font-rufina sm:text-4xl text-3xl sm:leading-4xl leading-3xl">{testimonialsData.title}</h1>
          </div>
        </div>
      </div>
      <div className="md:flex hidden md:mb-208 mb-72 overflow-hidden">
        <div className="inline-flex flex-nowrap w-full">
          <div className="flex justify-center items-center [&_div]:mx-6 animate-infinite-scroll-testimonials">
            {testimonialsData.user_stories.data.map((userStory, index) => (
              <TestimonialCard
                key={index}
                image={getImageFullUrl_client(userStory.attributes.image.data)}
                name={userStory.attributes.name}
                border
                content={userStory.attributes.story}
                fixedWidth
              />
            ))}
          </div>
          <div className="flex justify-center items-center [&_div:first-child]:mx-6 animate-infinite-scroll-testimonials">
            {testimonialsData.user_stories.data.map((userStory, index) => (
              <TestimonialCard
                key={index}
                image={getImageFullUrl_client(userStory.attributes.image.data)}
                name={userStory.attributes.name}
                border
                content={userStory.attributes.story}
                fixedWidth
              />
            ))}
          </div>
        </div>
      </div>
      <div className="container md:mb-208 mb-72">
        <div className="md:hidden grid grid-cols-12">
          <div style={style} className={classNames('grid col-span-12 gap-16', styles.slider)}>
            {testimonialsData.user_stories.data.map((userStory, index) => (
              <TestimonialCard
                key={index}
                image={getImageFullUrl_client(userStory.attributes.image.data)}
                name={userStory.attributes.name}
                border
                content={userStory.attributes.story}
                fixedWidth
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserStoriesTestimonials;
