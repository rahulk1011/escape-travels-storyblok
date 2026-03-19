"use client";
import { useState, useEffect } from 'react';
import { storyblokEditable, StoryblokServerRichText } from '@storyblok/react/rsc';
import { getStoryblokApi } from "../lib/storyblok";
import { useRouter } from 'next/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const fetchAllTours = async () => {
  const client = getStoryblokApi();
  const response = await client.getStories({
    content_type: "tour",
    version: process.env.NODE_ENV === "development" ? "draft" : "published",
  });
  return response.data.stories;
};

const Tour = (props: any) => {
  const { blok } = props;
  const tour_options = blok.tour_options || [];

  // State for the local tour options
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedTour = tour_options[selectedIndex];

  // State for "All Tours" fetched from Storyblok
  const [allTours, setAllTours] = useState<any[]>([]);

  useEffect(() => {
    const fetchTours = async () => {
      const client = getStoryblokApi();
      const response = await client.getStories({
        content_type: "tour",
        version: process.env.NODE_ENV === "development" ? "draft" : "published",
      });
      setAllTours(response.data.stories);
    };

    fetchTours();
  }, []);

  const router = useRouter();

  const handleBookTour = () => {
    if (!selectedTour) return;

    // Create a URL with query parameters
    const params = new URLSearchParams({
      city: blok.name,
      name: selectedTour.tour_name,
      price: selectedTour.tour_price.toString().replace(/[^0-9.]/g, ''), // Strip currency symbols
    });

    router.push(`/booking?${params.toString()}`);
  };

  return (
    <main {...storyblokEditable(blok)} className="tour-page-main container mx-auto p-5 sm:p-6 md:p-8 w-full">
      <h1 className='text-rose-900 text-center text-4xl font-bold mt-4 mb-8 md:text-5xl xl:text-6xl'>
        {blok.name}
      </h1>
      <p className='tour-introduction mb-8'>
        {blok.introduction}
      </p>
      <div className="slider-wrapper container py-16 w-full mx-auto px-4">
        <Swiper
          loop={true} 
          modules={[Autoplay, Navigation]}
          centeredSlides={true}
          navigation
          spaceBetween={20}
          slidesPerView={1}
          autoplay={{ delay: 2000, disableOnInteraction: false, }}
          breakpoints={{
            1024: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            1536: {
              slidesPerView: 3,
              spaceBetween: 40,
            },
          }}
          className="custom-swiper-slider"
        >
          {blok.img_slider.map((slide) => (
            <SwiperSlide key={slide._uid}>
              <img 
                className="rounded-lg border-1 border-gray-600"
                src={slide.image.filename} 
                alt={slide.image.alt || "Slider Image"} 
                style={{ width: '100%', height: 'auto' }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className='tour-description mb-8'>
        <StoryblokServerRichText doc={blok.body} />
      </div>

      <hr className="mb-10 border-gray-500" />

      {/* Internal Tour Options Selector */}
      <div className='tour-selector mx-auto flex flex-col justify-between mb-8'>
        <div className='w-full lg:max-w-2/5 mb-8'>
          <label htmlFor="tour-select" className="block mb-2 font-bold text-lg text-gray-700">Select a Tour Option:</label>
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
            <div className="flex flex-col sm:flex-row justify-between items-start border-t border-rose-200 py-4">
              <span className="font-semibold text-lg text-rose-700 mb-4 sm:mb-0">
                Price: {selectedTour.tour_price}
              </span>
              <span className="text-base font-medium text-gray-700 italic">
                Duration: {selectedTour.tour_duration}
              </span>
            </div>
            <button 
              onClick={handleBookTour}
              className='mt-4 bg-green-700 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-green-900 transition-colors'
            >
              Book Tour
            </button>
          </div>
        )}
      </div>

      <hr className="mb-10 border-gray-500" />

      {/* External Tour List Selector (Fetches all Tour stories) */}
      <div className='tour-list mx-auto mb-8 mx-auto flex flex-col justify-between'>
        <div className='w-full lg:max-w-2/5 mb-8'>
          <label htmlFor="tour-list" className="block mb-2 font-bold text-lg text-gray-700">Explore Other Tours:</label>
          <select 
            id="tour-list"
            className="w-full p-4 border-2 border-rose-900 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-rose-500"
            onChange={(e) => {
                // Navigate to the tour page if a user selects one
                if(e.target.value) window.location.href = `/${e.target.value}`;
            }}
          >
            <option value="">Choose a tour...</option>
            {allTours.map((tour) => (
              <option key={tour.uuid} value={tour.full_slug}>
                {tour.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </main>
  );
}

export default Tour;