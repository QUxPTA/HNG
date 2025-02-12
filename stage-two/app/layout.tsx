import type { Metadata } from 'next';
import './globals.css';
import NavBar from '@/components/NavBar';

export const metadata: Metadata = {
  title: 'Conference Ticket Generator',
  description: 'Event Ticket Booking UI - Open Source Practice Project',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className='font-["JejuMyeongjo"] antialiased pt-[80px]'>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
