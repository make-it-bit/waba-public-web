'use client';

import React from 'react';

import { getImageFullUrl_client } from '@/lib/getImgFullUrl';

import { TestimonialCard } from '@/components';

import styles from './_testimonials.module.scss';

const Testimonials = ({ testimonialsData }) => {
  return (
    <div className={styles.background}>
      <div className="container">
        <div className="grid grid-cols-12">
          <div className="md:col-start-4 col-start-1 md:col-span-6 col-span-12 text-center md:mt-160 md:mb-128 my-72">
            <h1 className="font-rufina sm:text-4xl text-3xl sm:leading-4xl leading-3xl">{testimonialsData.title}</h1>
          </div>
        </div>
        <div className="grid grid-cols-12 md:pb-208 pb-72 gap-24">
          {testimonialsData.user_stories.data.map((userStory, index) => (
            <TestimonialCard
              key={index}
              image={getImageFullUrl_client(userStory.attributes.image.data)}
              name={userStory.attributes.name}
              content={userStory.attributes.story}
              buttonCTA={userStory.attributes.button.href_text}
              buttonHref={userStory.attributes.button.href_src}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
