"use client";
import { storyblokEditable } from "@storyblok/react";
import Link from "next/link";

export default function Footer({ blok }) {
  const footerBlok = blok.block.find(
    (item) => item.component === "footer"
  );

  if (!footerBlok) return null;

  return (
    <footer className="bg-zinc-800 text-white px-8 lg:px-16 py-8">
      <div className="max-w-[1520] mx-auto grid lg:grid-cols-3 gap-8">
        <div>
          <img 
            src={footerBlok.logo.filename} 
            alt={footerBlok.logo.alt || "Logo"} 
            className="h-12 w-auto mb-4" 
          />
          <p className="text-slate-300">
            {footerBlok.description}
          </p>
        </div>
        <div className="flex flex-col gap-4 lg:items-end lg:justify-end">
          {footerBlok.nav_links?.map((link, index) => (
            <Link key={link._uid} href={link.url?.cached_url || link.url || "#"} className="text-amber-400">
              {link.label}
            </Link>
          ))}
        </div>
        <div className="flex gap-4 items-center lg:justify-end">
          {footerBlok.social_links.map((social) => (
            <Link key={social._uid} href={social.url} target="_blank" rel="noreferrer">
              <img 
                src={social.icon.filename} 
                alt={social.icon.alt}
                className="w-8 h-8" 
              />
            </Link>
          ))}
        </div>
      </div>
      <div className="max-w-[1520] mx-auto border-t border-orange-500 pt-4 mt-8 text-center text-sm text-white">
        {footerBlok.copyright}
      </div>
    </footer>
  );
}