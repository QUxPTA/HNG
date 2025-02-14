'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import TicketBackground from '@/components/TicketBackground';

interface Ticket {
  name: string;
  email: string;
  ticketType: string;
  profilePicture?: string;
}

const MyTicketsPage: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    // Retrieve tickets from local storage when component mounts
    const storedTickets = localStorage.getItem('userTickets');
    if (storedTickets) {
      setTickets(JSON.parse(storedTickets));
    }
  }, []);

  if (tickets.length === 0) {
    return (
      <div className='min-h-screen bg-[#041E23] flex items-center justify-center text-white'>
        <div className='text-center'>
          <p className='text-2xl mb-4'>No tickets found</p>
          <p>Create a ticket to see it here!</p>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-[#041E23] py-12 px-4'>
      <div className='container mx-auto'>
        <h1 className='text-3xl text-white text-center mb-12'>My Tickets</h1>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {tickets.map((ticket, index) => (
            <div 
              key={index} 
              className='relative w-full max-w-[400px] mx-auto'
            >
              <TicketBackground />
              <div className='absolute top-0 left-0 w-full h-full p-6 text-white'>
                <div className='flex flex-col items-center h-full justify-center'>
                  {ticket.profilePicture && (
                    <div className='w-24 h-24 rounded-full overflow-hidden mb-4'>
                      <Image 
                        src={ticket.profilePicture} 
                        alt='Profile' 
                        width={96} 
                        height={96} 
                        className='object-cover'
                      />
                    </div>
                  )}
                  <h2 className='text-xl font-bold mb-2'>{ticket.name}</h2>
                  <p className='mb-2'>{ticket.email}</p>
                  <p className='font-semibold'>{ticket.ticketType} Ticket</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyTicketsPage;
