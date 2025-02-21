'use client';

import React, { useState, useEffect } from 'react';
import TextInput from '@/components/TextInput';
import OutputArea from '@/components/OutputArea';
import LanguageSelector from '@/components/LanguageSelector';

export interface Message {
  id: string;
  text: string;
  type: 'user' | 'ai';
  translation?: {
    fromLanguage: string;
    toLanguage: string;
    translatedText?: string;
  };
  detectedLanguage?: {
    language: string;
    confidence: number;
  };
}

const LANGUAGE_NAMES: { [key: string]: string } = {
  en: 'English',
  pt: 'Portuguese',
  es: 'Spanish',
  ru: 'Russian',
  tr: 'Turkish',
  fr: 'French',
  de: 'German',
  it: 'Italian',
  zh: 'Chinese',
  ja: 'Japanese',
  ko: 'Korean',
};

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const [translationTarget, setTranslationTarget] = useState<{
    messageId: string;
    fromLanguage: string;
  } | null>(null);
  const [languageDetector, setLanguageDetector] = useState<any>(null);
  const [languageDetectorStatus, setLanguageDetectorStatus] =
    useState<string>('initializing');

  // Effect to detect dark mode preference on client side
  useEffect(() => {
    const prefersDarkMode =
      window.matchMedia &&
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

  // Language detection initialization effect
  useEffect(() => {
    const initLanguageDetector = async () => {
      // Check if Language Detection API is available
      if (!('ai' in window) || !('languageDetector' in (window as any).ai)) {
        alert(
          'This application is not supported in your browser. For best performance, please use Chrome 132-135'
        );
        return;
      }

      try {
        const capabilities = await (
          window as any
        ).ai.languageDetector.capabilities();
        setLanguageDetectorStatus(capabilities);

        if (capabilities === 'no') {
          alert(
            'Language Detection is currently unavailable. Please try again later.'
          );
          return;
        }

        let detector;
        if (capabilities === 'readily') {
          detector = await (window as any).ai.languageDetector.create();
        } else {
          detector = await (window as any).ai.languageDetector.create({
            monitor(m: any) {
              m.addEventListener('downloadprogress', (e: any) => {
                console.log(`Downloaded ${e.loaded} of ${e.total} bytes.`);
              });
            },
          });
          await detector.ready;
        }

        setLanguageDetector(detector);
      } catch (error) {
        console.error('Language Detector initialization error:', error);
        alert(
          'Failed to initialize Language Detection. Please try again later.'
        );
      }
    };

    initLanguageDetector();
  }, []);

  const detectLanguage = async (text: string) => {
    if (!languageDetector) {
      // Only show alert if language detection was expected to be available
      if (languageDetectorStatus !== 'initializing') {
        alert(
          'Language Detection is not available. Translation may be less accurate.'
        );
      }
      return null;
    }

    try {
      const results = await languageDetector.detect(text);
      // Return the most confident result
      return results.length > 0
        ? {
            language: results[0].detectedLanguage,
            confidence: results[0].confidence,
          }
        : null;
    } catch (error) {
      console.error('Language detection error:', error);
      alert('Failed to detect language. Translation may be less accurate.');
      return null;
    }
  };

  const handleSendText = async (text: string) => {
    // Use crypto.randomUUID() for consistent ID generation
    const newMessage: Message = {
      id: crypto.randomUUID(),
      text,
      type: 'user',
    };

    let detectedLanguage = null;
    try {
      // Only attempt language detection if the API is available
      if ('ai' in window && 'languageDetector' in (window as any).ai) {
        detectedLanguage = await detectLanguage(text);
      }
    } catch (error) {
      console.error('Language detection error:', error);
    }

    if (detectedLanguage) {
      newMessage.detectedLanguage = detectedLanguage;
    }

    const aiResponse: Message = {
      id: crypto.randomUUID(),
      text: detectedLanguage
        ? `Detected language: ${
            LANGUAGE_NAMES[detectedLanguage.language] ||
            detectedLanguage.language
          }`
        : 'Unable to detect language automatically',
      type: 'ai',
    };

    setMessages((prevMessages) => [...prevMessages, newMessage, aiResponse]);
  };

  const handleTranslate = async (messageId: string, fromLanguage: string) => {
    // Check if Translator API is supported
    if (!('ai' in window) || !('translator' in (window as any).ai)) {
      alert('Translation is not supported in this browser.');
      return;
    }

    // Find the message to translate
    const messageToTranslate = messages.find(msg => msg.id === messageId);

    // Prevent re-translation of already translated text
    if (messageToTranslate?.translation?.translatedText) {
      alert('This text has already been translated. Choose a different language or message.');
      return;
    }

    // Open language selector and set initial translation target
    setShowLanguageSelector(true);
    setTranslationTarget({ messageId, fromLanguage });
  };

  const performTranslation = async (targetLanguage?: string) => {
    const languageToUse = targetLanguage || selectedLanguage;

    if (!translationTarget || !languageToUse) return;

    // Find the message to translate again to ensure it hasn't been translated
    const messageToTranslate = messages.find(msg => msg.id === translationTarget.messageId);
    
    // Additional check to prevent re-translation
    if (messageToTranslate?.translation?.translatedText) {
      alert('This text has already been translated. Choose a different language or message.');
      setShowLanguageSelector(false);
      return;
    }

    // Prevent translation to the same language
    if (translationTarget.fromLanguage === languageToUse) {
      alert('Please select a different language for translation.');
      setShowLanguageSelector(false);
      return;
    }

    setIsTranslating(true);

    try {
      // Check language pair availability
      const translatorCapabilities = await (window as any).ai.translator.capabilities();
      const pairAvailability = translatorCapabilities.languagePairAvailable(
        translationTarget.fromLanguage, 
        languageToUse
      );

      if (pairAvailability === 'no') {
        alert(`Translation from ${translationTarget.fromLanguage} to ${languageToUse} is not supported.`);
        setIsTranslating(false);
        return;
      }

      // Create translator
      const translator = await (window as any).ai.translator.create({
        sourceLanguage: translationTarget.fromLanguage,
        targetLanguage: languageToUse,
        monitor: (m: any) => {
          m.addEventListener('downloadprogress', (e: any) => {
            console.log(`Downloaded ${e.loaded} of ${e.total} bytes.`);
          });
        }
      });

      // Find the message to translate
      const messageToTranslate = messages.find(msg => msg.id === translationTarget.messageId);
      
      if (messageToTranslate) {
        // Perform translation
        const translatedText = await translator.translate(messageToTranslate.text);

        // Update messages with translation
        setMessages(prevMessages => 
          prevMessages.map(msg => {
            if (msg.id === translationTarget.messageId) {
              return {
                ...msg,
                translation: {
                  fromLanguage: translationTarget.fromLanguage,
                  toLanguage: languageToUse,
                  translatedText: translatedText
                }
              };
            }
            return msg;
          })
        );
      }
    } catch (error) {
      console.error('Translation error:', error);
      alert('Failed to translate the text.');
    } finally {
      // Reset translation state
      setTranslationTarget(null);
      setIsTranslating(false);
      setShowLanguageSelector(false);
    }
  };

  const handleLanguageChange = (toLanguage: string) => {
    // Always set the selected language and trigger translation
    setSelectedLanguage(toLanguage);
    performTranslation(toLanguage);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
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
            <OutputArea messages={messages} onTranslate={handleTranslate} isTranslating={isTranslating} />
            <LanguageSelector
              isOpen={showLanguageSelector}
              onClose={() => setShowLanguageSelector(false)}
              onLanguageChange={handleLanguageChange}
              selectedLanguage={selectedLanguage}
            />
          </div>

          <TextInput onSendText={handleSendText} />
        </div>
      </div>
    </div>
  );
}
