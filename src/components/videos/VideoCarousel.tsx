
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
import { Youtube, Facebook } from 'lucide-react';

type VideoSource = 'youtube' | 'facebook';

interface Video {
  id: string;
  title: string;
  source: VideoSource;
  url: string;
  thumbnail?: string;
}

const videos: Video[] = [
  {
    id: "1",
    title: "Victoria Neiman - Breast Cancer Early Detection",
    source: "youtube",
    url: "https://www.youtube.com/embed/RvT0ql_SRfo",
  },
  {
    id: "2",
    title: "Victoria Neiman - Advances in Oncology",
    source: "youtube",
    url: "https://www.youtube.com/embed/lnqMiUNdxAs",
  },
  {
    id: "3",
    title: "Victoria Neiman - Treatment Options",
    source: "youtube",
    url: "https://www.youtube.com/embed/hZyMzEw1bM4",
  },
  {
    id: "4",
    title: "מהו סרטן כליה? עונים על כל השאלות",
    source: "facebook",
    url: "https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Fkeshet.mako%2Fvideos%2F1134048054061042%2F",
  },
  {
    id: "5",
    title: "כל התשובות לשאלות על סרטן הכליה",
    source: "facebook",
    url: "https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Fkeshet.mako%2Fvideos%2F390481672578057%2F",
  }
];

const VideoCarousel = () => {
  const { direction } = useLanguage();
  
  return (
    <Carousel
      className="mx-auto max-w-5xl"
      opts={{
        align: "center",
        loop: true,
      }}
    >
      <CarouselContent>
        {videos.map((video) => (
          <CarouselItem key={video.id} className="md:basis-2/3 lg:basis-3/5">
            <Card className="bg-white shadow-lg border-none">
              <CardContent className="p-0 aspect-video overflow-hidden">
                <div className="p-2">
                  <div className="flex items-center gap-2 mb-2">
                    {video.source === 'youtube' ? (
                      <Youtube className="h-5 w-5 text-red-600" />
                    ) : (
                      <Facebook className="h-5 w-5 text-blue-600" />
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
      <div className="mt-8 flex justify-center gap-2">
        <CarouselPrevious className="relative static transform-none mx-2" />
        <CarouselNext className="relative static transform-none mx-2" />
      </div>
    </Carousel>
  );
};

export default VideoCarousel;
