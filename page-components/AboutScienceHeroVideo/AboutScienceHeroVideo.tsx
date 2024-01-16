'use client';

import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import styles from './_aboutScienceHeroVideo.module.scss';

const AboutScienceHeroVideo = ({ video }: { video: string }) => {
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    setVideoLoaded(true);
  }, []);

  return (
    <div className="absolute w-[1920px] h-[1080px] lg:rotate-[75deg] rotate-180 left-[-1000px] md:left-[-600px] lg:left-[-400px] xl:left-0 2xl:left-256 top-[-420px]">
      {videoLoaded && (
        <video autoPlay muted loop className="w-full h-full object-cover mix-blend-difference">
          <source src={video} type="video/mp4" />
        </video>
      )}
      <div className={classNames(styles.videoOverlay, 'top-0 left-0 w-full h-full absolute')} />
    </div>
  );
};

export default AboutScienceHeroVideo;
