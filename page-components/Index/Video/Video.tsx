/* 'use client'; */

import React /* , { useRef, useEffect } */ from 'react';

const Video = ({ videoData }) => {
  /* const videoRef = useRef<HTMLVideoElement>(null);
  const boundRef = useRef(null);

  const videoIsVisibleInViewport = (video: HTMLVideoElement) => {
    const { top, bottom } = video.getBoundingClientRect();
    const { innerHeight } = window;
    return top >= 0 && bottom <= innerHeight;
  };

  useEffect(() => {
    const handleScroll = () => {
      const video = videoRef.current;
      if (boundRef.current && videoIsVisibleInViewport(boundRef.current)) {
        video?.play();
      } else {
        video?.pause();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); */

  return (
    <div className="relative">
      <div /* ref={boundRef} */ className="md:block hidden container absolute top-96 left-1/2 translate-x-neg-1/2 z-10">
        <div className="grid grid-cols-12">
          <div className="col-start-5 col-span-4 text-center">
            <h1 className="font-rufina lg:text-4xl text-xl lg:leading-4xl leading-xl">{videoData.title}</h1>
          </div>
        </div>
      </div>
      <video
        /* ref={videoRef} */ muted
        autoPlay
        loop
        className="w-full h-full object-cover mix-blend-luminosity z-[-1]"
      >
        <source src="/scrollable-video.mp4" type="video/mp4" />
      </video>
    </div>
  );
};

export default Video;
