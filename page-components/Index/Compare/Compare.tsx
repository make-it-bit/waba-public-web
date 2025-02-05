'use client'
import { ReactCompareSlider, ReactCompareSliderHandle, ReactCompareSliderImage } from "react-compare-slider";
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useCallback, useRef, useState } from "react";
import { Button } from "@/gui-components/client";
import { getImageFullUrl_client } from "@/lib/getImgFullUrl";


const Compare = ({ compareData, compareSection, isTab = false }) => {
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
    <div className="bg-[#F3ECEE] pb-[108px]">
      <div className="container">
        <div className="flex flex-col">
          <div className="grid grid-cols-12">
            <div className={
              `col-span-12 text-center ${isTab ? 'md:mt-40' : 'md:mt-160'} mt-72 md:mb-88 mb-40`
            }>
              <h1 className="font-rufina sm:text-4xl text-4xl sm:leading-4xl leading-3xl">
                {compareData.title}
              </h1>
            </div>
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
            className="h-full w-full col-span-12 pb-15 flex items-stretch"
            onSlideChange={handleSlideChange}
            onInit={handleSlideChange}
          >
            {compareSection[0].attributes.compare_card.map((card, index) => (
              <SwiperSlide key={index} className="flex">
                <div className="bg-white-100 md:col-span-4 col-span-12 p-10 flex flex-col h-full">
                  <div className="border-b-2 border-black-100 pb-7">
                    <h2 className="font-rufina text-2xl">{card.title}</h2>
                  </div>
                  <p className="pt-7 leading-2xl flex-grow">{card.description}</p>
                  <div className="w-full pt-7 mt-auto">
                    <ReactCompareSlider
                      handle={<ReactCompareSliderHandle portrait={false} buttonStyle={{
                        backdropFilter: undefined,
                        WebkitBackdropFilter: undefined,
                        backgroundColor: 'white',
                        color: '#444',
                        boxShadow: undefined,
                        border: 0,
                        borderRadius: '0px',
                        height: '30px',
                      }} /> }
                      itemOne={
                        <ReactCompareSliderImage
                          src={getImageFullUrl_client(card.before.data)}
                          alt="before"
                          className="max-h-[275px] object-cover w-full"
                        />
                      }
                      itemTwo={
                        <ReactCompareSliderImage
                          src={getImageFullUrl_client(card.after.data)}
                          alt="after"
                          className="max-h-[275px] object-cover w-full"
                        />
                      }
                    />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        {/* TO DO: move swiper button logic to separate component */}
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
  )
};

export default Compare;