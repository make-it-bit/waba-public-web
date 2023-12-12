"use client";

import React from "react";
import classNames from "classnames";

import { TestimonialCard } from "../../../components";

import styles from "./_resultsTestimonials.module.scss";

const ResultsTestimonials = () => {
  return (
    <div className={styles.background}>
      <div className="container">
        <div className="flex flex-col overflow-x-auto">
          <div className="grid grid-cols-12">
            <div className="col-start-4 col-span-6 text-center mt-160 mb-104">
              <h1 className="font-rufina text-4xl leading-4xl text-black-100">
                Don’t just take our word on it
              </h1>
            </div>
          </div>
          <div
            className={classNames(
              "grid grid-flow-col auto-cols-[minmax(400px,_4fr)] gap-24 mb-144 overflow-x-auto",
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
