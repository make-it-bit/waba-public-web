import React from 'react';
import Image from 'next/image';
import classNames from 'classnames';

import styles from './_formPagesHero.module.scss';

const FormPagesHero = ({ image, title, content }) => {
  return (
    <div className="relative z-10">
      <Image
        src={image}
        alt="waba business-careers image"
        quality={100}
        fill
        className="absolute w-full h-full object-cover inset-0 z-[-1]"
      />
      <div className={classNames('absolute w-full h-full top-0 left-0 z-[-1]', styles.background)}></div>
      <div className="container">
        <div className="grid grid-cols-12 lg:grid-flow-col grid-flow-row gap-y-24 lg:pt-192 lg:pb-464 py-104">
          <div className="lg:col-start-2 col-start-1 lg:col-span-4 col-span-12">
            <div className="flex lg:justify-start justify-center lg:items-end h-full">
              <h1 className="font-rufina lg:text-7xl text-5xl lg:leading-7xl leading-5xl text-white-100">{title}</h1>
            </div>
          </div>
          <div className="lg:col-start-7 col-start-1 lg:col-span-5 col-span-12">
            <div className="flex lg:items-end h-full">
              <p className="text-sm leading-sm lg:text-left text-center text-supplementary-warm-gray">{content}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormPagesHero;
