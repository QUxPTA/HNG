'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Alatsi } from 'next/font/google';
import { Roboto } from 'next/font/google';
import { Road_Rage } from 'next/font/google';
import Card from './Card';
import TicketBackground from '@/components/TicketBackground';
import Image from 'next/image';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useRouter } from 'next/navigation';
import { useTicketContext } from '@/context/TicketContext';

const alatsi = Alatsi({
  weight: ['400'],
  subsets: ['latin'],
});

const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin'],
});

const roadRage = Road_Rage({
  weight: ['400'],
  subsets: ['latin'],
});

interface UserTicketData {
  fullName: string;
  email: string;
  avatarUrl: string;
  ticketType: string;
  ticketFor: string;
  specialRequest?: string;
}

const StepThree: React.FC = () => {
  const router = useRouter();
  const [ticketData, setTicketData] = useState<UserTicketData | null>(null);
  const ticketRef = useRef<HTMLDivElement>(null);
  const { resetContext } = useTicketContext(); // Get resetContext function from hook

  // Generate unique ticket code
  const generateTicketCode = () => {
    const prefix = 'TECH';
    const randomPart = Math.random()
      .toString(36)
      .substring(2, 10)
      .toUpperCase();
    return `${prefix}-${randomPart}`;
  };

  useEffect(() => {
    // Retrieve data from localStorage
    const stepOneData = localStorage.getItem('stepOneData');
    const stepTwoData = localStorage.getItem('stepTwoData');

    if (stepOneData && stepTwoData) {
      try {
        const stepOne = JSON.parse(stepOneData);
        const stepTwo = JSON.parse(stepTwoData);

        // Combine data from both steps
        const combinedData: UserTicketData = {
          fullName: stepTwo.name,
          email: stepTwo.email,
          avatarUrl: stepTwo.avatarUrl,
          ticketType: stepOne.ticketTypeText,
          ticketFor: stepOne.numberOfTickets.toString(),
          specialRequest: stepTwo.specialRequest || '',
        };

        // Generate and store ticket code
        const ticketCode = generateTicketCode();
        localStorage.setItem('ticketCode', ticketCode);

        setTicketData(combinedData);
      } catch (error) {
        console.error('Error parsing ticket data:', error);
      }
    }
  }, []);

  const handleDownloadPDF = async () => {
    if (!ticketRef.current || !ticketData) return;

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      const canvas = await html2canvas(ticketRef.current, {
        scale: 2,
        backgroundColor: null,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [canvas.width, canvas.height],
      });

      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      pdf.save('techember-ticket.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  const handleBookAnother = () => {
    // Reset context and clear localStorage
    resetContext();

    // Navigate back to home/first step
    router.push('/');
  };

  return (
    <div className='w-full'>
      <Card title='Ready' stage='Step 3/3'>
        <div className='flex flex-col items-center'>
          <h1 className={`${alatsi.className} text-[32px] text-white mb-2`}>
            Your Ticket is Booked!
          </h1>
          <p className={`${roboto.className} text-base text-white/80 mb-8`}>
            Check your email for a copy or you can{' '}
            <span className='font-bold'>download</span>
          </p>

          <div className='flex justify-center items-center mt-12 mb-8'>
            <div className='relative' ref={ticketRef}>
              <div className='absolute top-[20px] left-1/2 transform -translate-x-1/2 z-4 w-[90%] max-w-[260px] flex flex-col items-center'>
                <div className='border border-[#24A0B5] rounded-[16px] p-3 w-full h-full bg-[#08343C] max-h-[446px] flex flex-col'>
                  <h2
                    className={`${roadRage.className} text-center text-[32px] mb-1 text-white`}
                  >
                    Techember Fest ”25
                  </h2>
                  <p
                    className={`${roboto.className} text-center text-[10px] mb-0.5 text-[#B4D4D9]`}
                  >
                    📍 04 Rumens road, Ikoyi, Lagos
                  </p>
                  <p
                    className={`${roboto.className} text-center text-[10px] text-[#B4D4D9]`}
                  >
                    📅 March 15, 2025 | 7:00 PM
                  </p>

                  <div className='flex flex-col items-center mt-3 flex-grow'>
                    <div className='border-[4px] border-[#24A0B5] rounded-lg w-[140px] h-[140px] flex items-center justify-center overflow-hidden bg-[#24A0B5]/20'>
                      {ticketData && (
                        <Image
                          src={ticketData.avatarUrl}
                          alt={`${ticketData.fullName}'s avatar`}
                          width={100}
                          height={100}
                          className='rounded-[6px] object-cover w-full h-full'
                          priority
                        />
                      )}
                    </div>

                    <div className='w-full m-1'>
                      <div className='bg-[#24A0B5]/5 rounded-xl border border-[#24A0B5]/20 w-full p'>
                        <div className='border-b border-[#24A0B5]/20'>
                          <div className='grid grid-cols-2 divide-x divide-[#24A0B5]/20'>
                            <div className='p-2.5'>
                              <p
                                className={`${roboto.className} text-[10px] text-[#B4D4D9]`}
                              >
                                Enter your name
                              </p>
                              {ticketData && (
                                <p
                                  className={`${roboto.className} text-[12px] font-bold text-white mt-0.5 truncate`}
                                >
                                  {ticketData.fullName}
                                </p>
                              )}
                            </div>
                            <div className='p-2.5'>
                              <p
                                className={`${roboto.className} text-[10px] text-[#B4D4D9]`}
                              >
                                Enter your email*
                              </p>
                              {ticketData && (
                                <p
                                  className={`${roboto.className} text-[12px] font-bold text-white mt-0.5 truncate`}
                                >
                                  {ticketData.email}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className='border-b border-[#24A0B5]/20'>
                          <div className='grid grid-cols-2 divide-x divide-[#24A0B5]/20'>
                            <div className='p-2.5'>
                              <p
                                className={`${roboto.className} text-[10px] text-[#B4D4D9]`}
                              >
                                Ticket type
                              </p>
                              {ticketData && (
                                <p
                                  className={`${roboto.className} text-[12px] font-bold text-white mt-0.5 truncate`}
                                >
                                  {ticketData.ticketType}
                                </p>
                              )}
                            </div>
                            <div className='p-2.5'>
                              <p
                                className={`${roboto.className} text-[10px] text-[#B4D4D9]`}
                              >
                                Ticket for
                              </p>
                              {ticketData && (
                                <p
                                  className={`${roboto.className} text-[12px] font-bold text-white mt-0.5 truncate`}
                                >
                                  {ticketData.ticketFor}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className='p-2.5'>
                          <p
                            className={`${roboto.className} text-[10px] text-[#B4D4D9]`}
                          >
                            Special request?
                          </p>
                          {ticketData && ticketData.specialRequest && (
                            <p
                              className={`${roboto.className} text-[12px] font-bold text-white mt-0.5 line-clamp-2`}
                            >
                              {ticketData.specialRequest
                                ? ticketData.specialRequest
                                : 'No Special request'}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='w-full flex justify-center mt-10'>
                  <Image
                    src='/barCode.svg'
                    alt='Ticket Barcode'
                    width={236}
                    height={68}
                    className='w-full'
                  />
                </div>
              </div>
              <TicketBackground />
            </div>
          </div>

          <div className='flex flex-col-reverse sm:flex-row gap-4 mt-8 w-full sm:w-auto'>
            <button
              onClick={handleBookAnother}
              className='w-full sm:w-auto px-8 py-2.5 rounded-lg border-2 border-[#24A0B5] text-[#24A0B5] hover:bg-[#24A0B5]/10 transition-colors'
            >
              Book Another Ticket
            </button>
            <button
              onClick={handleDownloadPDF}
              className='w-full sm:w-auto px-8 py-2.5 rounded-lg bg-[#24A0B5] text-white hover:bg-[#24A0B5]/90 transition-colors'
            >
              Download Ticket
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default StepThree;
