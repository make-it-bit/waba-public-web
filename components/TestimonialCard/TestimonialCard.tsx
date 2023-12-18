import React from 'react';
import Image from 'next/image';
import { Button } from '../../gui-components/client';

const TestimonialCard = ({ image, name, border = false, content, buttonCTA = null, resultImage = null }) => {
  return (
    <div className="bg-white-100 flex flex-col justify-between px-40 py-32 h-full">
      <div className="flex flex-col gap-24 mb-24">
        <Image src={image} alt="icon" width={64} height={64} />
        <h1 className="font-rufina text-xl leading-xl">{name}</h1>
        {border && <div className="border border-black-20"></div>}
        <p className="text-base leading-base italic">{content}</p>
      </div>
      {buttonCTA && (
        <div className="w-fit">
          <Button CTA={buttonCTA} style="secondary" onClick={() => console.log('midagi')} svg />
        </div>
      )}
      {resultImage && <Image src={resultImage} alt="result image" width={336} height={240} />}
    </div>
  );
};

export default TestimonialCard;
