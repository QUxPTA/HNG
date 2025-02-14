'use client';

import React from 'react';
import StepOne from '@/components/StepOne';
import StepTwo from '@/components/StepTwo';
import { TicketProvider, useTicketContext } from '@/context/TicketContext';
import StepThree from '@/components/StepThree';

const TicketContent = () => {
  const { currentStep } = useTicketContext();

  return (
    <div>
      <>
        {currentStep === 1 && <StepOne />}
        {currentStep === 2 && <StepTwo />}
        {currentStep === 3 && <StepThree />}
      </>

      {/* Footer */}
      <footer className='relative bottom-0 left-0 right-0 text-center text-xs text-blue-200 hover:text-cyan-600 transition-colors py-4'>
        <a
          href='https://quxpta.codes'
          target='_blank'
          rel='noopener noreferrer'
          className='hover:underline'
        >
          🌠 QUxPTA Built
        </a>
      </footer>
    </div>
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
