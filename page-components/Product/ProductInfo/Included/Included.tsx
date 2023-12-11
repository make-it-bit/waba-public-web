import React from "react";

const Included = () => {
  return (
    <>
      <div className="grid grid-cols-12 mt-72 pb-112">
        <div className="col-start-2 col-span-4">
          <h1 className="font-rufina text-4xl leading-4xl mb-48">
            We include everything your skin needs
          </h1>
          <div className="flex flex-col border-b border-black-100 px-16 py-24">
            <p className="text-base leading-base">1 x WABA Eclatia Device</p>
            <div>
              <p className="text-xs leading-xs">
                Versatile device with the 90-degree swivelling head
              </p>
            </div>
          </div>
          <div className="flex flex-col border-b border-black-100 px-16 py-24">
            <p className="text-base leading-base">3 x WABA Eclatia Heads</p>
            <div>
              <p className="text-xs leading-xs">1 x Blue head</p>
              <p className="text-xs leading-xs">1 x Red head</p>
              <p className="text-xs leading-xs">1 x Infrared head</p>
            </div>
          </div>
          <div className="flex flex-col border-b border-black-100 px-16 py-24">
            <p className="text-base leading-base">1 x Charging cable</p>
            <div>
              <p className="text-xs leading-xs">
                USB Type-C charging cable for your device
              </p>
            </div>
          </div>
          <div className="flex flex-col border-b border-black-100 px-16 py-24">
            <p className="text-base leading-base">1 x Carrying case</p>
            <div>
              <p className="text-xs leading-xs">
                100% vegan and recycled Saffiano leather carrying case
              </p>
            </div>
          </div>
          <div className="flex flex-col border-b border-black-100 px-16 py-24">
            <p className="text-base leading-base">1 x Velvet box</p>
            <div>
              <p className="text-xs leading-xs">
                Elegant velvet box, perfect for gifting or storing your device
                in style, ensuring it remains pristine for every use
              </p>
            </div>
          </div>
        </div>
        <div className="col-start-7 col-span-5"></div>
      </div>
    </>
  );
};

export default Included;
