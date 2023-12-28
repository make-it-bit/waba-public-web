import React from 'react';

const Shipping = () => {
  return (
    <div className="grid grid-cols-12 mt-64 pb-160">
      <div className="grid md:col-start-3 md:col-span-8 col-span-12 gap-y-16">
        <div className="flex flex-col gap-16 bg-white-100 p-32">
          <p className="text-base leading-base">Do you offer international shipping?</p>
          <p className="text-xs leading-xs">
            We currently offer shipping to select countries and are actively expanding our shipping destinations. Join
            our notification list to stay informed about new countries added to our shipping list.
          </p>
        </div>
        <div className="flex flex-col gap-16 bg-white-100 p-32">
          <p className="text-base leading-base">How long does shipping take?</p>
          <p className="text-xs leading-xs">
            Shipping times vary depending on your location. Express shipping within the European Union takes 1-3
            business days.
          </p>
        </div>
        <div className="flex flex-col gap-16 bg-white-100 p-32">
          <p className="text-base leading-base">How much is shipping?</p>
          <p className="text-xs leading-xs">Express shipping is included in the price of the device.</p>
        </div>
      </div>
    </div>
  );
};

export default Shipping;
