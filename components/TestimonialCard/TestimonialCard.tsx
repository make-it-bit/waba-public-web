import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '../../gui-components/client';

type TestimonialCardProps = {
  image: string;
  name: string;
  border?: boolean;
  content: string;
  buttonCTA?: string | null;
  buttonHref?: string;
  resultImage?: string | null;
};

const TestimonialCard = ({
  image,
  name,
  border = false,
  content,
  buttonCTA = null,
  buttonHref,
  resultImage = null,
}: TestimonialCardProps) => {
  return (
    <div className="bg-white-100 flex flex-col justify-between px-40 py-32 gap-24 md:w-416">
      <Image src={image} alt="image" width={64} height={64} />
      <h1 className="font-rufina text-xl leading-xl">{name}</h1>
      {border && <div className="border border-black-20"></div>}
      <p className="text-base leading-base italic grow-1">{content}</p>
      {buttonHref && buttonCTA && (
        <div className="w-fit">
          <Link href={buttonHref}>
            <Button CTA={buttonCTA} style="secondary" svg />
          </Link>
        </div>
      )}
      {resultImage && <Image src={resultImage} alt="result image" width={336} height={240} />}
    </div>
  );
};

export default TestimonialCard;
