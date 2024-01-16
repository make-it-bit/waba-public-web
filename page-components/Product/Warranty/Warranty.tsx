import React from 'react';
import Image from 'next/image';
import classNames from 'classnames';

import { getImageFullUrl_server } from '@/lib/getImgFullUrl';

import styles from './_warranty.module.scss';

const Warranty = ({ warrantyData }) => {
  return (
    <div className="py-72">
      <div className="container">
        <div className="grid grid-cols-12">
          <div className="col-start-1 col-span-12">
            <div className="relative flex items-center w-full md:min-h-[577px] min-h-[563px] z-10 overflow-hidden">
              <Image
                src={getImageFullUrl_server(warrantyData.background_image.data)}
                fill
                className="absolute w-full h-full object-cover object-left inset-0 z-[-1]"
                alt="product warranty image"
              />
              <div className={classNames('absolute w-full h-full top-0 left-0 z-[-1]', styles.background)}></div>
              <div className="grid grid-cols-12">
                <div className="md:col-start-7 col-start-2 md:col-span-5 col-span-10">
                  <div className="flex flex-col md:items-start items-center md:text-left text-center gap-40">
                    <Image
                      src={getImageFullUrl_server(warrantyData.icon.data)}
                      alt="warranty"
                      width={102}
                      height={102}
                      className={styles.iconSpin}
                    />
                    <div>
                      <h1 className="font-rufina text-4xl leading-4xl text-white-100 mb-16">{warrantyData.title}</h1>
                      <p className="text-sm leading-sm text-white-100">{warrantyData.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Warranty;
