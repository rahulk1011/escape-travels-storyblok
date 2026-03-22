'use client';

import { useState, useEffect } from 'react';
import { storyblokEditable } from "@storyblok/react/rsc";

const VideoContent = ({ blok }) => {
  const [isOpen, setIsOpen] = useState(false);

  // --- Scroll Lock Logic ---
  useEffect(() => {
    if (isOpen) {
      // Prevent scrolling
      document.body.style.overflow = 'hidden';
    } else {
      // Re-enable scrolling
      document.body.style.overflow = 'unset';
    }

    // Cleanup function: ensures scroll is restored if component unmounts
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]); 
  // --------------------------

  return (
    <section {...storyblokEditable(blok)} className="flex flex-col md:flex-row items-center gap-12 py-16 px-6 max-w-7xl mx-auto">
      <div className="flex-1">
        <h2 className="text-4xl font-bold mb-4">{blok.heading}</h2>
        <p className="text-lg text-gray-600">{blok.description}</p>
      </div>

      <div className="flex-1 relative group cursor-pointer" onClick={() => setIsOpen(true)}>
        <img src={blok.video_thumbnail?.filename} alt={blok.heading} className="rounded-xl shadow-lg w-full object-cover" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
            <div className="ml-1 w-0 h-0 border-t-[10px] border-t-transparent border-l-[15px] border-l-black border-b-[10px] border-b-transparent" />
          </div>
        </div>
      </div>

      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setIsOpen(false)} // Close when clicking the backdrop
        >
          <div 
            className="relative w-full max-w-4xl aspect-video bg-black shadow-2xl" 
            onClick={(e) => e.stopPropagation()} // Prevent click-through closing
          >
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute -top-10 right-0 text-white text-3xl hover:text-gray-300 transition-colors"
            >
              &times;
            </button>
            <iframe
              src={blok.video_url.filename}
              className="w-full h-full"
              allow="autoplay; fullscreen"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default VideoContent;