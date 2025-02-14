'use client';

import React from 'react';
import Link from 'next/link';
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin'],
});

const AboutPage: React.FC = () => {
  return (
    <div className='min-h-screen bg-[#041E23] text-white flex flex-col items-center justify-center px-4 py-16'>
      <div
        className='
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
        '
      >
        <div className={`flex flex-col items-center ${roboto.className} p-4`}>
          <div className='text-left text-white font-roboto text-base'>
            <p>Event Ticket Booking UI – Open Source Practice Project 🎟️</p>
            <p className='mt-4 mb-4'>Overview</p>
            <p className='mb-4'>
              This is a beginner-friendly yet practical Event Ticket Booking UI
              designed for developers to clone, explore, and build upon. The
              design focuses on a seamless, login-free ticket reservation flow,
              allowing users to book event tickets quickly and efficiently.
            </p>
            <p>
              The project consists of a three-step ticket booking flow, and
              developers can extend it further by integrating payment solutions,
              user authentication (optional), and ticket validation systems.
            </p>
            <p className='mt-4 mb-4'>Flow & Features</p>
            <p>1️⃣ Ticket Selection</p>
            <ul className='list-disc mb-4 ml-4'>
              <li>Users can browse available tickets (Free & Paid).</li>
              <li>Ticket options are displayed in a list or card view.</li>
              <li>
                For Free Tickets → Clicking &quot;Get Free Ticket&quot; proceeds
                to attendee details.
              </li>
              <li>
                For Paid Tickets → Clicking &quot;Purchase Ticket&quot; would
                ideally open a payment modal.
              </li>
            </ul>
            <p>2️⃣ Attendee Details Form</p>
            <ul className='list-disc mb-4 ml-4'>
              <li>Users input their Name, Email, and optional Phone Number.</li>
              <li>Profile picture upload option with preview functionality.</li>
              <li>
                Ticket summary is visible to ensure users review their details
                before submission.
              </li>
            </ul>
            <p>3️⃣ Payment or Success Page</p>
            <ul className='list-disc ml-4'>
              <li>
                If the ticket is free, the user is taken directly to the Ticket
                Confirmation Page.
              </li>
              <li>
                If the ticket is paid, developers can integrate Stripe,
                Paystack, or Flutterwave to process{' '}
              </li>
            </ul>
            <p>payments before showing the confirmation page.</p>
            <ul className='list-disc ml-4'>
              <li>Upon successful booking, users should receive:</li>
              <li>A visual ticket preview with a unique QR Code.</li>
              <li>
                An option to download the ticket as PDF or save it to their
                device.
              </li>
              <li>An email confirmation containing ticket details.</li>
            </ul>
            <p>How to Build This 🚀</p>
            <p className='mt-4 mb-4'>This UI can be implemented using:</p>
            <p>📌 Frontend (Next.js or React)</p>
            <ul className='list-disc ml-6'>
              <li>Component Breakdown:</li>
              <li>TicketCard.tsx → Displays ticket details</li>
              <li>AttendeeForm.tsx → Captures user details</li>
              <li>PaymentModal.tsx → Handles payment processing</li>
              <li>SuccessScreen.tsx → Shows the final ticket preview</li>
              <li>
                State Management: React&apos;s Context API, Zustand, or Redux
                (if needed).
              </li>
              <li>
                File Handling: Users should be able to upload images (profile
                picture for ticket) using Firebase
              </li>
            </ul>
            <p>
              Storage, Cloudinary, or local preview with URL.createObjectURL().
            </p>
            <p className='mt-4'>📌 Backend (Optional)</p>
            <ul className='list-disc ml-4'>
              <li>If persistence is required, a backend can be built using:</li>
              <li>Node.js & Express or Firebase Functions</li>
              <li>
                Database: MongoDB, PostgreSQL, or Firebase Firestore to store
                ticket records
              </li>
            </ul>
            <p className='mr-4'>📌 Payment Integration</p>
            <ul className='list-disc ml-4'>
              <li>For paid events, developers should integrate:</li>
              <li>Stripe Checkout (for international transactions)</li>
              <li>Paystack or Flutterwave (for African users)</li>
            </ul>
            <p>What You&apos;ll Learn 🧑‍💻</p>
            <ul className='list-disc ml-4'>
              <li>File handling & validation (profile picture uploads).</li>
              <li>Dynamic UI updates based on ticket selection.</li>
              <li>Persisting bookings using local state or a backend.</li>
              <li>Integrating payment gateways for ticket purchases.</li>
              <li>
                Generating & validating QR Codes for event check-in (Advanced).
              </li>
              <p>Need Help? Reach Out! 💬</p>
            </ul>
            <p className='text-6xl sm:text-8xl md:text-[80px] text-center m-20'>
              💛 Enjoy
            </p>
          </div>
          <div
            className='
              w-full 
              h-full 
              max-w-[558px] 
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
            '
          >
            <div className='flex items-center justify-center h-full'>
              <div className='flex items-center justify-center gap-4'>
                <Link
                  href='https://www.figma.com/community/file/1470800949188681164/event-ticket-booking-ui-open-source-practice-project'
                  target='_blank'
                  className='border border-[#24A0B5] hover:bg-[#1E8A9D] text-[#24A0B5] font-bold py-3 px-6 rounded-lg transition-colors'
                >
                  Design File
                </Link>
                <Link
                  href='https://github.com/QUxPTA/HNG/tree/main/stage-two'
                  target='_blank'
                  className='bg-[#197686] hover:bg-[#76c0cd] text-white font-bold py-3 px-6 rounded-lg transition-colors'
                >
                  Github Code
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
