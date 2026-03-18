"use client";
import { useState } from 'react'; // 1. Import useState
import { storyblokEditable, StoryblokServerRichText } from '@storyblok/react/rsc';

const Tour = (props: any) => {
  const { blok } = props;
  const tour_options = blok.tour_options || [];

  // 2. Initialize state with the first item (index 0)
  const [selectedIndex, setSelectedIndex] = useState(0);

  // 3. Get the currently selected tour object
  const selectedTour = tour_options[selectedIndex];

  return (
    <main {...storyblokEditable(blok)} className="tour-page-main container mx-auto px-5 py-8 w-full">
      <h1 className='text-rose-900 text-center text-4xl font-bold mb-8 md:text-5xl xl:text-6xl'>
        {blok.name}
      </h1>
      
      <img 
        className='rounded-lg border-2 border-gray-600 max-h-[560px] mx-auto' 
        src={blok.main_image?.filename} 
        alt={blok.main_image?.alt || blok.name} 
      />

      <p className='mt-12 text-lg md:text-2xl'>
        {blok.introduction}
      </p>

      <div className='tour-body-main mt-12 mb-12'>
        <div className='image-container'>
          <img 
            className='img-secondary rounded-lg border-1 border-gray-600' 
            src={blok.secondary_image?.filename} 
            alt={blok.secondary_image?.alt || blok.name}
          />
        </div>
        <div className='content-container'>
          <StoryblokServerRichText doc={blok.body} />
        </div>
      </div>

      <hr className="my-10 border-gray-300" />

      {/* --- SELECT DROPDOWN SECTION --- */}
      <div className='tour-selector max-w-xl mx-auto'>
        <label htmlFor="tour-select" className="block mb-2 font-bold text-gray-700">
          Select a Tour Option:
        </label>
        <select 
          id="tour-select"
          className="w-full p-3 border-2 border-rose-900 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-rose-500"
          value={selectedIndex}
          onChange={(e) => setSelectedIndex(parseInt(e.target.value))}
        >
          {tour_options.map((option: any, index: number) => (
            <option key={option._uid || index} value={index}>
              {option.tour_name}
            </option>
          ))}
        </select>

        {/* --- DISPLAY SELECTED CONTENT --- */}
        {selectedTour && (
          <div className="mt-8 p-6 bg-rose-50 border-l-4 border-rose-900 rounded-r-lg animate-in fade-in duration-500">
            <h3 className="font-bold text-2xl text-rose-900 mb-4">
              {selectedTour.tour_name}
            </h3>
            <p className="text-gray-800 leading-relaxed mb-4">
              {selectedTour.tour_details}
            </p>
            <div className="flex justify-between items-center border-t border-rose-200 pt-4">
              <span className="font-bold text-lg text-rose-700">
                Price: {selectedTour.tour_price}
              </span>
              <span className="text-sm font-medium text-gray-600 italic">
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