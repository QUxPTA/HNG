'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type TicketContextType = {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  ticketType: number | null;
  setTicketType: (type: number | null) => void;
  numberOfTickets: number;
  setNumberOfTickets: (num: number) => void;
  ticketTypeText: string;
  setTicketTypeText: (text: string) => void;
  ticketPrice: string;
  setTicketPrice: (price: string) => void;
};

const TicketContext = createContext<TicketContextType | undefined>(undefined);

export function TicketProvider({ children }: { children: React.ReactNode }) {
  const [isClient, setIsClient] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [ticketType, setTicketType] = useState<number | null>(null);
  const [numberOfTickets, setNumberOfTickets] = useState(1);
  const [ticketTypeText, setTicketTypeText] = useState('');
  const [ticketPrice, setTicketPrice] = useState('');

  // Initialize from localStorage on client side
  useEffect(() => {
    setIsClient(true);
    const savedData = localStorage.getItem('ticketData');
    if (savedData) {
      try {
        const data = JSON.parse(savedData);
        setTicketType(data.ticketType);
        setNumberOfTickets(data.numberOfTickets);
        setTicketTypeText(data.ticketTypeText);
        setTicketPrice(data.ticketPrice);
        setCurrentStep(data.currentStep || 1);
      } catch (e) {
        console.error('Error parsing saved ticket data:', e);
      }
    }
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    if (isClient) {
      const data = {
        ticketType,
        numberOfTickets,
        ticketTypeText,
        ticketPrice,
        currentStep,
      };
      localStorage.setItem('ticketData', JSON.stringify(data));
    }
  }, [ticketType, numberOfTickets, ticketTypeText, ticketPrice, currentStep, isClient]);

  return (
    <TicketContext.Provider
      value={{
        currentStep,
        setCurrentStep,
        ticketType,
        setTicketType,
        numberOfTickets,
        setNumberOfTickets,
        ticketTypeText,
        setTicketTypeText,
        ticketPrice,
        setTicketPrice,
      }}
    >
      {children}
    </TicketContext.Provider>
  );
}

export function useTicketContext() {
  const context = useContext(TicketContext);
  if (context === undefined) {
    throw new Error('useTicketContext must be used within a TicketProvider');
  }
  return context;
}
