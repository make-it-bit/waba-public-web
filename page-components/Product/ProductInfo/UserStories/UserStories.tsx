import React from 'react';

// client because the higher order component is a client component
import { getImageFullUrl_client } from '@/lib/getImgFullUrl';

import { TestimonialCard } from '@/components';

const UserStories = ({ title, userStoriesData }) => {
  return (
    <>
      <div className="grid grid-cols-12 mt-40 mb-64">
        <div className="md:col-start-5 md:col-span-4 col-span-12 text-center">
          <h1 className="font-rufina text-4xl leading-4xl">{title}</h1>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-24 pb-48">
        {userStoriesData.data.map((userStory, index) => (
          <TestimonialCard
            key={index}
            image={getImageFullUrl_client(userStory.attributes.image.data)}
            name={userStory.attributes.name}
            border
            content={userStory.attributes.story}
            resultImage={getImageFullUrl_client(userStory.attributes.result_image.data)}
          />
        ))}
      </div>
    </>
  );
};

export default UserStories;
