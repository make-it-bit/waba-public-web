'use client';

import React from 'react';
import classNames from 'classnames';

import { getImageFullUrl } from '../../../lib/strapi';

import { TestimonialCard } from '../../../components';

import styles from './_resultsTestimonials.module.scss';

const ResultsTestimonials = ({ testimonialsData }) => {
  return (
    <div className={styles.background}>
      <div className="container">
        <div className="flex flex-col overflow-x-auto">
          <div className="grid grid-cols-12">
            <div className="sm:col-start-4 col-start-1 sm:col-span-6 col-span-12 text-center sm:mt-160 sm:mb-104 my-72">
              <h1 className="font-rufina sm:text-4xl text-3xl sm:leading-4xl leading-3xl">{testimonialsData.title}</h1>
            </div>
          </div>
          <div
            className={classNames(
              'grid sm:grid-flow-col sm:auto-cols-[minmax(400px,_4fr)] sm:gap-24 gap-16 sm:mb-144 mb-72 sm:overflow-x-auto',
              styles.cards
            )}
          >
            {testimonialsData.user_stories.data.map((userStory, index) => (
              <TestimonialCard
                key={index}
                image="/testimonial-img-1.png"
                /* image={getImageFullUrl(userStory.attributes.image.data)} */
                name={userStory.attributes.name}
                border
                content={userStory.attributes.story}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsTestimonials;
