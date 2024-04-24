import React from 'react';
import Image from 'next/image';
import classNames from 'classnames';

import { getImageFullUrl_server } from '@/lib/getImgFullUrl';

const ExampleBlock = ({ title, image, contentArray, imageFit = 'cover' }) => {
  const subtitles = ['Target', 'Protocol', 'Result'];

  return (
    <div className="lg:col-start-2 col-start-1 lg:col-span-10 col-span-12">
      <p className="font-rufina md:text-4xl text-3xl md:leading-4xl leading-3xl text-center md:mb-64 mb-40">{title}</p>
      <div className="grid lg:grid-cols-10 grid-cols-12">
        <div className={classNames("col-start-1 col-span-12", imageFit === 'cover' ? 'md:col-span-5' : 'lg:col-span-4 md:col-span-5')}>
          <div className="relative w-full md:h-full h-[300px] md:mb-0 mb-64">
            <Image src={image} alt="example image" fill quality={100} className={`object-${imageFit}`} />
          </div>
        </div>
        <div className={classNames("col-start-1 lg:col-span-6 md:col-span-7 col-span-12", imageFit === 'cover' ? 'lg:col-start-6 md:col-start-6' : 'lg:col-start-5 md:col-start-6')}>
          <div className={classNames("flex-flex-col", imageFit === 'contain' && 'md:ml-48')}>
            {contentArray.map((content, index) => (
              <div
                key={index}
                className={classNames('p-16 border-black-100', index !== contentArray.length - 1 && 'border-b')}
              >
                <p className="text-base leading-base">{subtitles[index]}</p>
                <p className="text-xs leading-xs">{content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Examples = ({ examplesData }) => {
  return (
    <div className="md:py-160 py-72">
      <div className="container">
        <div className="grid grid-cols-12 md:gap-y-160 gap-y-72">
          {examplesData.examples.map((example, index) => (
            <ExampleBlock
              key={index}
              title={example.title}
              image={getImageFullUrl_server(example.image.data)}
              imageFit={example.image_fit}
              contentArray={[example.target_text, example.protocol_text, example.result_text]}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Examples;
