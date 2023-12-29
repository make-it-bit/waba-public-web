import React from 'react';
import Image from 'next/image';
import classNames from 'classnames';

import styles from './_aboutScienceHero.module.scss';

type AboutScienceHeroProps = {
  title: string;
  content: string;
  image?: string;
  video?: string;
  background?: string;
};

const AboutScienceHero = ({ title, content, image, video, background }: AboutScienceHeroProps) => {
  return (
    <div className={classNames('relative overflow-hidden', background && background)}>
      {image && (
        <>
          <Image
            src={image}
            alt="waba about image"
            fill
            className="absolute w-full h-full object-cover inset-0 z-[-1]"
          />
          <div className={classNames('absolute w-full h-full top-0 left-0 z-[-1]', styles.background)}></div>
        </>
      )}
      {video && (
        <video
          autoPlay
          muted
          loop
          className="absolute lg:top-0 top-[-112px] lg:right-[-184px] right-0 w-full h-full object-cover mix-blend-difference lg:rotate-[75deg] rotate-180"
        >
          <source src={video} type="video/mp4" />
        </video>
      )}
      <div className="container relative">
        <div className="grid grid-cols-12 md:pt-456 pt-208 md:pb-104 pb-72">
          <div className="col-start-1 md:col-span-6 col-span-12">
            <div className="flex flex-col gap-32 md:text-left text-center">
              <h1 className="font-rufina md:text-7xl text-5xl md:leading-7xl leading-5xl text-white-100">{title}</h1>
              <p className="text-base leading-base md:text-supplementary-warm-gray text-white-100">{content}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutScienceHero;
