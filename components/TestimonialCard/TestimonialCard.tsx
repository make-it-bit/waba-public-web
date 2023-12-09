import React from "react";
import Image from "next/image";
import { Button } from "../../gui-components/client";

const TestimonialCard = ({ image, name, content, buttonCTA }) => {
  return (
    <div className="bg-white-100 flex flex-col justify-between px-40 py-32 text-black-100 h-full">
      <div className="flex flex-col gap-24 mb-24">
        <Image src={image} alt="icon" width={64} height={64} />
        <h1 className="font-rufina text-xl leading-xl">{name}</h1>
        <p className="text-base leading-base italic">{content}</p>
      </div>
      <div className="w-fit">
        <Button
          CTA={buttonCTA}
          style="secondary"
          onClick={() => console.log("midagi")}
          svg
        />
      </div>
    </div>
  );
};

export default TestimonialCard;
