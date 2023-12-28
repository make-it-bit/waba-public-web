import React from 'react';
import Image from 'next/image';
import classNames from 'classnames';

import styles from './_textImage.module.scss';

const TextImage = ({ title, content, image, imageSide, animation = false }) => {
  return (
    <div className="container my-72">
      <div className="grid grid-cols-12">
        {imageSide === 'right' ? (
          <>
            <div className="sm:col-start-2 col-start-1 sm:col-span-5 col-span-12">
              <div className="flex flex-col justify-center sm:text-left text-center gap-32 h-full">
                <h1 className="font-rufina md:text-5xl text-3xl md:leading-5xl leading-3xl">{title}</h1>
                <p className="text-sm leading-sm">{content}</p>
              </div>
            </div>
            <div className="sm:col-start-8 col-start-1 sm:col-span-5 col-span-12 sm:my-80 mt-64">
              <div className="relative w-auto h-[670px] bg-supplementary-warm-gray">
                {animation ? (
                  <>
                    <Image
                      src="/changeable-head.png"
                      alt="changeable head"
                      width={145}
                      height={212}
                      className={classNames(
                        'absolute top-1/4 translate-y-neg-1/4 left-1/2 translate-x-neg-1/2 overflow-hidden',
                        styles.image
                      )}
                    />
                    <Image
                      src="/changeable-head.png"
                      alt="changeable head"
                      width={145}
                      height={212}
                      className={classNames(
                        'absolute top-1/2 translate-y-neg-1/2 left-1/2 translate-x-neg-1/2 overflow-hidden',
                        styles.image
                      )}
                    />
                    <Image
                      src="/changeable-head.png"
                      alt="changeable head"
                      width={145}
                      height={212}
                      className={classNames(
                        'absolute top-3/4 translate-y-neg-3/4 left-1/2 translate-x-neg-1/2 overflow-hidden',
                        styles.image
                      )}
                    />
                  </>
                ) : (
                  <Image src={image} alt="about image" fill className="absolute object-cover" />
                )}
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="col-start-1 sm:col-span-5 col-span-12 sm:order-1 order-2 sm:my-80 mt-112">
              <div className="relative w-auto h-[670px]">
                <Image src={image} alt="about image" fill className="absolute object-cover" />
              </div>
            </div>
            <div className="sm:col-start-7 col-start-1 sm:col-span-5 col-span-12 sm:order-2 order-1">
              <div className="flex flex-col justify-center sm:text-left text-center gap-32 h-full sm:mt-0 mt-48">
                <h1 className="font-rufina md:text-5xl text-3xl md:leading-5xl leading-3xl">{title}</h1>
                <p className="text-sm leading-sm">{content}</p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TextImage;
