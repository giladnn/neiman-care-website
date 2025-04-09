
import React from 'react';
import VideoCarousel from '@/components/videos/VideoCarousel';

const VideoSection = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-4 font-serif">
            Media Appearances
          </h2>
          <div className="w-20 h-1 bg-secondary mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-gray-600">
            Watch Dr. Victoria Neiman's interviews and educational videos on various oncology topics.
          </p>
        </div>
        <VideoCarousel />
      </div>
    </section>
  );
};

export default VideoSection;
