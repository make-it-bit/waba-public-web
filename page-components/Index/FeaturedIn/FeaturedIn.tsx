import React from 'react';
import Image from 'next/image';

const FeaturedIn = () => {
  const logos = [
    {
      src: '/logos/logo-scroll/eesti-naine.svg',
      alt: 'eesti naine logo',
      width: 118,
      height: 24,
      quality: 100,
    },
    {
      src: '/logos/logo-scroll/stylistmag.svg',
      alt: 'stylist mag logo',
      width: 118,
      height: 24,
      quality: 100,
    },
    {
      src: '/logos/logo-scroll/marie-claire.svg',
      alt: 'marie claire logo',
      width: 118,
      height: 24,
      quality: 100,
    },
    {
      src: '/logos/logo-scroll/departures.svg',
      alt: 'departures logo',
      width: 118,
      height: 24,
      quality: 100,
    },
    {
      src: '/logos/logo-scroll/forbes.svg',
      alt: 'forbes logo',
      width: 118,
      height: 24,
      quality: 100,
    },
    {
      src: '/logos/logo-scroll/allure.svg',
      alt: 'allure logo',
      width: 118,
      height: 24,
      quality: 100,
    },
    {
      src: '/logos/logo-scroll/buro.svg',
      alt: 'buro logo',
      width: 118,
      height: 24,
      quality: 100,
    },
    {
      src: '/logos/logo-scroll/grazia.svg',
      alt: 'grazia logo',
      width: 118,
      height: 24,
      quality: 100,
    },
  ];

  return (
    <div className="container">
      <div className="grid grid-cols-12">
        <div className="col-span-12 text-center">
          <p className="leading-xl pt-5">Technology featured in</p>
        </div>
      </div>
      <div className="py-32">
        <div className="hidden md:flex flex-row flex-wrap justify-between gap-y-10">
          {logos.map((logo, index) => (
            <div key={index} className="flex justify-center">
              <Image {...logo} />
            </div>
          ))}
        </div>
        <div className="flex flex-wrap md:hidden justify-center gap-y-5">
          {logos.map((logo, index) => (
            <div
              key={index}
              className={`flex justify-center ${
                index >= logos.length - 2 && logos.length % 3 === 2
                  ? 'w-1/2'
                  : 'w-1/3'
              }`}
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={90}
                height={16}
                quality={100}
                className="w-[90px] h-auto sm:w-[100px] md:w-[118px]"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedIn;
