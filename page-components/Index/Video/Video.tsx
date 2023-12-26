import React from 'react';

const Video = ({ videoData }) => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <video
        autoPlay
        muted
        loop
        className="absolute top-0 left-0 w-full h-full object-cover mix-blend-luminosity z-[-1]"
      >
        <source src="/scrollable-video.mp4" type="video/mp4" />
      </video>
      <div className="container">
        <div className="grid grid-cols-12">
          <div className="col-start-5 col-span-4 text-center mt-160 mb-144">
            <h1 className="font-rufina text-4xl leading-4xl">{videoData.title}</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Video;
