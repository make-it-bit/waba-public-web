'use client';

import React, { useEffect, useState } from 'react';

import { getImageFullUrl_client } from '@/lib/getImgFullUrl';

const LazyLoadVideo = ({
  className,
  src,
  type = 'video/mp4',
  autoPlay = true,
  muted = true,
  loop = true,
  playsInline = true,
}: {
  className: string;
  src: { attributes: { [key: string]: any } };
  type?: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  playsInline?: boolean;
}) => {
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    setVideoLoaded(true);
  }, []);

  return (
    <>
      {videoLoaded && (
        <video autoPlay={autoPlay} muted={muted} loop={loop} playsInline={playsInline} className={className}>
          <source src={getImageFullUrl_client(src)} type={type} />
        </video>
      )}
    </>
  );
};

export default LazyLoadVideo;
