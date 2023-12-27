'use client';

import React from 'react';
import classNames from 'classnames';

import { getImageFullUrl } from '../../../lib/strapi';

import { TestimonialCard } from '../../../components';

import styles from './_testimonials.module.scss';

const Testimonials = ({ testimonialsData }) => {
  return (
    <div className={styles.background}>
      <div className="container">
        <div className="grid grid-cols-12">
          <div className="col-start-4 col-span-6 text-center mt-160 mb-128">
            <h1 className="font-rufina text-4xl leading-4xl">{testimonialsData.title}</h1>
          </div>
        </div>
      </div>
      <div className={classNames('flex gap-24 pb-208', styles.slider)}>
        {testimonialsData.user_stories.data.map((userStory, index) => (
          <TestimonialCard
            key={index}
            image="/testimonial-img-1.png"
            /* image={getImageFullUrl(userStory.attributes.image.data)} */
            name={userStory.attributes.name}
            content={userStory.attributes.story}
            buttonCTA={userStory.attributes.button.href_text}
            buttonHref={userStory.attributes.button.href_src}
          />
        ))}
        {testimonialsData.user_stories.data.map((userStory, index) => (
          <TestimonialCard
            key={index}
            image="/testimonial-img-1.png"
            /* image={getImageFullUrl(userStory.attributes.image.data)} */
            name={userStory.attributes.name}
            content={userStory.attributes.story}
            buttonCTA={userStory.attributes.button.href_text}
            buttonHref={userStory.attributes.button.href_src}
          />
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
