import React from 'react';

const Specifications = () => {
  return (
    <>
      <div className="grid grid-cols-12 mt-40 mb-48">
        <div className="col-start-5 col-span-4 text-center">
          <h1 className="font-rufina text-4xl leading-4xl">Technical Excellence</h1>
        </div>
      </div>
      <div className="grid grid-cols-12 pb-72">
        <div className="col-start-4 col-span-6">
          <div className="flex flex-col">
            <div className="flex justify-between border-b border-black-100 px-16 py-12">
              <p className="text-base leading-base">Power Density/Light wavelengths:</p>
              <div className="text-right">
                <p className="text-xs leading-xs">Blue head: 415nm - Power Density 38mW/cm2</p>
                <p className="text-xs leading-xs">Red/ IR: 630/830nm - Power Density 65 mW/cm2</p>
                <p className="text-xs leading-xs">IR/ Blue 830nm/415nm - Power Density 60 mW/cm2</p>
                <p className="text-xs leading-xs">Wavelength tolerance: +- 2nm</p>
              </div>
            </div>
            <div className="flex justify-between border-b border-black-100 px-16 py-12">
              <p className="text-base leading-base">Weight:</p>
              <div className="text-right">
                <p className="text-xs leading-xs">220g (including battery)</p>
              </div>
            </div>
            <div className="flex justify-between border-b border-black-100 px-16 py-12">
              <p className="text-base leading-base">Dimensions:</p>
              <div className="text-right">
                <p className="text-xs leading-xs">Max Diameter: 43.2mm</p>
                <p className="text-xs leading-xs">Length: 190mm</p>
              </div>
            </div>
            <div className="flex justify-between border-b border-black-100 px-16 py-12">
              <p className="text-base leading-base">Light area coverage:</p>
              <div className="text-right">
                <p className="text-xs leading-xs">14.5cm2</p>
              </div>
            </div>
            <div className="flex justify-between border-b border-black-100 px-16 py-12">
              <p className="text-base leading-base">Battery:</p>
              <div className="text-right">
                <p className="text-xs leading-xs">Battery: 2500 mAh, rechargeable Li-ion battery, type</p>
                <p className="text-xs leading-xs">Battery life expectancy: 500 cycles</p>
                <p className="text-xs leading-xs">Battery duration on a single charge: 2.5h</p>
                <p className="text-xs leading-xs">Battery charger: 4-6V adapter, USB C port</p>
              </div>
            </div>
            <div className="flex justify-between border-b border-black-100 px-16 py-12">
              <p className="text-base leading-base">Device life expectancy:</p>
              <div className="text-right">
                <p className="text-xs leading-xs">15,000 hours</p>
              </div>
            </div>
            <div className="flex justify-between border-b border-black-100 px-16 py-12">
              <p className="text-base leading-base">Operating conditions:</p>
              <div className="text-right">
                <p className="text-xs leading-xs">Operating relative humidity: 15-95%</p>
                <p className="text-xs leading-xs">Operating air pressure: 700 hPa - 1060 hPa</p>
                <p className="text-xs leading-xs">Operating temperature: +10C to 30C</p>
                <p className="text-xs leading-xs">Storage temperature: 0C to 35C</p>
              </div>
            </div>
            <div className="flex justify-between border-b border-black-100 px-16 py-12">
              <p className="text-base leading-base">Compliance for CE marking:</p>
              <div className="text-right">
                <p className="text-xs leading-xs">ISO 10993, IEC 62471-1, IEC 60601-1-2, RoHS</p>
              </div>
            </div>
            <div className="flex justify-between border-b border-black-100 px-16 py-12">
              <p className="text-base leading-base">Warranty:</p>
              <div className="text-right">
                <p className="text-xs leading-xs">2 years for full device (excluding battery)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Specifications;
