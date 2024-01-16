'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';

const TextImage = ({
  title,
  content,
  image,
  imageSide,
  animation = false,
}: {
  title: string;
  content: string;
  image?: string | StaticImport;
  imageSide: string;
  animation?: boolean;
}) => {
  const topHead = useRef<HTMLImageElement>(null);
  const middleHead = useRef<HTMLImageElement>(null);
  const bottomHead = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const startAnimationOffset = 750;

      if (topHead.current) {
        const topHeadPosition = topHead.current.getBoundingClientRect();
        const isTopHeadVisible =
          topHeadPosition.top - startAnimationOffset <= window.innerHeight && topHeadPosition.top >= 0;
        if (isTopHeadVisible) {
          if (topHeadPosition.top - startAnimationOffset <= 0) {
            topHead.current.style.left = `50%`;
          } else {
            const newPosition =
              150 - (1 - Math.abs(topHeadPosition.top - startAnimationOffset) / window.innerHeight) * 100;
            topHead.current.style.left = `${newPosition}%`;
          }
        }
      }

      if (middleHead.current) {
        const middleHeadPosition = middleHead.current.getBoundingClientRect();
        const isMiddleHeadVisible =
          middleHeadPosition.top - startAnimationOffset <= window.innerHeight && middleHeadPosition.top >= 0;
        if (isMiddleHeadVisible) {
          if (middleHeadPosition.top - startAnimationOffset <= 0) {
            middleHead.current.style.left = `50%`;
          } else {
            const newPosition =
              150 - (1 - Math.abs(middleHeadPosition.top - startAnimationOffset) / window.innerHeight) * 100;
            middleHead.current.style.left = `${newPosition}%`;
          }
        }
      }

      if (bottomHead.current) {
        const bottomHeadPosition = bottomHead.current.getBoundingClientRect();
        const isBottomHeadVisible =
          bottomHeadPosition.top - startAnimationOffset <= window.innerHeight && bottomHeadPosition.top >= 0;
        if (isBottomHeadVisible) {
          if (bottomHeadPosition.top - startAnimationOffset <= 0) {
            bottomHead.current.style.left = `50%`;
          } else {
            const newPosition =
              150 - (1 - Math.abs(bottomHeadPosition.top - startAnimationOffset) / window.innerHeight) * 100;
            bottomHead.current.style.left = `${newPosition}%`;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="container my-72 overflow-hidden">
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
                {animation && (
                  <>
                    <Image
                      ref={topHead}
                      src="/changeable-head.png"
                      alt="changeable head"
                      width={145}
                      height={212}
                      className="absolute top-1/4 translate-y-neg-1/4 translate-x-neg-1/2"
                    />
                    <Image
                      ref={middleHead}
                      src="/changeable-head.png"
                      alt="changeable head"
                      width={145}
                      height={212}
                      className="absolute top-1/2 translate-y-neg-1/2 translate-x-neg-1/2"
                    />
                    <Image
                      ref={bottomHead}
                      src="/changeable-head.png"
                      alt="changeable head"
                      width={145}
                      height={212}
                      className="absolute top-3/4 translate-y-neg-3/4 translate-x-neg-1/2"
                    />
                  </>
                )}
                {image && <Image src={image} alt="about image" fill className="absolute object-cover" />}
              </div>
            </div>
          </>
        ) : (
          <>
            {image && (
              <div className="col-start-1 sm:col-span-5 col-span-12 sm:order-1 order-2 sm:my-80 mt-112">
                <div className="relative w-auto h-[670px]">
                  <Image src={image} alt="about image" fill className="absolute object-cover" />
                </div>
              </div>
            )}
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
