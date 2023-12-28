import React from 'react';
import Image from 'next/image';

import { getImageFullUrl } from '../../../../lib/strapi';

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="sm:col-span-4 col-span-12">
      <div className="flex flex-col h-full bg-white-100 p-24">
        <Image src={icon} alt="icon" width={56} height={56} />
        <p className="text-base leading-base mt-8">{title}</p>
        <p className="text-xs leading-xs">{description}</p>
      </div>
    </div>
  );
};

const Features = ({ featuresData }) => {
  return (
    <div className="grid grid-cols-12 sm:gap-x-48 sm:gap-y-64 gap-y-16 sm:mt-32 mt-8 sm:pb-80 pb-64">
      {featuresData.map((feature, index) => (
        <FeatureCard
          key={index}
          icon={getImageFullUrl(feature.icon.data)}
          title={feature.title}
          description={feature.description}
        />
      ))}
    </div>
  );
};

export default Features;
