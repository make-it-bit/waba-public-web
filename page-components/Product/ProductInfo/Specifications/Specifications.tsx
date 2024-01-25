import React from 'react';

const Specifications = ({ title, specificationsData }) => {
  return (
    <>
      <div className="grid grid-cols-12 mt-40 mb-48">
        <div className="lg:col-start-5 lg:col-span-4 col-span-12 text-center">
          <h1 className="font-rufina text-4xl leading-4xl">{title}</h1>
        </div>
      </div>
      <div className="grid grid-cols-12 pb-72">
        <div className="lg:col-start-4 lg:col-span-6 col-span-12">
          <div className="flex flex-col">
            {specificationsData.map((specification, index) => (
              <div key={index} className="flex justify-between items-center border-b border-black-100 px-16 py-12">
                <p className="text-base leading-base">{specification.title}:</p>
                <div className="text-right">
                  {specification.items.split('\n').map((data, index) => (
                    <p key={index} className="text-xs leading-xs">
                      {data}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Specifications;
