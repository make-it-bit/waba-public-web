'use client';

import React, { useEffect, useState } from 'react';

const LazyLoadVideo = ({
  className,
  src,
  type = 'video/mp4',
  autoPlay = true,
  muted = true,
  loop = true,
}: {
  className: string;
  src: string;
  type?: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
}) => {
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    setVideoLoaded(true);
  }, []);

  return (
    <>
      {videoLoaded && (
        <video autoPlay={autoPlay} muted={muted} loop={loop} className={className}>
          <source src={src} type={type} />
        </video>
      )}
    </>
  );
};

export default LazyLoadVideo;
