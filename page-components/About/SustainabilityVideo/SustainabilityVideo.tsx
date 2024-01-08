'use client';

import React, { useState, useEffect } from 'react';

const SustainabilityVideo = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    setVideoLoaded(true);
  }, []);

  return (
    <>
      {videoLoaded && (
        <video autoPlay muted loop className="absolute top-0 left-0 w-full h-full object-cover z-[-1]">
          <source src="/about-us-sustainability-video.mp4" type="video/mp4" />
        </video>
      )}
    </>
  );
};

export default SustainabilityVideo;
