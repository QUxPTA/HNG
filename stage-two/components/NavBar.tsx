'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const NavBar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <nav className='fixed top-4 left-0 right-0 z-50 bg-transparent px-4 md:px-12'>
        <div className='max-w-[1200px] mx-auto h-[76px] px-4 md:px-12 py-4 flex items-center justify-between rounded-[24px] border border-[#197686 backdrop-blur-lg'>
          {/* Desktop Logo and Navigation */}
          <div className='hidden md:flex items-center justify-between w-full'>
            <Link href='/' className='flex items-center'>
              <Image
                src='/logo.svg'
                alt='Conference Ticket Generator Logo'
                width={91.79}
                height={36}
                className='w-[91.79px] h-[36px]'
              />
            </Link>

            {/* Desktop Navigation */}
            <div className='flex space-x-8 text-[#B3B3B3]'>
              <Link href='/' className='hover:text-white transition-colors'>
                Events
              </Link>
              <Link
                href='/my-tickets'
                className='hover:text-white transition-colors'
              >
                My Tickets
              </Link>
              <Link
                href='/about'
                className='hover:text-white transition-colors'
              >
                About Project
              </Link>
            </div>

            {/* Desktop Button */}
            <Link
              href='/my-tickets'
              className='flex items-center justify-center hover:bg-opacity-90 transition-colors'
              style={{ maxWidth: '169px', maxHeight: '52px' }}
            >
              <Image
                src='/myTickets.svg'
                alt='My Tickets'
                width={169}
                height={52}
                className='w-full h-full'
              />
            </Link>
          </div>

          {/* Mobile Layout */}
          <div className='md:hidden flex items-center justify-between w-full'>
            {/* Mobile Logo/Hamburger */}
            <button
              onClick={toggleMenu}
              className='flex items-center bg-transparent border-none'
            >
              <Image
                src='/logo.svg'
                alt='Conference Ticket Generator Logo'
                width={91.79}
                height={36}
                className='w-[91.79px] h-[36px]'
              />
            </button>

            {/* Mobile Button */}
            <Link
              href='/create-ticket'
              className='flex items-center justify-center'
              style={{ maxWidth: '141px', maxHeight: '44px' }}
            >
              <Image
                src='/myTickets.svg'
                alt='My Tickets'
                width={141}
                height={44}
                className='w-full h-full'
              />
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className='md:hidden fixed top-[100px] left-0 right-0 z-40 bg-transparent'>
          <div className='max-w-[320px] mx-auto bg-transparent'>
            <div className='flex flex-col items-center space-y-4 py-6 text-[#B3B3B3] bg-inherit backdrop-blur-md rounded-b-[24px] shadow-lg'>
              <Link
                href='/events'
                className=' transition-colors font-["JejuMyeongjo"] text-[18px] font-normal'
                onClick={toggleMenu}
              >
                Events
              </Link>
              <Link
                href='/my-tickets'
                className=' transition-colors font-["JejuMyeongjo"] text-[18px] font-normal'
                onClick={toggleMenu}
              >
                My Tickets
              </Link>
              <Link
                href='/about'
                className=' transition-colors font-["JejuMyeongjo"] text-[18px] font-normal'
                onClick={toggleMenu}
              >
                About Project
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NavBar;
