import React from 'react';

const Photobiomodulation = ({ photobiomodulationData }) => {
  return (
    <div className="bg-supplementary-warm-gray">
      <div className="container">
        <div className="grid grid-cols-12">
          <div className="col-start-2 col-span-4">
            <div className="flex flex-col gap-32 my-272">
              <h1 className="font-rufina text-4xl leading-4xl">{photobiomodulationData.title}</h1>
              <p className="text-sm leading-sm">{photobiomodulationData.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Photobiomodulation;
