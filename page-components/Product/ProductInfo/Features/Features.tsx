import React from "react";
import Image from "next/image";

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="flex flex-col bg-white-100 p-24">
      <Image src={icon} alt="icon" width={56} height={56} />
      <p className="text-base leading-base mt-8">{title}</p>
      <p className="text-xs leading-xs">{description}</p>
    </div>
  );
};

const Features = () => {
  return (
    <div className="grid grid-cols-3 gap-x-96 gap-y-64 mt-32 mb-80">
      <FeatureCard
        icon="/icons/swivel.svg"
        title="90-degree swivelling head"
        description="Experience versatility with the 90-degree swivelling head, offering two ergonomic ways to hold and apply the device for maximum comfort and reach."
      />
      <FeatureCard
        icon="/icons/swivel.svg"
        title="90-degree swivelling head"
        description="Experience versatility with the 90-degree swivelling head, offering two ergonomic ways to hold and apply the device for maximum comfort and reach."
      />
      <FeatureCard
        icon="/icons/swivel.svg"
        title="90-degree swivelling head"
        description="Experience versatility with the 90-degree swivelling head, offering two ergonomic ways to hold and apply the device for maximum comfort and reach."
      />
      <FeatureCard
        icon="/icons/swivel.svg"
        title="90-degree swivelling head"
        description="Experience versatility with the 90-degree swivelling head, offering two ergonomic ways to hold and apply the device for maximum comfort and reach."
      />
      <FeatureCard
        icon="/icons/swivel.svg"
        title="90-degree swivelling head"
        description="Experience versatility with the 90-degree swivelling head, offering two ergonomic ways to hold and apply the device for maximum comfort and reach."
      />
      <FeatureCard
        icon="/icons/swivel.svg"
        title="90-degree swivelling head"
        description="Experience versatility with the 90-degree swivelling head, offering two ergonomic ways to hold and apply the device for maximum comfort and reach."
      />
      <FeatureCard
        icon="/icons/swivel.svg"
        title="90-degree swivelling head"
        description="Experience versatility with the 90-degree swivelling head, offering two ergonomic ways to hold and apply the device for maximum comfort and reach."
      />
      <FeatureCard
        icon="/icons/swivel.svg"
        title="90-degree swivelling head"
        description="Experience versatility with the 90-degree swivelling head, offering two ergonomic ways to hold and apply the device for maximum comfort and reach."
      />
      <FeatureCard
        icon="/icons/swivel.svg"
        title="90-degree swivelling head"
        description="Experience versatility with the 90-degree swivelling head, offering two ergonomic ways to hold and apply the device for maximum comfort and reach."
      />
    </div>
  );
};

export default Features;
