import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import ReactCountryFlag from 'react-country-flag';

interface LanguageSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onLanguageChange: (language: string) => void;
  selectedLanguage: string;
}

const LANGUAGES = [
  { code: 'en', name: 'English', countryCode: 'US' },
  { code: 'pt', name: 'Portuguese', countryCode: 'BR' },
  { code: 'es', name: 'Spanish', countryCode: 'ES' },
  { code: 'ru', name: 'Russian', countryCode: 'RU' },
  { code: 'tr', name: 'Turkish', countryCode: 'TR' },
  { code: 'fr', name: 'French', countryCode: 'FR' },
];

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  isOpen,
  onClose,
  onLanguageChange,
  selectedLanguage,
}) => {
  const handleLanguageSelect = (langCode: string) => {
    onLanguageChange(langCode);
    onClose();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog 
        as="div" 
        className="relative z-50" 
        onClose={onClose}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel 
                className="w-full max-w-md transform overflow-hidden rounded-2xl 
                  bg-white dark:bg-gray-800 p-6 text-left align-middle 
                  shadow-xl transition-all"
              >
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100 mb-4"
                >
                  Select Translation Language
                </Dialog.Title>
                
                <div className='grid grid-cols-3 gap-4'>
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageSelect(lang.code)}
                      className={`
                        flex flex-col items-center justify-center 
                        p-3 rounded-xl 
                        transition-all duration-300 
                        hover:bg-blue-100/50 dark:hover:bg-blue-900/50
                        ${selectedLanguage === lang.code 
                          ? 'ring-2 ring-blue-500 bg-blue-100/30 dark:bg-blue-900/30' 
                          : 'hover:scale-105'}
                      `}
                      aria-label={`Select ${lang.name}`}
                    >
                      <ReactCountryFlag
                        countryCode={lang.countryCode}
                        svg
                        style={{
                          width: '2.5rem',
                          height: '2rem',
                          borderRadius: '0.5rem',
                          marginBottom: '0.5rem',
                        }}
                      />
                      <span className='text-sm text-gray-700 dark:text-gray-300'>
                        {lang.name}
                      </span>
                    </button>
                  ))}
                </div>

                <div className="mt-4 flex justify-end">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border 
                      border-transparent bg-blue-100 px-4 py-2 text-sm 
                      font-medium text-blue-900 hover:bg-blue-200 
                      focus:outline-none focus-visible:ring-2 
                      focus-visible:ring-blue-500 focus-visible:ring-offset-2
                      dark:bg-blue-900 dark:text-blue-100 
                      dark:hover:bg-blue-800"
                    onClick={onClose}
                  >
                    Close
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default LanguageSelector;
