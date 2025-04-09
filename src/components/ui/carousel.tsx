
import { Carousel as CarouselRoot } from './carousel/carousel-root';
import { CarouselContent } from './carousel/carousel-content';
import { CarouselItem } from './carousel/carousel-item';
import { CarouselPrevious } from './carousel/carousel-previous';
import { CarouselNext } from './carousel/carousel-next';
import { useCarousel, type CarouselApi } from './carousel/carousel-context';

// Re-export components
export const Carousel = CarouselRoot;
export {
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  useCarousel,
  type CarouselApi
};
