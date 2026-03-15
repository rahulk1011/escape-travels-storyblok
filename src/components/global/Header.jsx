"use client";

import { useState } from 'react';
import { storyblokEditable } from "@storyblok/react";
import Link from 'next/link';

export default function Header({ blok }) {
  const [isOpen, setIsOpen] = useState(false);

  const headerBlok = blok?.block?.find(
    (item) => item.component === "header"
  );

  if (!headerBlok) return null;

  return (
    <header 
      {...storyblokEditable(headerBlok)} 
      // Added: sticky, top-0, z-50, and a shadow for depth
      className='main-navigation bg-slate-800 pt-4 pb-4 pl-8 pr-8 sticky top-0 z-50 shadow-md'
    >
      <div className='header-wrapper max-w-[1520] mx-auto flex justify-between items-center'>
        {/* Logo */}
        <Link href="/" onClick={() => setIsOpen(false)}>
          {headerBlok.logo?.filename && (
            <img 
              src={headerBlok.logo.filename} 
              alt={headerBlok.logo.alt || 'travelling site logo'} 
              className='site-logo h-12 w-auto' 
            />
          )}
        </Link>

        {/* Hamburger Icon */}
        <button 
          className="text-sky-50 lg:hidden block focus:outline-none" 
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            )}
          </svg>
        </button>

        {/* Dynamic Navigation Links */}
        <nav className={`
          flex flex-col lg:flex-row items-center
          absolute lg:static top-full left-0 w-full lg:w-auto
          bg-slate-800 lg:bg-transparent z-50
          transition-all duration-300 ease-in-out
          ${isOpen ? 'max-h-96 p-4 border-t border-slate-700 lg:border-none opacity-100' : 'max-h-0 overflow-hidden lg:max-h-full opacity-0 lg:opacity-100'}
        `}>
          {headerBlok.links?.map((link, index) => (
            <Link 
              key={link._uid} 
              href={link.url?.cached_url || link.url || "#"} 
              onClick={() => setIsOpen(false)}
              className={`text-xl font-bold text-sky-50 hover:text-orange-500 transition-colors ${
                index !== headerBlok.links.length - 1 ? 'mb-4 lg:mb-0 lg:mr-16' : ''
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}