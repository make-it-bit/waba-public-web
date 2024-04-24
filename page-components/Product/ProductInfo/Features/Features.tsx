import React from 'react';
import Image from 'next/image';

// client because the higher order component is a client component
import { getImageFullUrl_client } from '@/lib/getImgFullUrl';

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="sm:col-span-4 col-span-12">
      <div className="flex flex-col h-full bg-white-100 p-24">
        <Image src={icon} alt="icon" width={56} height={56} quality={100} />
        <p className="text-base leading-base mt-8">{title}</p>
        <p className="text-xs leading-xs">{description}</p>
      </div>
    </div>
  );
};

const Features = ({ featuresData }) => {
  return (
    <div className="grid grid-cols-12 lg:gap-x-48 lg:gap-y-64 md:gap-x-32 md:gap-y-48 gap-x-16 gap-y-32 sm:mt-32 mt-8 sm:pb-80 pb-64">
      {featuresData.map((feature, index) => (
        <FeatureCard
          key={index}
          icon={getImageFullUrl_client(feature.icon.data[0])}
          title={feature.title}
          description={feature.description}
        />
      ))}
    </div>
  );
};

export default Features;
