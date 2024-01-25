'use client';

import React, { useState, useEffect } from 'react';

import { getImageFullUrl_client } from '@/lib/getImgFullUrl';

const SustainabilityVideo = ({ video }) => {
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    setVideoLoaded(true);
  }, []);

  return (
    <>
      {videoLoaded && (
        <video autoPlay muted loop playsInline className="absolute top-0 left-0 w-full h-full object-cover z-[-1]">
          <source src={getImageFullUrl_client(video)} type={video.attributes.mime} />
        </video>
      )}
    </>
  );
};

export default SustainabilityVideo;
