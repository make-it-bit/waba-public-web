import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import classNames from 'classnames';

import { getImageFullUrl_server } from '@/lib/getImgFullUrl';

import { Button } from '@/gui-components/client';

import styles from './_difference.module.scss';

const Difference = ({ differenceData }) => {
  return (
    <div className={classNames('relative', styles.background)}>
      <div className="container">
        <div className="grid grid-cols-12">
          <div className="md:col-start-2 col-start-1 md:col-span-5 col-span-12">
            <div className="flex flex-col md:text-left text-center gap-24 md:mt-392 mt-328 md:mb-184 mb-72">
              <h1 className="font-rufina md:text-5xl text-3xl md:leading-5xl leading-3xl text-white-100">
                {differenceData.title}
              </h1>
              {differenceData.description.split('\n').map((paragraph, index) => (
                <p key={index} className="text-sm leading-sm text-supplementary-warm-gray">
                  {paragraph}
                </p>
              ))}
              <Link href={differenceData.button.href_src} className="md:flex contents mt-16 w-fit">
                <Button CTA={differenceData.button.href_text} style="tertiary" svg />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Image
        src={getImageFullUrl_server(differenceData.device_image.data)}
        alt="device"
        width={1038}
        height={585}
        quality={100}
        className="absolute top-0 right-0"
      />
    </div>
  );
};

export default Difference;
