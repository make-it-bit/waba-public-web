'use client';
import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import classNames from 'classnames';

import { getImageFullUrl } from '@/lib/getImgFullUrl';

import styles from './_video.module.scss';

// TUTORIAL: https://codepen.io/Maltsbier/pen/dyYmGGq

const Video = ({ videoData }) => {
  const [video, setVideo] = useState(false);
  const boundRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setVideo(true);
    const scrollVideo = () => {
      const video = videoRef.current;
      const bound = boundRef.current;
      if (video && video.duration && bound) {
        const distanceFromTop = window.scrollY + bound.getBoundingClientRect().top;
        const rawPercentScrolled = (window.scrollY - distanceFromTop) / (bound.scrollHeight - window.innerHeight);
        const percentScrolled = Math.min(Math.max(rawPercentScrolled, 0), 1);
        video.currentTime = video.duration * percentScrolled;
      }
    };
    window.addEventListener('scroll', scrollVideo);
    return () => window.removeEventListener('scroll', scrollVideo);
  }, []);

  return (
    <div className="container">
      <div ref={boundRef} className={classNames('hidden lg:block relative', styles.videoWrapper)}>
        <div className="absolute top-96 z-10">
          <div className="grid grid-cols-12">
            <div className="col-start-5 col-span-4 text-center">
              <h1 className="font-rufina lg:text-4xl text-xl lg:leading-4xl leading-xl">{videoData.title}</h1>
            </div>
          </div>
        </div>
        {video && (
          <video
            ref={videoRef}
            muted
            preload="auto"
            className={classNames(
              'w-full h-screen sticky top-0 flex flex-col justify-center items-center',
              styles.videoWrapper__video
            )}
          >
            <source
              src={getImageFullUrl(videoData.desktop_video.data)}
              type={videoData.desktop_video.data.attributes.mime}
            />
          </video>
        )}
      </div>
      <div className="block lg:hidden">
        {videoData.mobile_images.data.map((image, index) => (
          <div className="relative" key={index}>
            <Image
              alt={image.attributes.alternativeText}
              src={getImageFullUrl(image)}
              width={image.attributes.width}
              height={image.attributes.height}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Video;
