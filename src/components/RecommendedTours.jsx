"use client";
import { RecommendedTour } from "./RecommendedTour";
import { storyblokEditable } from '@storyblok/react/rsc';

const RecommendedTours = (params) => {
  return (
    <div {...storyblokEditable(params.blok)} className="recommended-tours-main py-8 px-4 lg:py-12 bg-gray-50">
      <div className='container mx-auto w-full'>
        <h2 className="text-3xl md:text-4xl font-bold text-center text-mist-800 mb-8 lg:mb-12">
          {params.blok.headline}
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {params.blok.tours.map((tour) => (
            <RecommendedTour story={tour} key={tour.content._uid} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecommendedTours;