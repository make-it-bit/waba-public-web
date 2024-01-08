'use client';

import React from 'react';

const BeamVideo = () => {
  return (
    <video
      autoPlay
      muted
      loop
      className="absolute bottom-0 mix-blend-lighten h-[1080px] w-[1920px] max-w-[1920px] rotate-180 max-md:left-1/2 max-md:transform max-md:-translate-x-[960px] md:left-[-750px] lg:left-[-650px] xl:left-[-550px] 2xl:left-[-450px]"
    >
      <source src="/device-beam.mp4" type="video/mp4" />
    </video>
  );
};

export default BeamVideo;
