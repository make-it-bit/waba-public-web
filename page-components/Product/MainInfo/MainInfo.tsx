'use client'
import React, { useCallback, useRef, useState } from 'react';
import Image from 'next/image';

import { Tag } from '@/components';
import { getImageFullUrl_client } from '@/lib/getImgFullUrl';
import { parseProductMarkup } from '@/utils/parseMarkup';
import { Markup } from './Markup/Markup';
import { Button, NumberInput } from '@/gui-components/client';
import { useCartStore } from '@/page-components/CartContent/CartContent';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import SenjaRating from '../SenjaRating';

const MainInfo = ({ mainInfoData }) => {
  const markupDescription = parseProductMarkup(mainInfoData.new_description);
  const { setStoreQuantity } = useCartStore();
  const [quantity, setQuantity] = useState(1);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const swiperRef = useRef<SwiperRef>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setQuantity(parseInt(e.target.value));
  const addToCart = (quantity: number) => setStoreQuantity(quantity);

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
    <div className="container lg:mt-64 mt-24 lg:mb-72 mb-64">
      <div className="grid grid-cols-12 lg:gap-y-24 gap-y-32">
        {/* mobile images */}
        <div className="lg:hidden block col-span-12">
          <div className="flex gap-24 overflow-x-auto">
            {mainInfoData.images.length > 0 &&
              mainInfoData.images.map((imageData, index) => (
                <div key={index} className="relative min-w-[260px] h-[260px]">
                  <Image
                    src={getImageFullUrl_client(imageData.image.data)}
                    fill
                    quality={100}
                    className={`absolute w-full h-full object-${imageData.object_fit}`}
                    alt="product main info image"
                  />
                </div>
              ))}
          </div>
        </div>

        {/* desktop first image */}
        {mainInfoData.images[0]?.image && (
          <div className="lg:block hidden col-start-1 col-span-5">
            <div className="relative w-full h-full min-h-[520px]">
              <Swiper
                ref={swiperRef}
                className="h-full w-full z-0"
              >
                {mainInfoData.images.slice(5,9).map((image, index) => (
                  <SwiperSlide key={index}>
                    <Image
                      src={getImageFullUrl_client(image.image.data)}
                      fill
                      quality={100}
                      className={`absolute w-full h-full object-${image.object_fit}`}
                      alt="device"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
              <div className="absolute bg-[#f3ecee] w-full h-full top-0 left-0 z-[-1]"></div>
            </div>
          </div>
        )}

        <div className="lg:col-start-7 lg:col-span-5 col-span-12 sticky top-[201px]">
          <div className="flex flex-col">
            <div className="flex flex-wrap gap-8 lg:mb-48 mb-32">
              {mainInfoData.tags.data.map((tag, index) => (
                <Tag
                  key={index}
                  text={tag.attributes.text}
                  svg={tag.attributes.logo.data && getImageFullUrl_client(tag.attributes.logo.data)}
                />
              ))}
            </div>
            <h1 className="font-rufina text-4xl leading-4xl">{mainInfoData.title}</h1>
             <div className="flex flex-row items-start justify-start ml-[2px] my-[5px]">
             <SenjaRating />
            </div>
            <h2 className="text-2xl leading-2xl lg:my-8 my-16 text-deep-purple-100">{mainInfoData.price}</h2>
            {markupDescription && <Markup content={markupDescription}/>}
            {/* <Checkout mainInfoData={mainInfoData} /> */}
            <div className="grid grid-cols-12 mt-10 gap-5">
              <div className="md:col-span-2 col-span-12">
                <NumberInput label="Quantity" name="product-quantity" value={quantity} minValue={0} onChange={handleChange} />
              </div>
              <div className="md:col-span-4 col-span-12">
                <div className="pt-5">
                  <Button onClick={() => addToCart(quantity)} style="tertiary" otherClassnames='w-full' CTA={'Add to cart'} svg />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:block hidden col-start-1 col-span-5">
          <div className="grid grid-cols-3 gap-24">
            <div className="relative w-full h-full min-h-[416px]">
              {mainInfoData.images[9]?.image && (
                <Image
                  src={getImageFullUrl_client(mainInfoData.images[9].image.data)}
                  fill
                  quality={100}
                  className={`absolute w-full h-full object-${mainInfoData.images[9].object_fit}`}
                  alt="product main info image"
                />
              )}
            </div>
            <div className="relative w-full h-full min-h-[416px]">
              {mainInfoData.images[10]?.image && (
                <Image
                  src={getImageFullUrl_client(mainInfoData.images[10].image.data)}
                  fill
                  quality={100}
                  className={`absolute w-full h-full object-${mainInfoData.images[10].object_fit}`}
                  alt="product main info image"
                />
              )}
            </div>
            <div className="relative w-full h-full min-h-[416px]">
              {mainInfoData.images[11]?.image && (
                <Image
                  src={getImageFullUrl_client(mainInfoData.images[11].image.data)}
                  fill
                  quality={100}
                  className={`absolute w-full h-full object-${mainInfoData.images[11].object_fit}`}
                  alt="product main info image"
                />
              )}
            </div>
          </div>
        </div>

        <div className="lg:block hidden col-start-1 col-span-5">
          <div className="relative w-full h-full min-h-[217px]">
            {mainInfoData.images[4]?.image && (
              <Image
                src={getImageFullUrl_client(mainInfoData.images[4].image.data)}
                fill
                quality={100}
                className={`absolute w-full h-full object-${mainInfoData.images[4].object_fit}`}
                alt="device"
              />
            )}
          </div>
        </div>
        <div className="lg:block hidden col-start-1 col-span-5">
          <div className="relative w-full h-full min-h-[217px]">
            {mainInfoData.images[12]?.image && (
              <Image
                src={getImageFullUrl_client(mainInfoData.images[12].image.data)}
                fill
                quality={100}
                className={`absolute w-full h-full object-${mainInfoData.images[4].object_fit}`}
                alt="device"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainInfo;
