import React from "react";
import Image from 'next/image';

const Badges = () => {
  const badges = [
    {
      src: '/badges/year.svg',
      alt: '10 year badge',
      width: 114,
      height: 114,
      quality: 100,
    },
    {
      src: '/badges/warranty.svg',
      alt: '3 year warranty',
      width: 114,
      height: 114,
      quality: 100,
    },
    {
      src: '/badges/results.svg',
      alt: 'visible results',
      width: 114,
      height: 114,
      quality: 100,
    },
    {
      src: '/badges/certificate.svg',
      alt: 'quality certificate',
      width: 114,
      height: 114,
      quality: 100,
    },
    {
      src: '/badges/non-invasive.svg',
      alt: 'non invasive',
      width: 114,
      height: 114,
      quality: 100,
    },
    {
      src: '/badges/safe.svg',
      alt: 'safe for all',
      width: 114,
      height: 114,
      quality: 100,
    },
    {
      src: '/badges/natural.svg',
      alt: '100% natural',
      width: 114,
      height: 114,
      quality: 100,
    },
    {
      src: '/badges/money-back.svg',
      alt: 'money back',
      width: 114,
      height: 114,
      quality: 100,
    },
  ]
  return (
    <div className="grid grid-cols-4 gap-y-8 gap-8 md:flex md:flex-row justify-between py-[50px] container">
      {badges.map((badge, index) => (
        <React.Fragment key={index}>
          <Image key={index} {...badge} />
        </React.Fragment>
      ))}
    </div>
  )
}

export default Badges;