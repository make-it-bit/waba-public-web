import React from "react";
import classNames from "classnames";
import Image from "next/image";

const Science = ({ background }) => {
  return (
    <>
      <div className="grid grid-cols-12 mt-184 pb-288">
        <video
          autoPlay
          muted
          loop
          className="absolute w-full h-full object-cover mix-blend-luminosity inset-0 z-[-1]"
        >
          <source src="/chest-video.mp4" type="video/mp4" />
        </video>
        <div
          className={classNames(
            "absolute w-full h-full inset-0 z-[-1]",
            background
          )}
        ></div>
        <div className="col-start-2 col-span-4 text-white-100">
          <h1 className="font-rufina text-4xl leading-4xl mb-32">
            What is Photobiomodulation?
          </h1>
          <p className="text-sm leading-sm">
            Photobiomodulation, also known as low-level light therapy, is a
            groundbreaking technology that leverages specific wavelengths of
            light to stimulate cellular activity and promote healing. It’s a
            non-invasive method that's been scientifically proven to combat the
            natural decline of collagen production that begins around the age of
            25. By energizing the cells and enhancing their regenerative
            capabilities, this technique can effectively reverse signs of aging,
            improve skin texture, and increase overall skin health. With
            continued use, photobiomodulation can lead to a visibly firmer, more
            youthful complexion.
          </p>
        </div>
        <div className="col-start-6 col-span-6"></div>
      </div>
    </>
  );
};

export default Science;
