'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import classNames from 'classnames';

import styles from './_textImage.module.scss';

const TextImage = ({ title, content, image, imageSide, animation = false }) => {
  const topHead = useRef<HTMLImageElement>(null);
  const middleHead = useRef<HTMLImageElement>(null);
  const bottomHead = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      /* if (topHead.current) {
        const topHeadPosition = topHead.current.getBoundingClientRect();
        const isTopHeadVisible = topHeadPosition.top <= window.innerHeight && topHeadPosition.top >= 0;
        if (isTopHeadVisible) topHead.current.style.transform = `translateX(${window.scrollY / 3}px)`;
      }

      if (middleHead.current) {
        const middleHeadPosition = middleHead.current.getBoundingClientRect();
        const isMiddleHeadVisible = middleHeadPosition.top <= window.innerHeight && middleHeadPosition.top >= 0;
        if (isMiddleHeadVisible) middleHead.current.style.transform = `translateX(${window.scrollY / 2}px)`;
      }

      if (bottomHead.current) {
        const bottomHeadPosition = bottomHead.current.getBoundingClientRect();
        const isBottomHeadVisible = bottomHeadPosition.top <= window.innerHeight && bottomHeadPosition.top >= 0;
        if (isBottomHeadVisible) bottomHead.current.style.transform = `translateX(${window.scrollY / 1.5}px)`;
      } */
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="container my-72">
      <div className="grid grid-cols-12">
        {imageSide === 'right' ? (
          <>
            <div className="sm:col-start-2 col-start-1 sm:col-span-5 col-span-12">
              <div className="flex flex-col justify-center sm:text-left text-center gap-32 h-full">
                <h1 className="font-rufina md:text-5xl text-3xl md:leading-5xl leading-3xl">{title}</h1>
                <p className="text-sm leading-sm">{content}</p>
              </div>
            </div>
            <div className="sm:col-start-8 col-start-1 sm:col-span-5 col-span-12 sm:my-80 mt-64">
              <div className="relative w-auto h-[670px] bg-supplementary-warm-gray">
                {animation ? (
                  <>
                    <Image
                      ref={topHead}
                      src="/changeable-head.png"
                      alt="changeable head"
                      width={145}
                      height={212}
                      className={classNames(
                        'absolute top-1/4 translate-y-neg-1/4 left-1/2 translate-x-neg-1/2',
                        styles.image
                      )}
                    />
                    <Image
                      ref={middleHead}
                      src="/changeable-head.png"
                      alt="changeable head"
                      width={145}
                      height={212}
                      className={classNames(
                        'absolute top-1/2 translate-y-neg-1/2 left-1/2 translate-x-neg-1/2',
                        styles.image
                      )}
                    />
                    <Image
                      ref={bottomHead}
                      src="/changeable-head.png"
                      alt="changeable head"
                      width={145}
                      height={212}
                      className={classNames(
                        'absolute top-3/4 translate-y-neg-3/4 left-1/2 translate-x-neg-1/2',
                        styles.image
                      )}
                    />
                  </>
                ) : (
                  <Image src={image} alt="about image" fill className="absolute object-cover" />
                )}
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="col-start-1 sm:col-span-5 col-span-12 sm:order-1 order-2 sm:my-80 mt-112">
              <div className="relative w-auto h-[670px]">
                <Image src={image} alt="about image" fill className="absolute object-cover" />
              </div>
            </div>
            <div className="sm:col-start-7 col-start-1 sm:col-span-5 col-span-12 sm:order-2 order-1">
              <div className="flex flex-col justify-center sm:text-left text-center gap-32 h-full sm:mt-0 mt-48">
                <h1 className="font-rufina md:text-5xl text-3xl md:leading-5xl leading-3xl">{title}</h1>
                <p className="text-sm leading-sm">{content}</p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TextImage;
