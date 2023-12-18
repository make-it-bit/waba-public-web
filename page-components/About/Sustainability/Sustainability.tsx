import React from 'react';
import classNames from 'classnames';

import styles from './_sustainability.module.scss';

const Sustainability = () => {
  return (
    <div className="relative overflow-hidden">
      <video autoPlay muted loop className="absolute top-0 left-0 w-full h-full object-cover z-[-1]">
        <source src="/about-us-sustainability-video.mp4" type="video/mp4" />
      </video>
      <div className={classNames('absolute top-0 left-0 w-full h-full z-[-1]', styles.background)}></div>
      <div className="container">
        <div className="grid grid-cols-12">
          <div className="sm:col-start-4 col-start-1 sm:col-span-6 col-span-12 text-center sm:my-272 my-112">
            <div className="flex flex-col gap-32 text-white-100">
              <h1 className="font-rufina sm:text-5xl text-3xl sm:leading-5xl leading-3xl">
                Our Commitment to Sustainability and Ethicality
              </h1>
              <p className="text-sm leading-sm">
                At WABA, we firmly believe that progress should never compromise our planet. Sustainability lies at the
                core of everything we do. From the inception of our devices, we carefully consider each step to minimize
                our ecological footprint. We use eco-friendly materials, optimize energy efficiency, and minimize waste
                throughout our manufacturing process. Additionally, we are committed to ensuring fair and ethical
                manufacturing environments for our products.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sustainability;
