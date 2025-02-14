'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Road_Rage } from 'next/font/google';
import { Roboto } from 'next/font/google';
import { useTicketContext } from '@/context/TicketContext';
import Card from './Card';

const roadRage = Road_Rage({
  subsets: ['latin'],
  weight: ['400'],
});

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
});

const StepOne: React.FC = () => {
  const {
    ticketType,
    setTicketType,
    numberOfTickets,
    setNumberOfTickets,
    setTicketTypeText,
    setTicketPrice,
    setCurrentStep,
  } = useTicketContext();

  const [selectedCard, setSelectedCard] = useState<number | null>(ticketType);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const resetForm = () => {
    setSelectedCard(null);
    setNumberOfTickets(1);
    setTicketType(null);
    setTicketTypeText('');
    setTicketPrice('');
  };

  const handleNextStep = () => {
    if (selectedCard === null) {
      alert('Please select a ticket type');
      return;
    }

    // Update context with selected ticket info
    setTicketType(selectedCard);
    setTicketTypeText(ticketTypes[selectedCard].type);
    setTicketPrice(ticketTypes[selectedCard].price);

    // Move to next step
    setCurrentStep(2);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const ticketTypes = [
    {
      price: 'Free',
      type: 'REGULAR ACCESS',
      availability: '20/52',
      bgColor: 'bg-[#0E464F]',
      hoverBgColor: 'hover:bg-[#197686]',
      selectedBgColor: 'bg-[#197686]',
    },
    {
      price: '$150',
      type: 'VIP ACCESS',
      availability: '20/52',
      bgColor: 'bg-[#08252B]',
      hoverBgColor: 'hover:bg-[#197686]',
      selectedBgColor: 'bg-[#197686]',
    },
    {
      price: '$250',
      type: 'VVIP ACCESS',
      availability: '20/52',
      bgColor: 'bg-[#08252B]',
      hoverBgColor: 'hover:bg-[#197686]',
      selectedBgColor: 'bg-[#197686]',
    },
  ];

  return (
    <Card title='Select Ticket' stage='Step 1/3'>
      <div
        className='
          flex 
          flex-col 
          items-center 
          w-full 
          max-w-[604px] 
          bg-[#08252B] 
          border border-[#0E464F]
          rounded-[32px] 
          p-4 
          md:p-8 
          mx-auto
        '
      >
        <div
          className='
            flex 
            flex-col
            items-center 
            justify-center 
            w-full 
            max-w-[540px] 
            bg-[url("/techember.svg")] 
            bg-cover 
            bg-no-repeat
            rounded-[24px] 
            p-4 
            md:p-8 
            gap-4
          '
        >
          <h1
            className={`
              ${roadRage.className}
              font-normal
              text-[48px] 
              md:text-[62px]
              text-[#F7F7F7]/98
              text-center
              w-full
            `}
          >
            Techember Fest ”25
          </h1>
          <p
            className={`
              ${roboto.className}
              font-normal
              text-[14px] 
              md:text-[16px]
              text-[#A1A1A1]/98
              text-center
              w-full
              md:w-[340px]
              h-auto 
              md:h-[48px]
              flex
              items-center
              justify-center
              px-4 
              md:px-0
            `}
          >
            Join us for an unforgettable experience at TechFest 25! Secure your
            spot now.
          </p>
          <p
            className={`
              ${roboto.className}
              font-normal
              text-[14px] 
              md:text-[16px]
              text-[#A1A1A1]/98
              text-center
              w-full
              md:w-[340px]
              flex
              items-center
              justify-center
              px-4 
              md:px-0
            `}
          >
            📍 Ikoyi, Lagos &nbsp;&nbsp;&nbsp;| | &nbsp;&nbsp;&nbsp; March 15,
            2025 | 7:00PM
          </p>
        </div>
        <div
          className={`
            w-[90%] 
            md:w-[556px]
            h-[4px]
            bg-[#07373F]
            rounded-full
            mx-auto
            my-8
          `}
        ></div>
        <p
          className={`
            ${roboto.className}
            font-normal
            text-[14px] 
            md:text-[16px]
            text-[#A1A1A1]/98
            w-full 
            md:w-[340px]
            flex
            justify-start
            px-4 
            md:px-0
            md:ml-[-200px]
            mb-4
          `}
        >
          Select Ticket Type:
        </p>

        <div
          className='
            w-full 
            md:w-[556px]
            bg-[#08252B]
            border border-[#0E464F]
            rounded-[32px]
            p-4
            md:p-8
          '
        >
          <div
            className='
              flex 
              flex-col 
              md:flex-row 
              gap-4 
              w-full 
              justify-center
            '
          >
            {ticketTypes.map((ticket, index) => (
              <div
                key={index}
                onClick={() => setSelectedCard(index)}
                className={`
                  ${ticket.bgColor}
                  ${ticket.hoverBgColor}
                  ${selectedCard === index ? ticket.selectedBgColor : ''}
                  border border-[#0E464F]
                  rounded-[16px]
                  p-4
                  w-full 
                  md:w-[158px]
                  h-[110px]
                  flex 
                  flex-col 
                  justify-center 
                  items-start
                  gap-2
                  cursor-pointer
                  transition-colors 
                  duration-300
                  hover:border-[#197686]
                  ${selectedCard === index ? 'border-[#197686]' : ''}
                  ${index === 0 ? 'whitespace-nowrap' : ''}
                `}
              >
                <p
                  className={`
                    ${roboto.className}
                    font-bold
                    text-[24px]
                    text-[#F7F7F7]/98
                  `}
                >
                  {ticket.price}
                </p>
                <p
                  className={`
                    ${roboto.className}
                    font-normal
                    text-[16px]
                    text-[#A1A1A1]/98
                  `}
                >
                  {ticket.type}
                </p>
                <p
                  className={`
                    ${roboto.className}
                    font-normal
                    text-[14px]
                    text-[#A1A1A1]/80
                  `}
                >
                  {ticket.availability}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div
          className='
            w-full 
            md:w-[556px]
            flex 
            flex-col 
            gap-4 
            mt-8
            px-4 
            md:px-0
          '
        >
          <p
            className={`
              ${roboto.className}
              font-normal
              text-[14px] 
              md:text-[16px]
              text-[#A1A1A1]/98
              w-full
            `}
          >
            Number of Tickets
          </p>
          <div ref={dropdownRef} className='relative w-full'>
            <div
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={`
                ${roboto.className}
                w-full
                p-3
                bg-[#08252B]
                border border-[#0E464F]
                rounded-[16px]
                text-[#F7F7F7]/98
                text-[14px] 
                md:text-[16px]
                flex
                justify-between
                items-center
                cursor-pointer
                relative
              `}
            >
              <span>{numberOfTickets}</span>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                className={`
                  transform 
                  transition-transform 
                  duration-300
                  ${isDropdownOpen ? 'rotate-180' : 'rotate-0'}
                `}
              >
                <path d='M6 9l6 6 6-6' />
              </svg>
            </div>
            {isDropdownOpen && (
              <div
                className={`
                  absolute 
                  top-full 
                  left-0 
                  w-full 
                  bg-[#08252B]
                  border border-[#0E464F]
                  rounded-[16px]
                  mt-1
                  z-10
                  max-h-[200px]
                  overflow-y-auto
                  grid
                  grid-cols-4
                  gap-2
                  p-2
                `}
              >
                {[...Array(20)].map((_, i) => (
                  <div
                    key={i + 1}
                    onClick={() => {
                      setNumberOfTickets(i + 1);
                      setIsDropdownOpen(false);
                    }}
                    className={`
                      ${roboto.className}
                      p-2
                      text-[14px] 
                      md:text-[16px]
                      text-[#F7F7F7]/98
                      hover:bg-[#0E464F]
                      cursor-pointer
                      text-center
                      rounded-[8px]
                      ${numberOfTickets === i + 1 ? 'bg-[#0E464F]' : ''}
                    `}
                  >
                    {i + 1}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div
          className='
            w-full 
            md:w-[556px]
            flex 
            gap-4 
            mt-8
            px-4 
            md:px-0
          '
        >
          <button
            onClick={resetForm}
            className='
              jeju-myeongjo
              w-1/2
              p-3
              text-[16px]
              border border-[#24A0B5]
              text-[#24A0B5]
              rounded-[16px]
              uppercase
              hover:bg-[#24A0B5]/10
              transition-colors
              duration-300
            '
          >
            Cancel
          </button>
          <button
            onClick={handleNextStep}
            disabled={selectedCard === null}
            className='
              jeju-myeongjo
              w-1/2
              p-3
              text-[16px]
              bg-[#24A0B5]
              text-white
              rounded-[16px]
              uppercase
              hover:bg-[#24A0B5]/90
              transition-colors
              duration-300
              disabled:opacity-50
              disabled:cursor-not-allowed
            '
          >
            Next
          </button>
        </div>
      </div>
    </Card>
  );
};

export default StepOne;
