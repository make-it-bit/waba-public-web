import React from 'react';

const Included = ({ title, includedData }) => {
  return (
    <div className="grid grid-cols-12 mt-40 pb-112">
      <div className="lg:col-start-2 lg:col-span-4 col-span-12">
        <h1 className="font-rufina text-4xl leading-4xl mb-48 lg:text-left text-center">{title}</h1>
        {includedData.map((item, index) => {
          return (
            <div key={index} className="flex flex-col border-b border-black-100 px-16 py-24">
              <p className="text-base leading-base">{item.title}</p>
              <div>
                {item.items.split('/n').map((subitem, index) => {
                  return (
                    <p key={index} className="text-xs leading-xs">
                      {subitem}
                    </p>
                  );
                })}
              </div>
            </div>
          );
        })}
        <div className="col-start-7 col-span-5"></div>
      </div>
    </div>
  );
};

export default Included;
