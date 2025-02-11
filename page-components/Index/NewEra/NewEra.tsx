'use client';

import React from 'react';
import Image from 'next/image';
import { Badges } from '@/components';

const NewEraBlock = ({ title, description, isLast }) => {
  return (
    <div
      className={`border-2 w-full border-black-100 ${
        isLast ? '' : 'mb-9'
      } p-5`}
    >
      <h1 className="font-rufina sm:text-4xl text-4xl sm:leading-4xl leading-3xl mb-8">
        {title}
      </h1>
      <p className="leading-3xl">
        {description}
      </p>
    </div>
  );
};

const NewEra = ({ newEraData }) => {
  const currentImage = '/mask.jpg';
  const splitArrayIntoTwo = (arr) => [arr.slice(0, 3), arr.slice(3)];
  const arraySplit = splitArrayIntoTwo(newEraData.new_era_list);

  const numberOfDots = newEraData.new_era_list.length;
  const totalDuration = 3;
  const delayBetweenDots = totalDuration / numberOfDots;
  const arcRadius = 150;
  const startAngle = 135;
  const endAngle = 225;

  return (
    <div className="md:container md:pb-[108px]">
      <div className="w-screen relative md:hidden h-[500px] bg-[#F3ECEE] py-[50px]">
        <div className="container">
          <h1 className="font-rufina sm:text-6xl text-3xl">
            {newEraData.title}
          </h1>
          <p className="pt-5">{newEraData.title_sm}</p>
        </div>
        <div className="relative w-[200px] h-[200px] left-[180px] top-[150px]">
          {newEraData.new_era_list.map((item, index) => {
            const angle =
              startAngle + ((index / (numberOfDots - 1)) * (endAngle - startAngle));

            return (
              <div
                key={index}
                className="absolute flex items-center"
                style={{
                  transform: `rotate(${angle}deg) translate(${arcRadius}px) rotate(-${angle}deg)`,
                  transformOrigin: 'center',
                }}
              >
                <div className="relative">
                  <div className="w-[10px] h-[10px] bg-purple-500 rounded-[10px]"></div>
                  <div
                    className={`absolute top-0 left-0 w-[10px] h-[10px] bg-purple-500 rounded-[10px] opacity-0 animate-rippleBeacon`}
                    style={{
                      animationDelay: `${index * delayBetweenDots}s`,
                      animationDuration: `${totalDuration}s`,
                    }}
                  ></div>
                </div>
                <div className="ml-7 font-rufina text-2xl font-bold">{item.title}</div>
              </div>
            );
          })}
        </div>
        <div className="relative">
          <Image
              src="/mobile-blue-light.png"
              alt="mobile woman blue light"
              width={170}
              height={100}
              quality={100}
              className="absolute right-0 -bottom-[145px] object-cover"
            />
        </div>
      </div>
      <div className="hidden md:flex md:flex-col">
        <div className="grid grid-cols-12">
          <div className="col-span-12 text-center md:mt-50 mt-72 md:mb-88 mb-40">
            <h1 className="font-rufina sm:text-6xl text-4xl sm:leading-4xl leading-3xl">
              {newEraData.title}
            </h1>
            <p className="leading-3xl pt-5">{newEraData.title_sm}</p>
          </div>
        </div>
        <div className="grid grid-cols-12 md:mb-80 mb-40 gap-10">
          <div className="md:col-span-4 col-span-12 flex flex-col">
            {arraySplit[0].map((data, index) => (
              <NewEraBlock key={`first_row_${index}`} title={data.title} description={data.description} isLast={index === arraySplit[0].length - 1} />
            ))}
          </div>
          <div className="md:col-span-4 col-span-12 flex items-stretch">
            <Image
              src={currentImage}
              alt="woman blue light"
              width={415}
              height={450}
              quality={100}
              className="w-full h-auto object-cover self-stretch"
            />
          </div>
          <div className="md:col-span-4 col-span-12 flex flex-col">
            {arraySplit[1].map((data, index) => (
              <NewEraBlock key={`second_row_${index}`} title={data.title} description={data.description} isLast={index === arraySplit[0].length - 1} />
            ))}
          </div>
        </div>
      </div>
      <Badges otherClassNames="py-[50px]"/>
    </div>
  );
};

export default NewEra;
