'use client';

import React from 'react';
import StepOne from '@/components/StepOne';
import StepTwo from '@/components/StepTwo';
import { TicketProvider, useTicketContext } from '@/context/TicketContext';
import StepThree from '@/components/StepThree';

const TicketContent = () => {
  const { currentStep } = useTicketContext();

  return (
    <>
      {currentStep === 1 && <StepOne />}
      {currentStep === 2 && <StepTwo />}
      {currentStep === 3 && <StepThree />}
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
