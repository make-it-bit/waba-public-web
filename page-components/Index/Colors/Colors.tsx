"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import classNames from "classnames";

import { Button } from "../../../gui-components/client";

import styles from "./_colors.module.scss";

const Colors = () => {
  const [activeColor, setActiveColor] = useState("blue");
  const router = useRouter();

  return (
    <div className="container">
      <div className="grid grid-cols-12 mb-88">
        <div className="col-start-5 col-span-4 text-center mt-160 mb-144">
          <h1 className="font-rufina text-4xl leading-4xl text-black-100">
            Not just different colors, changeable heads instead
          </h1>
        </div>
        <div className="col-start-1 col-span-4 flex flex-col justify-between text-black-100">
          <div className="mb-48" onClick={() => setActiveColor("blue")}>
            <p className="text-sm leading-sm">Blue head</p>
            <p className="font-rufina text-xl leading-xl">
              Removes skin imperfections - spots, inflammation and blemishes
            </p>
          </div>
          <div className="mb-48" onClick={() => setActiveColor("red")}>
            <p className="text-sm text-sm leading-sm">Red head</p>
            <p className="font-rufina text-xl leading-xl">
              Reduces fine lines + wrinkles and firm the skin
            </p>
          </div>
          <div onClick={() => setActiveColor("infrared")}>
            <p className="text-sm text-sm leading-sm">Infrared head</p>
            <p className="font-rufina text-xl leading-xl">
              Revitalise and balance skin tone
            </p>
          </div>
        </div>
        <div className="relative col-start-5 col-span-4 flex justify-center text-center">
          <p
            className={classNames(
              "text-8xl leading-8xl mt-56",
              styles.textBackground
            )}
          >
            Blue head
          </p>
          <Image
            src={`/${activeColor}-lights.svg`}
            alt="blue lights"
            width={287}
            height={574}
            className="absolute top-0 left-1/2 translate-x-neg-1/2"
          />
          {/* <Image
            src="/device-head-blue.png"
            alt="device's blue head"
            width={109}
            height={78}
            className="absolute top-[139px] left-[186px]"
          />
          <Image
            src="/device-body.png"
            alt="device's body"
            width={96.98}
            height={407.24}
            className="absolute top-[217px] left-[186px]"
          /> */}
        </div>
        <div className="col-start-9 col-span-5 flex flex-col justify-between">
          <p className="text-sm leading-sm mb-56">
            Blue Light therapy focuses on achieving a clearer and more
            harmonious complexion by specifically targeting common skin concerns
            such as spots, inflammation, and blemishes. This unique wavelength
            is renowned for its antibacterial properties, making it
            exceptionally effective in treating acne-prone skin.
          </p>
          <div className="flex flex-col gap-24 w-fit">
            <Button
              CTA="See the Science Behind"
              onClick={() => router.push("#")}
              svg
            />
            <Button
              style="secondary"
              CTA="Studies about Blue Light"
              onClick={() => router.push("#")}
              svg
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Colors;
