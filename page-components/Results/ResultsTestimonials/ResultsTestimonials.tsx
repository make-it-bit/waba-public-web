'use client';

import React from 'react';
import classNames from 'classnames';

import { getImageFullUrl } from '@/lib/strapi';

import { TestimonialCard } from '@/components';

import styles from './_resultsTestimonials.module.scss';

const ResultsTestimonials = ({ testimonialsData }) => {
  const style = { '--len': `${testimonialsData.user_stories.data.length}` } as React.CSSProperties;

  return (
    <div className={classNames('overflow-hidden', styles.background)}>
      <div className="container">
        <div className="grid grid-cols-12">
          <div className="sm:col-start-4 col-start-1 sm:col-span-6 col-span-12 text-center sm:mt-160 sm:mb-104 my-72">
            <h1 className="font-rufina sm:text-4xl text-3xl sm:leading-4xl leading-3xl">{testimonialsData.title}</h1>
          </div>
        </div>
      </div>
      <div className="container md:mb-208 mb-72 md:p-0 md:m-0">
        <div className="md:flex grid grid-cols-12">
          <div style={style} className={classNames('md:flex grid col-span-12 md:gap-24 gap-16', styles.slider)}>
            {[
              ...testimonialsData.user_stories.data,
              ...testimonialsData.user_stories.data,
              ...testimonialsData.user_stories.data,
            ].map((userStory, index) => (
              <TestimonialCard
                key={index}
                image={getImageFullUrl(userStory.attributes.image.data)}
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

export default ResultsTestimonials;
