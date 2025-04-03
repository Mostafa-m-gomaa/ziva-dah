
import React from 'react';

const VideoBackground = () => {
  return (
    <div className="absolute top-0 left-0 h-screen w-full ">
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src="./videos/Jewelry Commercial by ZOO Cinema (360p).mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoBackground;
