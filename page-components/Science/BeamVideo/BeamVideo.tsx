'use client';

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import classNames from 'classnames';

import { getImageFullUrl_client } from '@/lib/getImgFullUrl';

import styles from './_beamVideo.module.scss';

const BeamVideo = ({ video, beamImage, deviceImages }) => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [triggerBeamVideoAnimation, setTriggerBeamVideoAnimation] = useState(false);
  const beamVideo = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (beamVideo.current) {
        const beamVideoPosition = beamVideo.current.getBoundingClientRect();
        const beamVideoInPosition = beamVideoPosition.top <= window.innerHeight / 6 && beamVideoPosition.top >= 0;
        if (beamVideoInPosition && !triggerBeamVideoAnimation) setTriggerBeamVideoAnimation(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [triggerBeamVideoAnimation]);

  useEffect(() => {
    setVideoLoaded(true);
  }, []);

  return (
    <>
      {videoLoaded && (
        <video
          ref={beamVideo}
          autoPlay
          muted
          loop
          playsInline
          className={classNames(
            'absolute bottom-0 mix-blend-lighten h-[1080px] w-[1920px] max-w-[1920px] rotate-180 max-md:left-1/2 max-md:transform max-md:-translate-x-[960px] md:left-[-750px] lg:left-[-650px] xl:left-[-550px] 2xl:left-[-450px]',
            styles.beamVideo,
            triggerBeamVideoAnimation && styles.beamVideo__animation
          )}
        >
          <source src={getImageFullUrl_client(video.data)} type={video.data.attributes.mime} />
        </video>
      )}
      <Image
        src={getImageFullUrl_client(beamImage.data)}
        alt="device"
        width={232.5}
        height={459}
        quality={100}
        className={classNames(
          'absolute max-md:right-0 max-md:m-auto left-0 md:left-[85px] lg:left-[185px] xl:left-[283px] 2xl:left-[390px]',
          styles.beamRays,
          triggerBeamVideoAnimation && styles.beamRays__animation
        )}
      />
      <Image
        src={getImageFullUrl_client(deviceImages.data[2])}
        alt="device"
        width={221}
        height={407}
        quality={100}
        className="absolute bottom-[-121px] max-md:right-0 max-md:m-auto left-0 md:left-[90px] lg:left-[190px] xl:left-[290px] 2xl:left-[395px]"
      />
      <Image
        src={getImageFullUrl_client(deviceImages.data[1])}
        alt="device"
        width={243}
        height={45}
        quality={100}
        className={classNames(
          'absolute bottom-[80px] max-md:right-0 max-md:m-auto left-0 md:left-[80px] lg:left-[180px] xl:left-[280px] 2xl:left-[385px]',
          styles.beamVideo,
          triggerBeamVideoAnimation && styles.beamVideo__animation
        )}
      />
      <Image
        src={getImageFullUrl_client(deviceImages.data[0])}
        alt="device"
        width={303}
        height={123}
        quality={100}
        className={classNames(
          'absolute bottom-[150px] max-md:right-0 max-md:m-auto left-0 md:left-[50px] lg:left-[150px] xl:left-[250px] 2xl:left-[355px]',
          styles.beamVideo,
          triggerBeamVideoAnimation && styles.beamVideo__animation
        )}
      />
    </>
  );
};

export default BeamVideo;
