"use client";

import { Slide } from "./Slide";
import { storyblokEditable } from "@storyblok/react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Slider = ({ blok }) => {
  return (
    <div {...storyblokEditable(blok)} className="img-slider-main bg-olive-50">
      <div className="slider-wrapper container py-16 w-full mx-auto px-4">
        <Swiper
          loop={true} 
          modules={[Navigation]}
          navigation
          spaceBetween={20}
          slidesPerView={1}
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
          {blok.slides.map((slide) => (
            <SwiperSlide key={slide._uid}>
              <img 
                src={slide.image.filename} 
                alt={slide.image.alt || "Slider Image"} 
                style={{ width: '100%', height: 'auto' }}
              />
              <p className="slide-title">{slide.title}</p>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Slider;
