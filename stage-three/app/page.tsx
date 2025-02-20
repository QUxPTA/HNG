'use client';

import React, { useState, useEffect } from 'react';
import TextInput from '@/components/TextInput';
import OutputArea from '@/components/OutputArea';
import LanguageSelector from '@/components/LanguageSelector';

export interface Message {
  id: string;
  text: string;
  type: 'user' | 'ai';
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);

  // Effect to detect dark mode preference on client side
  useEffect(() => {
    const prefersDarkMode = window.matchMedia && 
      window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(prefersDarkMode);
  }, []);

  // Effect to apply dark mode
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleSendText = (text: string) => {
    // Use crypto.randomUUID() for consistent ID generation
    const newMessage: Message = {
      id: crypto.randomUUID(),
      text,
      type: 'user',
    };

    const aiResponse: Message = {
      id: crypto.randomUUID(),
      text: 'Processing your request...',
      type: 'ai',
    };

    setMessages((prevMessages) => [...prevMessages, newMessage, aiResponse]);
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300 p-4'>
      <div className='w-full max-w-4xl mx-auto bg-white dark:bg-gray-700 rounded-2xl shadow-2xl transform hover:scale-[1.02] transition-all duration-300 ease-in-out hover:shadow-3xl flex flex-col h-[90vh] max-h-[900px]'>
        <header className='bg-blue-600 dark:bg-blue-900 text-white p-4 rounded-t-2xl shadow-md transition-colors duration-300'>
          <div className='max-w-4xl mx-auto flex justify-between items-center'>
            <h1 className='text-xl font-bold'>AI-Powered Text Processor</h1>
            <div className='flex items-center space-x-4'>
              <button
                onClick={toggleDarkMode}
                className='text-2xl w-12 h-12 flex items-center justify-center rounded-full hover:bg-blue-700 dark:hover:bg-blue-800 transition-all duration-300'
                aria-label={
                  isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'
                }
              >
                {isDarkMode ? '☀️' : '🌙'}
              </button>
            </div>
          </div>
        </header>

        <div className='flex flex-col flex-grow overflow-hidden'>
          <div className='flex-grow overflow-y-auto'>
            <OutputArea 
              messages={messages} 
              onTranslate={() => setShowLanguageSelector(true)}
            />
            <LanguageSelector
              isOpen={showLanguageSelector}
              onClose={() => setShowLanguageSelector(false)}
              onLanguageChange={setSelectedLanguage}
              selectedLanguage={selectedLanguage}
            />
          </div>

          <TextInput 
            onSendText={handleSendText} 
          />
        </div>
      </div>
    </div>
  );
}
