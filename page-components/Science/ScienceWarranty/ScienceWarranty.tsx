import React from 'react';
import Image from 'next/image';
import classNames from 'classnames';

import styles from './_scienceWarranty.module.scss';

const ScienceWarranty = ({ warrantyData }) => {
  return (
    <div className="py-72">
      <div className="container">
        <div className="grid grid-cols-12">
          <div className="col-start-1 col-span-12">
            <div
              className={classNames(
                'relative flex items-center w-full min-h-[577px] z-10 overflow-hidden',
                styles.background
              )}
            >
              <Image
                src="/science-behind-doctor-img.png"
                alt="doctor"
                width={878}
                height={1228}
                className="absolute top-[-192px] left-[-104px]"
              />
              <div className="grid grid-cols-12">
                <div className="col-start-7 col-span-5">
                  <div className="flex flex-col gap-16 text-white-100">
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
