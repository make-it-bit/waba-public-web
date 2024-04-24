import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import classNames from 'classnames';

import { Button } from '@/gui-components/client';

type TestimonialCardProps = {
  image: string;
  name: string;
  border?: boolean;
  content: string;
  buttonCTA?: string | null;
  buttonHref?: string;
  resultImage?: string | null;
  fixedWidth?: boolean;
  imageFit?: 'cover' | 'contain';
};

const TestimonialCard = ({
  image,
  name,
  border = false,
  content,
  buttonCTA = null,
  buttonHref,
  resultImage = null,
  fixedWidth = false,
  imageFit = 'contain',
}: TestimonialCardProps) => {
  return (
    <div className={classNames(!fixedWidth && 'md:col-span-4 col-span-12')}>
      <div className={classNames('bg-white-100 flex flex-col h-full', resultImage ? (imageFit === 'contain' ? 'px-40 py-32' : 'pt-32') : 'px-40 py-32')}>
        <div
          className={classNames(
            'bg-white-100 flex flex-col justify-between gap-24 h-full',
            fixedWidth && 'md:w-416',
            resultImage ? (imageFit === 'contain' ? '' : 'px-40') : ''
          )}
        >
          {image && (
            <div className="relative w-64 h-64">
              <Image src={image} alt="image" fill className="absolute w-full h-full object-cover inset-0" />
            </div>
          )}
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
        </div>
        {resultImage && (
          <div className='relative w-full h-[270px]'>
            <Image src={resultImage} alt="result image" fill objectFit={imageFit} />
          </div>)}
      </div>
    </div>
  );
};

export default TestimonialCard;
