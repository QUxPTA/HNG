import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AI-Powered Text Processor',
  description:
    'Powerful text processing with language detection, summarization, and translation',
  keywords: [
    'AI',
    'text processing',
    'language detection',
    'translation',
    'summarization',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className='dark:bg-gray-900'>
      <head>
        <meta
          httpEquiv='origin-trial'
          content={process.env.NEXT_PUBLIC_ORIGIN_TRIAL_TOKEN}
        />
      </head>
      <body
        className={`${inter.className} bg-gray-100 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300`}
      >
        {children}
      </body>
    </html>
  );
}
