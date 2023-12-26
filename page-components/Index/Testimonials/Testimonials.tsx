'use client';

import React from 'react';

import { getImageFullUrl } from '../../../lib/strapi';

import { TestimonialCard } from '../../../components';

import styles from './_testimonials.module.scss';

const Testimonials = ({ testimonialsData }) => {
  return (
    <div className={styles.background}>
      <div className="container">
        <div className="flex flex-col">
          <div className="grid grid-cols-12">
            <div className="col-start-4 col-span-6 text-center mt-160 mb-128">
              <h1 className="font-rufina text-4xl leading-4xl">{testimonialsData.title}</h1>
            </div>
          </div>
          <div className="grid grid-cols-12 mb-208 gap-24">
            <div className="col-start-1 col-span-4">
              <TestimonialCard
                image="/testimonial-img-1.png"
                name={testimonialsData.user_stories.data[0].attributes.name}
                content={`"${testimonialsData.user_stories.data[0].attributes.story}`}
                buttonCTA={testimonialsData.user_stories.data[0].attributes.button.href_text}
                buttonHref={testimonialsData.user_stories.data[0].attributes.button.href_src}
              />
            </div>
            <div className="col-start-5 col-span-4">
              <TestimonialCard
                image="/testimonial-img-2.png"
                name={testimonialsData.user_stories.data[1].attributes.name}
                content={`"${testimonialsData.user_stories.data[1].attributes.story}`}
                buttonCTA={testimonialsData.user_stories.data[1].attributes.button.href_text}
                buttonHref={testimonialsData.user_stories.data[1].attributes.button.href_src}
              />
            </div>
            <div className="col-start-9 col-span-4">
              <TestimonialCard
                image="/testimonial-img-3.png"
                name={testimonialsData.user_stories.data[2].attributes.name}
                content={`"${testimonialsData.user_stories.data[2].attributes.story}`}
                buttonCTA={testimonialsData.user_stories.data[2].attributes.button.href_text}
                buttonHref={testimonialsData.user_stories.data[2].attributes.button.href_src}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
