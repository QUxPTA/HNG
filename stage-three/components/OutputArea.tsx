import React, { useRef, useEffect } from 'react';
import { UserIcon, SparklesIcon } from '@heroicons/react/24/solid';
import { Message } from '@/app/page';

interface OutputAreaProps {
  messages: Message[];
  onTranslate: (messageId: string, fromLanguage: string) => void;
  isTranslating?: boolean;
}

const LANGUAGE_NAMES: { [key: string]: string } = {
  'en': 'English',
  'pt': 'Portuguese',
  'es': 'Spanish',
  'ru': 'Russian',
  'tr': 'Turkish',
  'fr': 'French',
  'de': 'German',
  'it': 'Italian',
  'zh': 'Chinese',
  'ja': 'Japanese',
  'ko': 'Korean',
};

const OutputArea: React.FC<OutputAreaProps> = ({ 
  messages, 
  onTranslate, 
  isTranslating = false 
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Automatically scroll to the bottom when messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="p-4 space-y-4">
      {messages.map((message) => (
        <div 
          key={message.id} 
          className={`flex flex-col ${
            message.type === 'user' 
              ? 'items-end' 
              : 'items-start'
          }`}
        >
          <div 
            className={`flex items-center space-x-2 max-w-xl ${
              message.type === 'user' 
                ? 'flex-row-reverse space-x-reverse' 
                : ''
            }`}
          >
            {message.type === 'user' ? (
              <UserIcon 
                className="h-8 w-8 text-blue-600 dark:text-blue-400 flex-shrink-0" 
                aria-label="User message" 
              />
            ) : (
              <SparklesIcon 
                className="h-8 w-8 text-green-600 dark:text-green-400 flex-shrink-0" 
                aria-label="AI message" 
              />
            )}
            
            <div 
              className={`p-3 rounded-lg ${
                message.type === 'user' 
                  ? 'bg-blue-100 text-blue-900 dark:bg-blue-900 dark:text-blue-100' 
                  : 'bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-gray-100'
              } transition-colors duration-300`}
            >
              {message.type === 'user' && (
                <div>
                  <p>{message.text}</p>
                  
                  {message.translation && message.translation.translatedText && (
                    <div className="mt-2 p-3 bg-green-50 dark:bg-green-900 
                      text-green-900 dark:text-green-100 
                      rounded-lg text-sm italic">
                      {message.translation.translatedText}
                    </div>
                  )}
                  
                  {message.detectedLanguage && (
                    <div className="mt-2 text-xs text-gray-600 dark:text-gray-400 italic">
                      Detected Language: {LANGUAGE_NAMES[message.detectedLanguage.language] || message.detectedLanguage.language} 
                      {' '}(Confidence: {(message.detectedLanguage.confidence * 100).toFixed(2)}%)
                    </div>
                  )}
                  
                  {message.translation && (
                    <div className="mt-1 text-xs text-gray-600 dark:text-gray-400 italic">
                      Translated from {LANGUAGE_NAMES[message.translation.fromLanguage]} 
                      {' '}to {LANGUAGE_NAMES[message.translation.toLanguage]}
                    </div>
                  )}
                </div>
              )}
              
              {message.type === 'ai' && (
                <p>{message.text}</p>
              )}
            </div>
          </div>
          
          {message.type === 'user' && (
            <button 
              onClick={() => onTranslate(message.id, message.detectedLanguage?.language || 'en')}
              disabled={isTranslating}
              className={`mt-2 px-4 py-2 
                text-white rounded-lg 
                transition-colors duration-300
                text-sm
                ${isTranslating 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-green-500 dark:bg-green-700 hover:bg-green-600 dark:hover:bg-green-800'
                }`}
            >
              {isTranslating ? 'Translating...' : 'Translate'}
            </button>
          )}
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default OutputArea;
