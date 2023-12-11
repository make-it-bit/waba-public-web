import React from "react";

import { TestimonialCard } from "../../../../components";

const Results = () => {
  return (
    <>
      <div className="grid grid-cols-12 mt-72 mb-64">
        <div className="col-start-5 col-span-4 text-center">
          <h1 className="font-rufina text-4xl leading-4xl text-black-100">
            Real people, real stories, real results
          </h1>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-24 pb-48">
        <div className="col-start-1 col-span-4">
          <TestimonialCard
            image="/testimonial-img-1.png"
            name="Emily Johnson"
            border
            content='"Since using WABA, my skin has never looked better. It&apos;s amazing how quickly I saw a reduction in fine lines and improved skin texture."'
            resultImage="/results-img-1.png"
          />
        </div>
        <div className="col-start-5 col-span-4">
          <TestimonialCard
            image="/testimonial-img-2.png"
            name="Michael Chen"
            border
            content='"WABA transformed my skincare routine. My skin is visibly clearer and more radiant, thanks to this incredible device."'
            resultImage="/results-img-2.png"
          />
        </div>
        <div className="col-start-9 col-span-4">
          <TestimonialCard
            image="/testimonial-img-3.png"
            name="Emily Johnson"
            border
            content="&quot;I was skeptical about light therapy until I tried WABA. It's been a game-changer for my skin's health and appearance!&quot;"
            resultImage="/results-img-3.png"
          />
        </div>
      </div>
    </>
  );
};

export default Results;
