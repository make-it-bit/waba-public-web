import React from 'react';
import Image from 'next/image';

const Wavelengths = ({ wavelengthsData }) => {
  return (
    <div className="container">
      <div className="grid grid-cols-12">
        <div className="col-start-2 col-span-5">
          <div className="flex flex-col gap-32 my-272">
            <h1 className="font-rufina text-5xl leading-5xl">{wavelengthsData.title}</h1>
            <p className="text-sm leading-sm">{wavelengthsData.description}</p>
          </div>
        </div>
        <div className="relative col-start-8 col-span-5">
          <Image
            src="/wavelength-blue.svg"
            alt="wavelength"
            width={408}
            height={171}
            className="absolute bottom-0 left-1/2 translate-x-neg-1/2"
          />
          <Image
            src="/wavelength-orange.svg"
            alt="wavelength"
            width={403}
            height={171}
            className="absolute bottom-0 left-1/2 translate-x-neg-1/2"
          />
          <Image
            src="/wavelength-pink.svg"
            alt="wavelength"
            width={408}
            height={171}
            className="absolute bottom-0 left-1/2 translate-x-neg-1/2"
          />
        </div>
      </div>
    </div>
  );
};

export default Wavelengths;
