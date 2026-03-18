"use client";
import { useState } from 'react';
import { storyblokEditable, StoryblokServerRichText } from '@storyblok/react/rsc';

const Tour = (props: any) => {
  const { blok } = props;
  const tour_options = blok.tour_options || [];
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedTour = tour_options[selectedIndex];

  return (
    <main {...storyblokEditable(blok)} className="tour-page-main container mx-auto p-5 sm:p-6 md:p-8 w-full">
      <h1 className='text-rose-900 text-center text-4xl font-bold mt-4 mb-8 md:text-5xl xl:text-6xl'>
        {blok.name}
      </h1>
      <p className='tour-introduction mb-8'>
        {blok.introduction}
      </p>
      <img className='rounded-lg border-2 border-gray-600 max-h-[400px] my-8 mx-auto' src={blok.main_image?.filename} alt={blok.main_image?.alt || blok.name} />
      <img className='rounded-lg border-2 border-gray-600 max-h-[400px] mb-8 mx-auto' src={blok.secondary_image?.filename} alt={blok.secondary_image?.alt || blok.name}/>

      <div className='tour-description mb-8'>
        <StoryblokServerRichText doc={blok.body} />
      </div>

      <hr className="mb-10 border-gray-500" />

      <div className='tour-selector mx-auto flex flex-col justify-between mb-8'>
        <div className='w-full lg:max-w-2/5 mb-8'>
          <label htmlFor="tour-select" className="block mb-2 font-bold text-gray-700">Select a Tour Option:</label>
          <select 
            id="tour-select"
            className="w-full p-4 border-2 border-rose-900 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-rose-500"
            value={selectedIndex}
            onChange={(e) => setSelectedIndex(parseInt(e.target.value))}
          >
            {tour_options.map((option: any, index: number) => (
              <option key={option._uid || index} value={index}>
                {option.tour_name}
              </option>
            ))}
          </select>
        </div>

        {selectedTour && (
          <div className="w-full p-6 bg-rose-50 border-l-4 border-rose-900 rounded-r-lg animate-in fade-in duration-500">
            <h3 className="font-bold text-2xl text-rose-900 mb-4">
              {selectedTour.tour_name}
            </h3>
            <div className="tour-details text-gray-800 mb-4">
              <StoryblokServerRichText doc={selectedTour.tour_details} />
            </div>
            <div className="flex justify-between items-center border-t border-rose-200 pt-4">
              <span className="font-semibold text-lg text-rose-700">
                Price: {selectedTour.tour_price}
              </span>
              <span className="text-base font-medium text-gray-700 italic">
                Duration: {selectedTour.tour_duration}
              </span>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default Tour;