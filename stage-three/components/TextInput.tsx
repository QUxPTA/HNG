import React, { useState } from 'react';

interface TextInputProps {
  onSendText: (text: string) => void;
}

const TextInput: React.FC<TextInputProps> = ({ onSendText }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onSendText(text);
      setText('');
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="p-4 bg-gray-50 dark:bg-gray-800 transition-colors duration-300"
    >
      <div className="flex items-center space-x-2">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text to process..."
          className="flex-grow p-3 border rounded-xl resize-none 
            bg-white dark:bg-gray-700 
            text-gray-900 dark:text-gray-100 
            border-gray-300 dark:border-gray-600
            focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
            transition-colors duration-300"
          rows={3}
          aria-label="Text input for processing"
        />
        <button 
          type="submit" 
          className="bg-blue-500 dark:bg-blue-700 
            text-white p-3 rounded-full 
            hover:bg-blue-600 dark:hover:bg-blue-800 
            transition-colors duration-300
            transform hover:scale-105 active:scale-95"
          aria-label="Send text"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </form>
  );
};

export default TextInput;
