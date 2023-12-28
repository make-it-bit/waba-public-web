import React from 'react';

import { getImageFullUrl } from '../../../../lib/strapi';

import { TestimonialCard } from '../../../../components';

const Results = ({ title, resultsData }) => {
  return (
    <>
      <div className="grid grid-cols-12 mt-40 mb-64">
        <div className="md:col-start-5 md:col-span-4 col-span-12 text-center">
          <h1 className="font-rufina text-4xl leading-4xl">{title}</h1>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-24 pb-48">
        {resultsData.data.map((result, index) => (
          <TestimonialCard
            key={index}
            image={getImageFullUrl(result.attributes.image.data)}
            name={result.attributes.name}
            border
            content={result.attributes.story}
            resultImage={getImageFullUrl(result.attributes.result_image.data)}
          />
        ))}
      </div>
    </>
  );
};

export default Results;
