import React from "react";
import Image from "next/image";

const TextImage = ({ title, content, image, imageSide }) => {
  return (
    <div className="container">
      <div className="grid grid-cols-12">
        {imageSide === "right" ? (
          <>
            <div className="col-start-2 col-span-5">
              <div className="flex flex-col justify-center gap-32 h-full">
                <h1 className="font-rufina text-5xl leading-5xl">{title}</h1>
                <p className="text-base leading-base">{content}</p>
              </div>
            </div>
            <div className="col-start-8 col-span-5 my-80">
              <div className="relative w-[526px] h-[670px]">
                <Image
                  src={image}
                  alt="about image"
                  fill
                  className="absolute object-cover"
                />
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="col-start-1 col-span-5 my-80">
              <div className="relative w-[526px] h-[670px]">
                <Image
                  src={image}
                  alt="about image"
                  fill
                  className="absolute object-cover"
                />
              </div>
            </div>
            <div className="col-start-7 col-span-5">
              <div className="flex flex-col gap-32 my-248">
                <h1 className="font-rufina text-5xl leading-5xl">{title}</h1>
                <p className="text-base leading-base">{content}</p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TextImage;
