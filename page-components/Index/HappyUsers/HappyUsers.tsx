"use client";

import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/gui-components/client";
import { getVideoFullUrl_client } from "@/lib/getImgFullUrl";
import { ReactSVG } from "react-svg";

const VideoCarousel = ({ userVideos, swiperRef, onSlideChange }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [playingVideos, setPlayingVideos] = useState({});
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    const checkMobileView = () => {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    };
    checkMobileView();
    window.addEventListener("resize", checkMobileView);
    return () => window.removeEventListener("resize", checkMobileView);
  }, []);

  const isSwiper = isMobile || userVideos.length > 4;

  const handleVideoToggle = (index) => {
    videoRefs.current.forEach((video, idx) => {
      if (video) {
        if (idx === index) {
          if (video.paused) {
            video.play();
            setPlayingVideos((prev) => ({ ...prev, [index]: true }));
          } else {
            video.pause();
            setPlayingVideos((prev) => ({ ...prev, [index]: false }));
          }
        } else {
          video.pause();
          setPlayingVideos((prev) => ({ ...prev, [idx]: false }));
        }
      }
    });
  };

  if (!isSwiper) {
    return (
      <div className="w-full flex flex-row gap-5 justify-center">
        {userVideos.map((video, index) => (
          <div
            key={index}
            className="relative bg-gray-100 rounded-40 flex items-center justify-center"
            style={{ width: "300px", height: "550px" }}
          >
            <video
              ref={(el) => (videoRefs.current[index] = el)}
              muted
              loop
              playsInline
              preload="auto"
              style={{
                width: "300px",
                height: "550px",
                objectFit: "cover",
              }}
              className="rounded-40"
              onClick={() => handleVideoToggle(index)}
            >
              <source
                src={getVideoFullUrl_client(
                  video.attributes.user_video.data[0].attributes.url
                )}
                type={video.attributes.user_video.data[0].attributes.mime}
              />
            </video>
            {!playingVideos[index] && (
              <div
                onClick={() => handleVideoToggle(index)}
                className="z-10 bg-white-100 text-black h-[40px] w-[40px] flex items-center justify-center border border-black-100 cursor-pointer absolute inset-0 m-auto"
                style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
              >
                <ReactSVG src="icons/play.svg" />
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }

  return (
    <Swiper
      ref={swiperRef}
      spaceBetween={20}
      breakpoints={{
        768: {
          slidesPerView: 5,
          spaceBetween: 50,
        },
        0: {
          slidesPerView: 1.2,
          spaceBetween: 10,
        },
      }}
      allowTouchMove={false}
      className="h-full w-full col-span-12 pb-15"
      onSlideChange={onSlideChange}
      onInit={onSlideChange}
    >
      {userVideos.map((video, index) => (
        <SwiperSlide key={index}>
          <div
            className="relative bg-gray-100 rounded-40 flex items-center justify-center"
            style={{ width: "300px", height: "550px" }}
          >
            <video
              ref={(el) => (videoRefs.current[index] = el)}
              muted
              loop
              playsInline
              preload="auto"
              style={{
                width: "300px",
                height: "550px",
                objectFit: "cover",
              }}
              className="rounded-40"
              onClick={() => handleVideoToggle(index)}
            >
              <source
                src={getVideoFullUrl_client(
                  video.attributes.user_video.data[0].attributes.url
                )}
                type={video.attributes.user_video.data[0].attributes.mime}
              />
            </video>
            {!playingVideos[index] && (
              <div
                onClick={() => handleVideoToggle(index)}
                className="z-10 bg-white-100 text-black h-[40px] w-[40px] flex items-center justify-center border border-black-100 cursor-pointer absolute inset-0 m-auto"
                style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
              >
                <ReactSVG src="icons/play.svg" />
              </div>
            )}
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

const HappyUsers = ({ happyUsersData, userVideos }) => {
  const swiperRef = useRef<SwiperRef>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const handlePrev = useCallback(() => {
    if (!swiperRef.current) return;
    swiperRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!swiperRef.current) return;
    swiperRef.current.swiper.slideNext();
  }, []);

  const handleSlideChange = useCallback(() => {
    if (!swiperRef.current) return;
    const swiper = swiperRef.current.swiper;
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  }, []);

  return (
    <div className="pt-[50px]">
      <div className="flex flex-col">
        <div className="grid grid-cols-12">
          <div className="col-span-12 text-center md:mt-160 mt-72 md:mb-88 mb-40">
            <h1 className="font-rufina sm:text-6xl text-4xl sm:leading-4xl leading-3xl">
              {happyUsersData.title}
            </h1>
          </div>
        </div>
      </div>
      <div className="md:mb-80 mb-40">
        <VideoCarousel
          userVideos={userVideos}
          swiperRef={swiperRef}
          onSlideChange={handleSlideChange}
        />
      </div>
      <div className="flex flex-row justify-center gap-10">
        <Button
          svg
          outline
          otherClassnames="py-[20px]"
          style="secondary"
          size="reg"
          caretDirection="left"
          disabled={isBeginning}
          onClick={handlePrev}
        />
        <Button
          svg
          outline
          otherClassnames="py-[20px]"
          style="secondary"
          size="reg"
          caretDirection="right"
          disabled={isEnd}
          onClick={handleNext}
        />
      </div>
    </div>
  );
};

export default HappyUsers;
