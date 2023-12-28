'use client';

import React from 'react';
import classNames from 'classnames';

import { getImageFullUrl } from '../../../lib/strapi';

import { TestimonialCard } from '../../../components';

import styles from './_testimonials.module.scss';

const Testimonials = ({ testimonialsData }) => {
  return (
    <div className={classNames('overflow-hidden', styles.background)}>
      <div className="container">
        <div className="grid grid-cols-12">
          <div className="md:col-start-4 col-start-1 md:col-span-6 col-span-12 text-center md:mt-160 md:mb-128 my-72">
            <h1 className="font-rufina text-4xl leading-4xl">{testimonialsData.title}</h1>
          </div>
        </div>
      </div>
      <div className="container md:mb-208 mb-72">
        <div className="grid grid-cols-12">
          <div className={classNames('md:flex grid col-span-12 gap-24', styles.slider)}>
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
      </div>
    </div>
  );
};

export default Testimonials;
