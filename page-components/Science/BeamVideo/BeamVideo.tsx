'use client';

import React, { useRef, useEffect, useState } from 'react';
import classNames from 'classnames';

import styles from './_beamVideo.module.scss';

const BeamVideo = () => {
  const [triggerBeamVideoAnimation, setTriggerBeamVideoAnimation] = useState(false);
  const beamVideo = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (beamVideo.current) {
        const beamVideoPosition = beamVideo.current.getBoundingClientRect();
        const beamVideoInTopThirdOfScreen =
          beamVideoPosition.top <= window.innerHeight / 3 && beamVideoPosition.top >= 0;
        if (beamVideoInTopThirdOfScreen && !triggerBeamVideoAnimation) setTriggerBeamVideoAnimation(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [triggerBeamVideoAnimation]);

  return (
    <video
      ref={beamVideo}
      autoPlay
      muted
      loop
      className={classNames(
        'absolute bottom-0 mix-blend-lighten h-[1080px] w-[1920px] max-w-[1920px] rotate-180 max-md:left-1/2 max-md:transform max-md:-translate-x-[960px] md:left-[-750px] lg:left-[-650px] xl:left-[-550px] 2xl:left-[-450px]',
        styles.beamVideo,
        triggerBeamVideoAnimation && styles.beamVideo__animation
      )}
    >
      <source src="/device-beam.mp4" type="video/mp4" />
    </video>
  );
};

export default BeamVideo;
