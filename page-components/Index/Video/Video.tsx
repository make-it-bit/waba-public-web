'use client';

import React, { useRef, useEffect, use } from 'react';

const Video = ({ videoData }) => {
  const videoRef = useRef(null);
  const boundRef = useRef(null);

  const videoIsVisibleInViewport = (video) => {
    const { top, bottom } = video.getBoundingClientRect();
    const { innerHeight } = window;
    return top >= 0 && bottom <= innerHeight;
  };

  useEffect(() => {
    const handleScroll = () => {
      const video = videoRef.current;
      if (videoIsVisibleInViewport(boundRef.current)) {
        video.play();
      } else {
        video.pause();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div ref={boundRef} className="container">
        <div className="grid grid-cols-12">
          <div className="col-start-5 col-span-4 text-center mt-160 mb-144">
            <h1 className="font-rufina text-4xl leading-4xl">{videoData.title}</h1>
          </div>
        </div>
        <video
          ref={videoRef}
          muted
          loop
          className="absolute top-0 left-0 w-full h-full object-cover mix-blend-luminosity z-[-1]"
        >
          <source src="/scrollable-video.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  );
};

export default Video;
