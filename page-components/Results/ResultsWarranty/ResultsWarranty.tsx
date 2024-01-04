import React from 'react';
import classNames from 'classnames';

import styles from './_resultsWarranty.module.scss';

const ResultsWarranty = ({ warrantyData }) => {
  return (
    <div className="sm:py-72 pb-72 sm:mx-0 mx-16">
      <div className="container">
        <div className="grid grid-cols-12">
          <div className="col-span-12">
            <div
              className={classNames(
                'relative flex md:flex-row flex-col md:items-center items-start w-full z-10 overflow-hidden',
                styles.background
              )}
            >
              <video
                autoPlay
                muted
                loop
                className="md:absolute md:bottom-0 lg:left-[-400px] md:left-[-280px] w-full md:h-full md:object-cover object-contain md:mix-blend-lighten md:z-[-1] order-2"
              >
                <source src="/warranty-video.mp4" type="video/mp4" />
              </video>
              <div className="grid grid-cols-12 order-1">
                <div className="md:col-start-7 md:col-span-5 col-span-12">
                  <div className="flex flex-col gap-16 md:px-0 px-24 md:pt-0 pt-32 md:my-152">
                    <h1 className="font-rufina sm:text-3xl text-2xl md:leading-3xl leading-2xl text-white-100">
                      {warrantyData.quote_text}
                    </h1>
                    <p className="text-sm leading-sm text-white-100">{warrantyData.quote_author}</p>
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

export default ResultsWarranty;
