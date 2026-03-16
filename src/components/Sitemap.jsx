"use client";
import { storyblokEditable } from '@storyblok/react';
import Link from "next/link";

export default function Sitemap({ blok }) {
  return (
    <div {...storyblokEditable(blok)} className="container mx-auto px-4 w-full pt-16 pb-16 min-h-160">
      <h1 className="text-center text-sky-900 text-5xl md:text-7xl font-bold">{blok.heading}</h1>
      <div className="flex flex-col items-center gap-4 mt-12">
        {blok.sitemap_links?.map((link, index) => (
          <Link key={link._uid} href={link.url?.cached_url || link.url || "#"} className="text-sky-800 text-xl hover:font-bold">
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
