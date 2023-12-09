"use client";

import React from "react";

import styles from "./_testimonials.module.scss";
import { TestimonialCard } from "../../../components";

const Testimonials = () => {
  return (
    <div className={styles.background}>
      <div className="container">
        <div className="flex flex-col">
          <div className="grid grid-cols-12">
            <div className="col-start-4 col-span-6 text-center mt-160 mb-128">
              <h1 className="font-rufina text-4xl leading-4xl text-black-100">
                Discover Skin Transformation Through User Stories
              </h1>
            </div>
          </div>
          <div className="grid grid-cols-12 mb-208 gap-24">
            <div className="col-start-1 col-span-4">
              <TestimonialCard
                image="/testimonial-img-1.png"
                name="Emily Johnson"
                content='"Since using WABA, my skin has never looked better. It&apos;s amazing how quickly I saw a reduction in fine lines and improved skin texture."'
                buttonCTA="Show Emily’s Case Study"
              />
            </div>
            <div className="col-start-5 col-span-4">
              <TestimonialCard
                image="/testimonial-img-2.png"
                name="Michael Chen"
                content='"WABA transformed my skincare routine. My skin is visibly clearer and more radiant, thanks to this incredible device."'
                buttonCTA="Show Michael’s Case Study"
              />
            </div>
            <div className="col-start-9 col-span-4">
              <TestimonialCard
                image="/testimonial-img-3.png"
                name="Emily Johnson"
                content="&quot;I was skeptical about light therapy until I tried WABA. It's been a game-changer for my skin's health and appearance!&quot;"
                buttonCTA="Show Sara’s Case Study"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
