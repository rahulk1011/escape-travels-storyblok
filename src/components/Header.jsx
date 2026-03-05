'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import siteLogo from "../assets/around-the-globe.png";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className='main-navigation bg-slate-800 pt-4 pb-4 pl-8 pr-8 relative'>
      <div className='header-wrapper container mx-auto flex justify-between items-center'>
        <Link href="/" onClick={() => setIsOpen(false)}>
          <Image src={siteLogo} alt='travelling site logo' className='site-logo' height={48} width={48} />
        </Link>

        {/* Hamburger Icon */}
        <button className="text-sky-50 lg:hidden block focus:outline-none" onClick={() => setIsOpen(!isOpen)}>
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            )}
          </svg>
        </button>

        {/* Navigation Links */}
        <nav className={`
          flex flex-col lg:flex-row items-center
          absolute lg:static top-full left-0 w-full lg:w-auto
          bg-slate-800 lg:bg-transparent z-50
          transition-all duration-300 ease-in-out
          ${isOpen ? 'max-h-60 p-4 border-t border-slate-700 lg:border-none' : 'max-h-0 overflow-hidden lg:max-h-full'}
        `}>
          <Link className='text-xl font-bold text-sky-50 mb-4 lg:mb-0 lg:mr-16' href="/" onClick={() => setIsOpen(false)}>
            Home
          </Link>
          <Link className='text-xl font-bold text-sky-50' href="/tours" onClick={() => setIsOpen(false)}>
            Tours
          </Link>
        </nav>
      </div>
    </header>
  );
}