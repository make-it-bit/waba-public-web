import React from 'react';
import Image from 'next/image';
import classNames from 'classnames';

import styles from './_scienceWarranty.module.scss';

const ScienceWarranty = ({ warrantyData }) => {
  return (
    <div className="py-72">
      <div className="container">
        <div className="grid grid-cols-12">
          <div className="col-span-12">
            <div
              className={classNames(
                'relative flex md:items-center w-full min-h-[577px] z-10 overflow-hidden',
                styles.background
              )}
            >
              <Image
                src="/science-behind-doctor-img.png"
                alt="doctor"
                width={878}
                height={1228}
                className={classNames(
                  'absolute md:top-[-192px] top-64 xl:left-[-104px] lg:left-[-168px] md:left-[-272px]',
                  styles.imageTop
                )}
              />
              <div className="relative grid grid-cols-12">
                <div className="md:col-start-7 md:col-span-5 col-span-12">
                  <div className="flex flex-col gap-16 md:px-0 px-24 md:py-0 py-32 text-white-100">
                    <h1 className="font-rufina text-3xl leading-3xl">{warrantyData.quote_text}</h1>
                    <p className="text-sm leading-sm">{warrantyData.quote_author}</p>
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

export default ScienceWarranty;
