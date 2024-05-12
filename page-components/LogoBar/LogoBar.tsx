import React from 'react';
import Image from 'next/image';

const LogoBar = () => {
  const logos = [
    {
      src: '/logos/logo-white.svg',
      alt: 'waba logo',
      width: 96,
      height: 25,
      quality: 100,
    },
    {
      src: '/logos/logo-white-upside.svg',
      alt: 'waba logo',
      width: 96,
      height: 25,
      quality: 100,
    },
  ];

  return (
    <div className="bg-black-100 flex py-32 overflow-hidden">
      <div className="inline-flex flex-nowrap w-full">
        <div className="flex justify-center items-center [&_img]:mx-4 [&_img]:max-w-none animate-infinite-scroll-logobar">
          {Array.from({ length: 12 }).map((_, index) => (
            <React.Fragment key={index}>
              {logos.map((logo, index) => (
                <Image key={index} {...logo} />
              ))}
            </React.Fragment>
          ))}
        </div>
        <div className="flex justify-center items-center [&_img]:mx-4 [&_img]:max-w-none animate-infinite-scroll-logobar">
          {Array.from({ length: 12 }).map((_, index) => (
            <React.Fragment key={index}>
              {logos.map((logo, index) => (
                <Image key={index} {...logo} />
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LogoBar;
