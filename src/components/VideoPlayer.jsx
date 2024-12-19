import React from 'react';

const VideoPlayer = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <video
        width="640"
        height="360"
        controls
        className="rounded-lg shadow-lg"
      >
        <source src="/video/sample-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;
