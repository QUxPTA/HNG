'use client';

import React from 'react';
import StepOne from '@/components/StepOne';
import StepTwo from '@/components/StepTwo';
import { TicketProvider, useTicketContext } from '@/context/TicketContext';

const TicketContent = () => {
  const { currentStep } = useTicketContext();

  return (
    <>
      {currentStep === 1 && <StepOne />}
      {currentStep === 2 && <StepTwo />}
    </>
  );
};

const Home = () => {
  return (
    <TicketProvider>
      <TicketContent />
    </TicketProvider>
  );
};

export default Home;
