'use client';

import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

import { getImageFullUrl_client } from '@/lib/getImgFullUrl';

const Video = ({ videoData }) => {
  const [currentCanvasWidth, setCurrentCanvasWidth] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const mdHeight = `md:h-[${videoData.desktop_scroll_height}vh]`;
  const smHeight = `h-[${videoData.mobile_scroll_height}vh]`;

  if (!videoData.desktop_images?.data?.length) return <p>No images found.</p>;
  if (!videoData.mobile_images?.data?.length) return <p>No images found.</p>;

  const frameCount =
    currentCanvasWidth &&
    (currentCanvasWidth >= 736 ? videoData.desktop_images.data.length : videoData.mobile_images.data.length);

  const currentFrame = (index) => {
    if (currentCanvasWidth) {
      if (currentCanvasWidth >= 736) {
        const frame = getImageFullUrl_client(videoData.desktop_images?.data?.[index]);
        return frame;
      }
      const frame = getImageFullUrl_client(videoData.mobile_images?.data?.[index]);
      return frame;
    }
  };
  // const currentFrame = (index) => {
  //   const url = `https://www.apple.com/105/media/us/airpods-pro/2019/1299e2f5_9206_4470_b28e_08307a42f19b/anim/sequence/large/01-hero-lightpass/${index}.jpg`;
  //   return url;
  // };

  const getCorrectCavasWidth = () => {
    if (window.innerWidth > 1535) return 1504;
    if (window.innerWidth > 1279) return 1248;
    if (window.innerWidth > 1023) return 992;
    if (window.innerWidth > 767) return 736;
    if (window.innerWidth > 511) return 640;
    if (window.innerWidth > 255) return 480;
    return null;
  };

  const getCorrectCanvasHeight = (width) => {
    return {
      1504: 844,
      1248: 700,
      992: 556,
      736: 412,
      640: 1140,
      480: 856,
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
      context.imageSmoothingEnabled = true;
      context.imageSmoothingQuality = 'high';
      const img = new Image();
      img.src = currentFrame(index);
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height; // <-- these two are important for preserving the aspct ratio
        context.drawImage(img, 0, 0, canvas.width, canvas.height);
      };
      //img.onload = () => context.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height);
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

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;

    const handleScroll = () => {
      if (canvas && container) {
        const scrollTop = window.scrollY;
        const containerTop = container?.offsetTop;
        const containerHeight = container?.offsetHeight;
        const canvasHeight = canvas?.offsetHeight;
        const windowHeight = window.innerHeight;
        const offset = window.innerWidth > 1023 ? 137 : 98;

        if (containerTop && containerHeight && canvasHeight) {
          // check if the canvas is in the viewport
          if (scrollTop > containerTop - offset && scrollTop < containerTop + containerHeight - canvasHeight + offset) {
            let newPosition = offset + (scrollTop - containerTop + offset);
            // limit until the middle of the screen
            newPosition = Math.min(newPosition, windowHeight / 2 - canvasHeight / 2 + offset / 2);
            canvas.style.top = `${newPosition}px`;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div ref={containerRef} className="container">
      <div className={classNames('relative flex flex-col', mdHeight, smHeight)}>
        <div className="absolute md:top-96 top-48 z-10 w-full">
          <div className="grid grid-cols-12">
            <div className="col-span-12 text-center">
              <h1 className="font-rufina sm:text-4xl sm:leading-4xl text-3xl leading-3xl">{videoData.title}</h1>
            </div>
          </div>
        </div>
        <canvas
          className={classNames(
            'sticky',
            currentCanvasWidth === 1248 && 'mt-0',
            currentCanvasWidth === 992 && 'mt-32',
            currentCanvasWidth === 736 && 'mt-80',
            currentCanvasWidth === 640 && 'mt-24',
            currentCanvasWidth === 480 && 'mt-64'
          )}
          ref={canvasRef}
        />
      </div>
    </div>
  );
};

export default Video;
