import React, { ReactNode } from 'react';
import StepOne from './StepOne';

interface CardProps {
  children?: ReactNode;
  className?: string;
  title?: string;
  stage?: string;
}

const Card: React.FC<CardProps> = ({
  children = <StepOne />,
  className = '',
  title = 'Ticket Selection',
  stage = 'Step 1/3',
}) => {
  return (
    <div
      className={`
        w-full max-w-[700px] 
        mx-auto 
        p-6 
        md:p-8 
        border border-[#0E464F] 
        rounded-[24px]  
        shadow-2xl 
        transform 
        transition-all 
        duration-300 
        hover:scale-[1.02] 
        hover:shadow-3xl 
        text-[#FFFFFF]
        mt-14
        ${className}
      `}
    >
      {/* Header with Title and Stage */}
      <div className='flex justify-between items-center mb-6'>
        <h2
          className='
            text-[32px] 
            font-["JejuMyeongjo"] 
            font-normal 
            text-[#FFFFFF]
          '
        >
          {title}
        </h2>
        <span
          className='
            text-[16px] 
            font-["Roboto"] 
            text-[#FFFFFF]
          '
        >
          {stage}
        </span>
      </div>

      {/* Progress Bar */}
      <div className='w-full h-2 bg-[#0E464F] rounded-full mb-6'>
        <div
          className='h-full bg-[#24A0B5] rounded-full'
          style={{ width: '33.33%' }}
        ></div>
      </div>

      {/* Card Content */}
      {children}
    </div>
  );
};

export default Card;
