'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Roboto } from 'next/font/google';
import Card from './Card';
import Image from 'next/image';
import { useTicketContext } from '@/context/TicketContext';
import { uploadImage } from '@/utils/imageUpload';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
});

const StepTwo: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const {
    setCurrentStep,
    ticketType,
    ticketTypeText,
    ticketPrice,
    numberOfTickets,
  } = useTicketContext();

  // Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [specialRequest, setSpecialRequest] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  // Error state
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    avatarUrl: '',
  });

  // Load persisted data
  useEffect(() => {
    // Check if on the client side
    if (typeof window !== 'undefined') {
      const savedData = localStorage.getItem('stepTwoData');
      if (savedData) {
        try {
          const data = JSON.parse(savedData);
          setName(data.name || '');
          setEmail(data.email || '');
          setSpecialRequest(data.specialRequest || '');

          // Validate the stored avatar URL
          if (
            data.avatarUrl &&
            data.avatarUrl.startsWith('https://i.ibb.co/')
          ) {
            setAvatarUrl(data.avatarUrl);
          }
        } catch (error) {
          console.error('Error parsing saved data:', error);
        }
      }
    }
  }, []); // Empty dependency array means this runs once on mount

  // Save data when it changes
  useEffect(() => {
    // Only save if we have a value
    if (name || email || specialRequest || avatarUrl) {
      const data = { name, email, specialRequest, avatarUrl };
      localStorage.setItem('stepTwoData', JSON.stringify(data));
    }
  }, [name, email, specialRequest, avatarUrl]);

  // Validate email format
  const validateEmail = (email: string) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  // Validate name format
  const validateName = (name: string) => {
    // Remove leading/trailing whitespace
    const trimmedName = name.trim();

    // Check if name is empty
    if (!trimmedName) {
      return 'Name is required';
    }

    // Check if name is too short (less than 2 characters)
    if (trimmedName.length < 2) {
      return 'Name must be at least 2 characters long';
    }

    // Check if name contains only letters and spaces
    const nameRegex = /^[A-Za-z]+(?:\s+[A-Za-z]+)*$/;
    if (!nameRegex.test(trimmedName)) {
      return 'Name can only contain letters and spaces';
    }

    // Check if name has at least two words
    const words = trimmedName.split(/\s+/);
    if (words.length < 2) {
      return 'Please provide both first and last name';
    }

    // Validate each word
    const invalidWord = words.find((word) => word.length < 2);
    if (invalidWord) {
      return 'Each name part must be at least 2 characters long';
    }

    return ''; // No errors
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {
      name: '',
      email: '',
      avatarUrl: '',
    };

    // Name validation
    const nameError = validateName(name);
    if (nameError) {
      newErrors.name = nameError;
    }

    // Email validation
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Invalid email format';
    }

    // Avatar validation
    if (!avatarUrl) {
      newErrors.avatarUrl = 'Profile photo is required';
    }

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === '');
  };

  // Handle file upload
  const handleFileUpload = async (file: File) => {
    try {
      setIsUploading(true);
      const url = await uploadImage(file);

      // Validate the URL before setting
      if (url && url.startsWith('https://i.ibb.co/')) {
        setAvatarUrl(url);
        setErrors((prev) => ({ ...prev, avatarUrl: '' }));
      } else {
        throw new Error('Invalid image URL');
      }
    } catch (error) {
      console.error('Upload error:', error);
      setErrors((prev) => ({
        ...prev,
        avatarUrl: 'Failed to upload image. Please try again.',
      }));
    } finally {
      setIsUploading(false);
    }
  };

  // Handle file selection
  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await handleFileUpload(file);
    }
  };

  // Handle click on upload area
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  // Handle drag and drop
  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      await handleFileUpload(file);
    }
  };

  // Handle form submission
  const handleSubmit = () => {
    if (validateForm()) {
      // Save all data to localStorage
      const allData = {
        ticketType,
        ticketTypeText,
        ticketPrice,
        numberOfTickets,
        name,
        email,
        specialRequest,
        avatarUrl,
      };
      localStorage.setItem('ticketData', JSON.stringify(allData));

      // Move to next step
      setCurrentStep(3);
    }
  };

  // Handle going back
  const handleBack = () => {
    setCurrentStep(1);
  };

  return (
    <Card title='Attendee Details' stage='Step 2/3'>
      <div className='w-full bg-[#052228] rounded-[16px] p-6 border border-[#0E464F] relative'>
        <p
          className={`
            ${roboto.className} 
            text-[16px] 
            text-white 
            text-start 
            mb-4
          `}
        >
          Upload Profile Photo
        </p>

        <div className='bg-[#02191D]'>
          <div
            className='
              w-[240px]
              h-[240px]
              bg-[#0E464F] 
              rounded-[16px] 
              border-[4px] 
              border-[#24A0B5] 
              mx-auto
              flex 
              flex-col 
              justify-center 
              items-center 
              p-6
              relative
              cursor-pointer
              overflow-hidden
            '
            onClick={handleUploadClick}
            onDragOver={(e) => e.preventDefault()}
            onDragLeave={(e) => e.preventDefault()}
            onDrop={handleDrop}
          >
            <input
              type='file'
              ref={fileInputRef}
              onChange={handleFileSelect}
              accept='image/*'
              className='hidden'
              style={{ display: 'none' }}
            />

            {avatarUrl ? (
              <div className='absolute inset-0 rounded-[12px] overflow-hidden'>
                <Image
                  src={avatarUrl}
                  fill
                  alt='Uploaded Avatar'
                  style={{ objectFit: 'cover' }}
                  className='h-full w-full'
                  sizes='(max-width: 240px) 100vw, 240px'
                  priority
                />
                <div
                  className='
                    absolute 
                    inset-0 
                    bg-black 
                    bg-opacity-50 
                    opacity-0 
                    hover:opacity-100 
                    transition-opacity 
                    duration-300 
                    flex 
                    flex-col 
                    justify-center 
                    items-center
                  '
                >
                  <svg
                    width='32'
                    height='32'
                    viewBox='0 0 32 32'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                    className='mx-auto mb-4'
                  >
                    <path
                      d='M25.264 14.8158C24.6813 10.2265 20.7507 6.6665 16.0053 6.6665C12.3307 6.6665 9.13866 8.8145 7.68133 12.1998C4.81733 13.0558 2.672 15.7598 2.672 18.6665C2.672 22.3425 5.66266 25.3332 9.33866 25.3332H10.672V22.6665H9.33866C7.13333 22.6665 5.33866 20.8718 5.33866 18.6665C5.33866 16.7945 6.93733 14.9905 8.90266 14.6452L9.67733 14.5092L9.93333 13.7652C10.8707 11.0305 13.1973 9.33317 16.0053 9.33317C19.6813 9.33317 22.672 12.3238 22.672 15.9998V17.3332H24.0053C25.476 17.3332 26.672 18.5292 26.672 19.9998C26.672 21.4705 25.476 22.6665 24.0053 22.6665H21.3387V25.3332H24.0053C26.9467 25.3332 29.3387 22.9412 29.3387 19.9998C29.3371 18.8045 28.9348 17.6443 28.1962 16.7045C27.4575 15.7647 26.4251 15.0998 25.264 14.8158Z'
                      fill='#FAFAFA'
                    />
                    <path
                      d='M17.3387 18.6665V13.3332H14.672V18.6665H10.672L16.0053 25.3332L21.3387 18.6665H17.3387Z'
                      fill='#FAFAFA'
                    />
                  </svg>

                  <p
                    className={`
                      ${roboto.className}
                      text-[16px]
                      text-white
                      text-center 
                      p-6
                    `}
                  >
                    Drag & drop or click to upload
                  </p>
                </div>
              </div>
            ) : (
              <>
                <svg
                  width='32'
                  height='32'
                  viewBox='0 0 32 32'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                  className='mx-auto mb-4'
                >
                  <path
                    d='M25.264 14.8158C24.6813 10.2265 20.7507 6.6665 16.0053 6.6665C12.3307 6.6665 9.13866 8.8145 7.68133 12.1998C4.81733 13.0558 2.672 15.7598 2.672 18.6665C2.672 22.3425 5.66266 25.3332 9.33866 25.3332H10.672V22.6665H9.33866C7.13333 22.6665 5.33866 20.8718 5.33866 18.6665C5.33866 16.7945 6.93733 14.9905 8.90266 14.6452L9.67733 14.5092L9.93333 13.7652C10.8707 11.0305 13.1973 9.33317 16.0053 9.33317C19.6813 9.33317 22.672 12.3238 22.672 15.9998V17.3332H24.0053C25.476 17.3332 26.672 18.5292 26.672 19.9998C26.672 21.4705 25.476 22.6665 24.0053 22.6665H21.3387V25.3332H24.0053C26.9467 25.3332 29.3387 22.9412 29.3387 19.9998C29.3371 18.8045 28.9348 17.6443 28.1962 16.7045C27.4575 15.7647 26.4251 15.0998 25.264 14.8158Z'
                    fill='#FAFAFA'
                  />
                  <path
                    d='M17.3387 18.6665V13.3332H14.672V18.6665H10.672L16.0053 25.3332L21.3387 18.6665H17.3387Z'
                    fill='#FAFAFA'
                  />
                </svg>

                <p
                  className={`
                    ${roboto.className}
                    text-[16px]
                    text-white
                    text-center
                  `}
                >
                  Drag & drop or click to upload
                </p>
              </>
            )}

            {isUploading && (
              <div
                className='
                  absolute 
                  inset-0 
                  bg-black 
                  bg-opacity-50 
                  flex 
                  justify-center 
                  items-center
                  text-white
                '
              >
                Uploading...
              </div>
            )}
          </div>
        </div>
      </div>
      <div
        className={`
          w-full 
          md:w-full
          h-[4px]
          bg-[#07373F]
          rounded-full
          mx-auto
          my-8
        `}
      ></div>

      {/* Name Input */}
      <div className='w-full mb-6 relative'>
        <label
          htmlFor='name'
          className={`
        ${roboto.className} 
          text-[16px] 
          text-white 
          font-normal 
          text-start 
          mb-2
          `}
        >
          Enter Your Name
        </label>
        <div className='mt-2'>
          <input
            type='text'
            id='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`
              ${roboto.className} 
              w-full 
              p-3 
              rounded-lg 
              bg-transparent
              text-white 
              border 
              ${errors.name ? 'border-red-500' : 'border-[#24A0B5]'}
              focus:outline-none 
              focus:ring-2 
              focus:ring-[#24A0B5]
            `}
          />
          {errors.name && (
            <p className='text-red-500 text-sm mt-1'>{errors.name}</p>
          )}
        </div>
      </div>

      {/* Email Input */}
      <p
        className={`
          ${roboto.className} 
          text-[16px] 
          text-white 
          font-normal 
          text-start 
          mb-2
        `}
      >
        Enter your email *
      </p>
      <div className='w-full mb-6 relative'>
        <div className='absolute left-3 top-1/2 -translate-y-1/2'>
          <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M20 4H4C2.897 4 2 4.897 2 6V18C2 19.103 2.897 20 4 20H20C21.103 20 22 19.103 22 18V6C22 4.897 21.103 4 20 4ZM20 6V6.511L12 12.734L4 6.512V6H20ZM4 18V9.044L11.386 14.789C11.5611 14.9265 11.7773 15.0013 12 15.0013C12.2227 15.0013 12.4389 14.9265 12.614 14.789L20 9.044L20.002 18H4Z'
              fill='white'
            />
          </svg>
        </div>
        <input
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='hello@avioflagos.io'
          className={`
            ${roboto.className}
            w-full 
            bg-transparent 
            text-white 
            px-4 
            py-3 
            pl-10
            rounded-[8px] 
            border 
            border-[#24A0B5] 
            focus:outline-none
            placeholder:text-white
          `}
        />
        {errors.email && (
          <p className='text-red-500 text-sm mt-1'>{errors.email}</p>
        )}
      </div>

      {/* Special Request */}
      <p
        className={`
          ${roboto.className} 
          text-[16px] 
          text-white 
          font-normal 
          text-start 
          mb-2
        `}
      >
        Special request?
      </p>
      <div className='w-full mb-6'>
        <textarea
          value={specialRequest}
          onChange={(e) => setSpecialRequest(e.target.value)}
          placeholder='Text area'
          className={`
            ${roboto.className}
            w-full 
            bg-transparent 
            text-neutral-300 
            px-4 
            py-3 
            rounded-[8px] 
            border 
            border-[#24A0B5] 
            focus:outline-none 
            focus:ring-2 
            focus:ring-[#24A0B5]
            min-h-[120px]
          `}
        />
      </div>

      {/* Buttons */}
      <div className='flex flex-col sm:flex-row gap-4 mt-8'>
        <button
          onClick={handleBack}
          className={`
            jeju-myeongjo
            w-full sm:w-1/2
            p-3
            text-[16px]
            border border-[#24A0B5]
            text-[#24A0B5]
            rounded-[16px]
            hover:bg-[#24A0B5]/10
            transition-colors
            duration-300
            order-2 sm:order-1
          `}
        >
          Back
        </button>
        <button
          onClick={handleSubmit}
          disabled={!name || !email || !avatarUrl}
          className={`
            jeju-myeongjo
            w-full sm:w-1/2
            p-3
            text-[16px]
            bg-[#24A0B5]
            text-white
            rounded-[16px]
            hover:bg-[#24A0B5]/90
            transition-colors
            duration-300
            disabled:opacity-50
            disabled:cursor-not-allowed
            order-1 sm:order-2
          `}
        >
          Get My Free Ticket
        </button>
      </div>

      {/*TODO: Ticket Generation (to be implemented) */}
      {/* {isSubmitted && (
        <div className='mt-8'>
          Ticket details will be rendered here
        </div>
      )} */}
    </Card>
  );
};

export default StepTwo;
