'use client';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useCallback, useRef, useState } from "react";
import { Button } from "@/gui-components/client";
import Image from 'next/image';
import { getImageFullUrl_client } from '@/lib/getImgFullUrl';

const VerifiedScience = ({ verifiedScienceData, scienceArticles }) => {
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

  const navigateToPaper = (url: string) => {
    window.location.href = url;
  }

  return (
    <div className="bg-[#F3ECEE] py-[108px]">
      <div className="container">
        <div className="grid grid-cols-12">
          <div className="col-start-2 col-span-10 border-black-100 border-b pb-10">
            <h3 className="font-rufina text-5xl">{verifiedScienceData.title}</h3>
            <p className="text-sm mt-10">{verifiedScienceData.description}</p>
          </div>
        </div>
        <div className="grid grid-cols-12 md:mb-80 mb-40 md:gap-10">
          <Swiper
            ref={swiperRef}
            spaceBetween={50}
            breakpoints={{
              768: {
                slidesPerView: 3,
              },
              0: {
                slidesPerView: 1,
              },
            }}
            allowTouchMove={false}
            className="h-full w-full col-span-10 col-start-2 pb-15 flex items-stretch"
            onSlideChange={handleSlideChange}
            onInit={handleSlideChange}
          >
            {scienceArticles.map((article, index) => (
              <SwiperSlide key={index} className="flex">
                <div onClick={() => navigateToPaper(article.attributes.article_link)} className="md:col-span-4 col-span-12 pt-10 flex flex-col h-full cursor-pointer">
                  <div>
                    <h2 className="font-rufina text-3xl">{article.attributes.title}</h2>
                  </div>
                  <p className="pb-10 text-sm mt-2 flex-grow">{article.attributes.description}</p>
                  <div className="w-full pt-7 mt-auto bg-white-100 p-10 h-[260px] border-2 border-black-100 flex-shrink-0 flex items-center justify-center">
                    <div className="p-10 h-[260px] flex items-center justify-center ">
                      <Image
                        src={getImageFullUrl_client(article.attributes.institution_logo.data)}
                        alt="quote from professional"
                        width={415}
                        height={65}
                        quality={100}
                        className="object-contain h-full"
                      />
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
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
    </div>
  );
};

export default VerifiedScience;
