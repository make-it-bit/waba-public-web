'use client';

import React, { useEffect, useRef, useState } from 'react';
import NextImage from 'next/image';

import { getImageFullUrl_client } from '@/lib/getImgFullUrl';

const Video = ({ videoData }) => {
  const [currentCanvasWidth, setCurrentCanvasWidth] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  if (!videoData.desktop_images?.data?.length) return <p>No images found</p>;

  const frameCount = videoData.desktop_images.data.length;

  const currentFrame = (index) => {
    const frame = getImageFullUrl_client(videoData.desktop_images?.data?.[index]);
    return frame;
  };

  // const currentFrame = (index) => {
  //   const url = `https://www.apple.com/105/media/us/airpods-pro/2019/1299e2f5_9206_4470_b28e_08307a42f19b/anim/sequence/large/01-hero-lightpass/${index}.jpg`;
  //   return url;
  // };

  const getCorrectCavasWidth = () => {
    if (window.innerWidth > 1535) return 1504;
    if (window.innerWidth > 1279) return 1248;
    if (window.innerWidth > 1023) return 994;
    return null;
  };

  const getCorrectCanvasHeight = (width) => {
    return {
      1504: 844,
      1248: 700,
      994: 556,
    }[width];
  };

  // set up canvas and images when page is loaded
  useEffect(() => {
    // preload images
    const preloadImages = () => {
      for (let i = 0; i < frameCount; i++) {
        const img = new Image();
        img.src = currentFrame(i);
      }
    };
    preloadImages();
    // set canvas width
    const canvas = canvasRef.current;
    if (canvas === null) return;
    const correctWidth = getCorrectCavasWidth();
    if (correctWidth === null) return;
    canvas.width = correctWidth;
    setCurrentCanvasWidth(correctWidth);
    const correctHeight = getCorrectCanvasHeight(correctWidth);
    canvas.height = correctHeight;
  }, []);

  // handle image change and canvas resize when screen size changes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas === null) return;

    const updateImage = (index) => {
      const canvas = canvasRef.current;
      if (canvas === null) return;
      const context = canvas.getContext('2d');
      if (context === null) return;
      const img = new Image();
      img.src = currentFrame(index);
      img.onload = () => context.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height);
    };
    const handleCanvasResize = () => {
      const correctWidth = getCorrectCavasWidth();
      if (correctWidth === null || correctWidth === currentCanvasWidth) return;
      canvas.width = correctWidth;
      setCurrentCanvasWidth(correctWidth);
      const correctHeight = getCorrectCanvasHeight(correctWidth);
      canvas.height = correctHeight;
    };
    const handleScroll = () => {
      if (containerRef.current) {
        const containerScrollTop = document.documentElement.scrollTop - containerRef.current.offsetTop;
        const maxScrollTop = document.documentElement.scrollHeight - window.innerHeight;
        // start the animation when the container is in the viewport
        if (containerScrollTop + 500 >= 0) {
          const scrollFraction = (containerScrollTop + 500) / (maxScrollTop * 0.45);
          const frameIndex = Math.min(frameCount - 1, Math.ceil(scrollFraction * frameCount));
          requestAnimationFrame(() => {
            if (frameIndex + 1 < frameCount) updateImage(frameIndex + 1);
          });
        }
      }
    };

    handleScroll(); // set the correct image to canvas when page is loaded

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleCanvasResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleCanvasResize);
    };
  }, [currentCanvasWidth, frameCount]);

  return (
    <div ref={containerRef} className="container">
      <div className="relative hidden lg:block h-[600vh]">
        <div className="absolute top-96 z-10 w-full">
          <div className="grid grid-cols-12">
            <div className="col-start-5 col-span-4 text-center">
              <h1 className="font-rufina text-4xl leading-4xl">{videoData.title}</h1>
            </div>
          </div>
        </div>
        <canvas className="sticky top-[137px]" ref={canvasRef} />
      </div>
      <div className="relative block lg:hidden">
        <div className="grid grid-cols-12 mb-32">
          <div className="col-span-12 text-center">
            <h1 className="font-rufina text-3xl leading-3xl">{videoData.title}</h1>
          </div>
        </div>
        {videoData.mobile_images?.data?.map((image, index) => (
          <div className="relative" key={index}>
            <NextImage
              alt={image.attributes.alternativeText}
              src={getImageFullUrl_client(image)}
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
