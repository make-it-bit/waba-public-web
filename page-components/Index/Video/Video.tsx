'use client';

import classNames from 'classnames';
import React, { useRef, useEffect } from 'react';

import styles from './_video.module.scss';

const Video = ({ videoData }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const boundRef = useRef(null);

  useEffect(() => {
    const scrollVideo = () => {
      const video = videoRef.current;
      const bound = boundRef.current;
      if (video && video.duration && bound) {
        const distanceFromTop = window.scrollY + bound.getBoundingClientRect().top;
        const rawPercentScrolled = (window.scrollY - distanceFromTop) / (bound.scrollHeight - window.innerHeight);
        const percentScrolled = Math.min(Math.max(rawPercentScrolled, 0), 1);
        video.currentTime = video.duration * percentScrolled;
      }
      requestAnimationFrame(scrollVideo);
    };
    requestAnimationFrame(scrollVideo);
  }, []);

  return (
    <div ref={boundRef} className={classNames('relative', styles.videoWrapper)}>
      <div className="md:block hidden container absolute top-96 left-1/2 translate-x-neg-1/2 z-10">
        <div className="grid grid-cols-12">
          <div className="col-start-5 col-span-4 text-center">
            <h1 className="font-rufina lg:text-4xl text-xl lg:leading-4xl leading-xl">{videoData.title}</h1>
          </div>
        </div>
      </div>
      <video
        ref={videoRef}
        muted
        autoPlay
        loop
        className="w-full h-screen z-[-1] sticky top-0 flex flex-col justify-center items-center"
        // object-cover mix-blend-luminosity
      >
        <source src="/scrollable-video.mp4" type="video/mp4" />
      </video>
    </div>
  );
};

export default Video;
