'use client';

import React from 'react';
import classNames from 'classnames';

import { TestimonialCard } from '../../../components';

import styles from './_resultsTestimonials.module.scss';

const ResultsTestimonials = () => {
  return (
    <div className={styles.background}>
      <div className="container">
        <div className="flex flex-col overflow-x-auto">
          <div className="grid grid-cols-12">
            <div className="sm:col-start-4 col-start-1 sm:col-span-6 col-span-12 text-center sm:mt-160 sm:mb-104 my-72">
              <h1 className="font-rufina sm:text-4xl text-3xl sm:leading-4xl leading-3xl">
                Don’t just take our word on it
              </h1>
            </div>
          </div>
          <div
            className={classNames(
              'grid sm:grid-flow-col sm:auto-cols-[minmax(400px,_4fr)] sm:gap-24 gap-16 sm:mb-144 mb-72 sm:overflow-x-auto',
              styles.cards
            )}
          >
            <TestimonialCard
              image="/testimonial-img-1.png"
              name="Emily Johnson"
              border
              content='"Since using WABA, my skin has never looked better. It&apos;s amazing how quickly I saw a reduction in fine lines and improved skin texture."'
            />
            <TestimonialCard
              image="/testimonial-img-2.png"
              name="Michael Chen"
              border
              content='"WABA transformed my skincare routine. My skin is visibly clearer and more radiant, thanks to this incredible device."'
            />
            <TestimonialCard
              image="/testimonial-img-3.png"
              name="Emily Johnson"
              border
              content="&quot;I was skeptical about light therapy until I tried WABA. It's been a game-changer for my skin's health and appearance!&quot;"
            />
            <TestimonialCard
              image="/testimonial-img-1.png"
              name="Emily Johnson"
              border
              content='"Since using WABA, my skin has never looked better. It&apos;s amazing how quickly I saw a reduction in fine lines and improved skin texture."'
            />
            <TestimonialCard
              image="/testimonial-img-2.png"
              name="Michael Chen"
              border
              content='"WABA transformed my skincare routine. My skin is visibly clearer and more radiant, thanks to this incredible device."'
            />
            <TestimonialCard
              image="/testimonial-img-3.png"
              name="Emily Johnson"
              border
              content="&quot;I was skeptical about light therapy until I tried WABA. It's been a game-changer for my skin's health and appearance!&quot;"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsTestimonials;
