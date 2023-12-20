import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import classNames from 'classnames';

import { Button } from '../../gui-components/client';

import styles from './_preFooterCard.module.scss';

const PreFooterCard = () => {
  return (
    <div className="container absolute left-1/2 translate-x-neg-1/2">
      <div className="grid grid-cols-12 md:grid-flow-row grid-flow-col gap-24">
        <div className="col-start-1 md:col-span-6 col-span-12">
          <div className="flex h-full">
            <div className="relative flex flex-col justify-end w-full min-h-[522px] p-64">
              <Image
                src="/pre-footer-img-1.png"
                fill
                className="absolute w-full h-full object-cover inset-0 z-[-1]"
                alt="pre-footer image"
              />
              <div className={classNames('absolute w-full h-full top-0 left-0 z-[-1]', styles.background)}></div>
              <h1 className="font-rufina text-3xl leading-3xl text-white-100">Explore the Future of Skincare</h1>
              <p className="text-sm leading-sm text-white-100 mt-24 mb-40">
                Ready to revolutionize your skin health journey? Dive into the details of our advanced light therapy
                device and see how it can transform your skincare routine. Visit our Product page to learn more and
                embark on a journey towards radiant, healthier skin.
              </p>
              <div>
                <Link href="#">
                  <Button CTA="Discover product" svg />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="md:col-start-7 col-start-1 md:col-span-6 col-span-12">
          <div className="flex h-full">
            <div className="relative flex flex-col justify-end w-full min-h-[522px] p-64">
              <Image
                src="/pre-footer-img-2.png"
                fill
                className="absolute w-full h-full object-cover inset-0 z-[-1]"
                alt="pre-footer image"
              />
              <div className={classNames('absolute w-full h-full top-0 left-0 z-[-1]', styles.background)}></div>
              <h1 className="font-rufina text-3xl leading-3xl text-white-100">
                Explore the Science of Skincare Innovation
              </h1>
              <p className="text-sm leading-sm text-white-100 mt-24 mb-40">
                Curious about how our light therapy technology works wonders for your skin? Journey through the
                cutting-edge science that powers our device. Learn more on 'The Science Behind' page.
              </p>
              <div>
                <Link href="#">
                  <Button CTA="Learn the Science" svg />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreFooterCard;
