import React from "react";
import Image from "next/image";

const ExampleBlock = ({ title, image, contentArray }) => {
  const subtitles = ["Target", "Protocol", "Result"];

  return (
    <div className="col-start-2 col-span-10">
      <div className="flex flex-col items-center">
        <p className="font-rufina text-4xl leading-4xl mb-64">{title}</p>
        <div className="grid grid-cols-10 gap-72">
          <div className="relative col-start-1 col-span-4">
            <Image
              src={image}
              alt="example image"
              fill
              className="absolute object-cover"
            />
          </div>
          <div className="col-start-5 col-span-6">
            <div className="flex-flex-col">
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
    </div>
  );
};

const Examples = () => {
  return (
    <div className="py-160">
      <div className="container">
        <div className="grid grid-cols-12 gap-y-160">
          <ExampleBlock
            title="Anti-aging"
            image="/example-img-1.png"
            contentArray={[
              "We currently offer shipping to select countries and are actively expanding our shipping destinations. Join our notification list to stay informed about new countries added to our shipping list.",
              "45 minutes daily for 3 months. Results can take up to 6 months dependent on skin condition.",
              "Reduced jowl and mouth wrinkles, improved overall skin tone and skin elasticity, brighter complexion.",
            ]}
          />
          <ExampleBlock
            title="Anti-aging"
            image="/example-img-1.png"
            contentArray={[
              "We currently offer shipping to select countries and are actively expanding our shipping destinations. Join our notification list to stay informed about new countries added to our shipping list.",
              "45 minutes daily for 3 months. Results can take up to 6 months dependent on skin condition.",
              "Reduced jowl and mouth wrinkles, improved overall skin tone and skin elasticity, brighter complexion.",
            ]}
          />
          <ExampleBlock
            title="Anti-aging"
            image="/example-img-1.png"
            contentArray={[
              "We currently offer shipping to select countries and are actively expanding our shipping destinations. Join our notification list to stay informed about new countries added to our shipping list.",
              "45 minutes daily for 3 months. Results can take up to 6 months dependent on skin condition.",
              "Reduced jowl and mouth wrinkles, improved overall skin tone and skin elasticity, brighter complexion.",
            ]}
          />
          <ExampleBlock
            title="Anti-aging"
            image="/example-img-1.png"
            contentArray={[
              "We currently offer shipping to select countries and are actively expanding our shipping destinations. Join our notification list to stay informed about new countries added to our shipping list.",
              "45 minutes daily for 3 months. Results can take up to 6 months dependent on skin condition.",
              "Reduced jowl and mouth wrinkles, improved overall skin tone and skin elasticity, brighter complexion.",
            ]}
          />
          <ExampleBlock
            title="Anti-aging"
            image="/example-img-1.png"
            contentArray={[
              "We currently offer shipping to select countries and are actively expanding our shipping destinations. Join our notification list to stay informed about new countries added to our shipping list.",
              "45 minutes daily for 3 months. Results can take up to 6 months dependent on skin condition.",
              "Reduced jowl and mouth wrinkles, improved overall skin tone and skin elasticity, brighter complexion.",
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default Examples;
