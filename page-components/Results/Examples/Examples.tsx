import React from 'react';
import Image from 'next/image';

const ExampleBlock = ({ title, image, contentArray }) => {
  const subtitles = ['Target', 'Protocol', 'Result'];

  return (
    <div className="lg:col-start-2 col-start-1 lg:col-span-10 col-span-12">
      <p className="font-rufina text-4xl leading-4xl text-center md:mb-64 mb-40">{title}</p>
      <div className="grid lg:grid-cols-10 grid-cols-12">
        <div className="col-start-1 lg:col-span-4 md:col-span-5 col-span-12">
          <div className="relative w-auto md:h-auto h-[272px] mb:mb-0 mb-72">
            <Image src={image} alt="example image" fill className="absolute object-cover" />
          </div>
        </div>
        <div className="lg:col-start-5 md:col-start-6 col-start-1 lg:col-span-6 md:col-span-7 col-span-12">
          <div className="flex-flex-col md:ml-48">
            {contentArray.map((content, index) => (
              <div key={index} className="p-16 border-b border-black-100">
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

const Examples = () => {
  return (
    <div className="md:py-160 py-72">
      <div className="container">
        <div className="grid grid-cols-12 md:gap-y-160 gap-y-72">
          <ExampleBlock
            title="Anti-aging"
            image="/example-img-1.png"
            contentArray={[
              'We currently offer shipping to select countries and are actively expanding our shipping destinations. Join our notification list to stay informed about new countries added to our shipping list.',
              '45 minutes daily for 3 months. Results can take up to 6 months dependent on skin condition.',
              'Reduced jowl and mouth wrinkles, improved overall skin tone and skin elasticity, brighter complexion.',
            ]}
          />
          <ExampleBlock
            title="Anti-aging"
            image="/example-img-1.png"
            contentArray={[
              'We currently offer shipping to select countries and are actively expanding our shipping destinations. Join our notification list to stay informed about new countries added to our shipping list.',
              '45 minutes daily for 3 months. Results can take up to 6 months dependent on skin condition.',
              'Reduced jowl and mouth wrinkles, improved overall skin tone and skin elasticity, brighter complexion.',
            ]}
          />
          <ExampleBlock
            title="Anti-aging"
            image="/example-img-1.png"
            contentArray={[
              'We currently offer shipping to select countries and are actively expanding our shipping destinations. Join our notification list to stay informed about new countries added to our shipping list.',
              '45 minutes daily for 3 months. Results can take up to 6 months dependent on skin condition.',
              'Reduced jowl and mouth wrinkles, improved overall skin tone and skin elasticity, brighter complexion.',
            ]}
          />
          <ExampleBlock
            title="Anti-aging"
            image="/example-img-1.png"
            contentArray={[
              'We currently offer shipping to select countries and are actively expanding our shipping destinations. Join our notification list to stay informed about new countries added to our shipping list.',
              '45 minutes daily for 3 months. Results can take up to 6 months dependent on skin condition.',
              'Reduced jowl and mouth wrinkles, improved overall skin tone and skin elasticity, brighter complexion.',
            ]}
          />
          <ExampleBlock
            title="Anti-aging"
            image="/example-img-1.png"
            contentArray={[
              'We currently offer shipping to select countries and are actively expanding our shipping destinations. Join our notification list to stay informed about new countries added to our shipping list.',
              '45 minutes daily for 3 months. Results can take up to 6 months dependent on skin condition.',
              'Reduced jowl and mouth wrinkles, improved overall skin tone and skin elasticity, brighter complexion.',
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default Examples;
