
import React from 'react';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from '@/context/LanguageContext';
import { useVideos } from '@/context/VideosContext';
import { Youtube, Facebook } from 'lucide-react';

export type VideoSource = 'youtube' | 'facebook';

export interface Video {
  id: string;
  title: string;
  source: VideoSource;
  url: string;
  thumbnail?: string;
}


const VideoCarousel = () => {
  const { direction } = useLanguage();
  const { videos: contextVideos } = useVideos();
  
  // Use context videos if available, otherwise use default videos
  // const displayVideos = contextVideos.length > 0 ? contextVideos : videos;
  
  return (
    <section aria-labelledby="video-carousel-heading">
      <h2 id="video-carousel-heading" className="sr-only">Video Presentations</h2>
      <Carousel
        className="mx-auto max-w-5xl"
        opts={{
          align: "center",
          loop: true,
          direction: direction === 'rtl' ? 'rtl' : 'ltr'
        }}
        aria-roledescription="carousel"
      >
        <CarouselContent>
          {contextVideos.map((video, index) => (
            <CarouselItem 
              key={video.id} 
              className="md:basis-2/3 lg:basis-3/5"
              aria-roledescription="slide"
              aria-label={`Slide ${index + 1} of ${contextVideos.length}: ${video.title}`}
            >
              <Card className="bg-white shadow-lg border-none">
                <CardContent className="p-0 aspect-video overflow-hidden">
                  <div className="p-2">
                    <div className="flex items-center gap-2 mb-2">
                      {video.source === 'youtube' ? (
                        <Youtube className="h-5 w-5 text-red-600" aria-hidden="true" />
                      ) : (
                        <Facebook className="h-5 w-5 text-blue-600" aria-hidden="true" />
                      )}
                      <h3 className={`text-lg font-medium ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>
                        {video.title}
                      </h3>
                    </div>
                  </div>
                  <div className="aspect-video">
                    <iframe 
                      className="w-full h-full"
                      src={video.url} 
                      title={video.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen
                    ></iframe>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="mt-8 flex justify-center gap-2" style={{direction:'ltr'}}>
          <CarouselPrevious 
            className="relative static transform-none mx-2" 
            aria-label={direction === 'rtl' ? "הבא" : "Previous slide"}
          />
          <CarouselNext 
            className="relative static transform-none mx-2" 
            aria-label={direction === 'rtl' ? "הקודם" : "Next slide"}
          />
        </div>
      </Carousel>
    </section>
  );
};

export default VideoCarousel;
