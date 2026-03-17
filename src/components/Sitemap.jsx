"use client";
import { storyblokEditable } from '@storyblok/react';
import Link from "next/link";
import { hexToRgba } from '../utils/colors';

export default function Sitemap({ blok }) {
  const bgColor = blok.bg_color?.color || 'transparent';
  const textColor = blok.text_color?.color || 'inherit';
  const bgImage = blok.bg_image?.filename;

  // Set default opacity if not defined in Storyblok
  const opacity = blok.overlay_opacity || 0.8;
  // Convert hex + opacity to RGBA
  const transparentOverlay = hexToRgba(blok.bg_overlay?.color, opacity);

  return (
    <div {...storyblokEditable(blok)} 
      className="relative overflow-hidden w-full pt-16 pb-16 min-h-[40rem]"
      style={{ 
        backgroundColor: bgColor,
        backgroundImage: bgImage ? `url(${bgImage})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* Background Overlay */}
      {bgImage && (
        <div 
          className="absolute inset-0 z-0" 
          style={{ backgroundColor: transparentOverlay }} 
        />
      )}

      {/* Content Container */}
      <div className="container mx-auto px-8 relative z-10">
        <h1 className="text-center text-4xl font-bold md:text-5xl xl:text-6xl" style={{ color: textColor }}>
          {blok.heading}
        </h1>
        <div className="flex flex-col items-center gap-4 mt-12">
          {blok.sitemap_links?.map((link) => (
            <Link key={link._uid} href={link.url?.cached_url || link.url || "#"} className="text-lg md:text-xl hover:font-bold" style={{ color: textColor }}>
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
