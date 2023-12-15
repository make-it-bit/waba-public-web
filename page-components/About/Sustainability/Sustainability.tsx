import React from "react";

const Sustainability = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <video
        autoPlay
        muted
        loop
        className="absolute top-0 left-0 w-full h-full object-cover z-[-1]"
      >
        <source src="/about-us-sustainability-video.mp4" type="video/mp4" />
      </video>
      <div className="container">
        <div className="grid grid-cols-12">
          <div className="col-start-4 col-span-6 text-center my-272">
            <div className="flex flex-col gap-32 text-white-100">
              <h1 className="font-rufina text-5xl leading-5xl">
                Our Commitment to Sustainability and Ethicality
              </h1>
              <p className="text-base leading-base">
                At WABA, we firmly believe that progress should never compromise
                our planet. Sustainability lies at the core of everything we do.
                From the inception of our devices, we carefully consider each
                step to minimize our ecological footprint. We use eco-friendly
                materials, optimize energy efficiency, and minimize waste
                throughout our manufacturing process. Additionally, we are
                committed to ensuring fair and ethical manufacturing
                environments for our products.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sustainability;
