import { useState, useRef } from 'react';
import SuggestionButtons from '../components/SuggestionButtons';
import InputBox from '../components/InputBox';
import BackgroundDots from '../components/BackgroundDots';
import ThemeToggle from '../components/ThemeToggle';

export default function Home() {
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSuggestionClick = (text: string) => {
    setInput(text);
    inputRef.current?.focus();
  };

  return (
    <div className="relative min-h-screen bg-white dark:bg-black text-black dark:text-white px-4 flex flex-col items-center justify-center">
      <BackgroundDots />

      <div className="w-full max-w-2xl space-y-6 z-10 text-center">

        <SuggestionButtons
          onSelect={handleSuggestionClick}
          currentInput={input}
        />

        <InputBox
          externalInput={input}
          setExternalInput={setInput}
          inputRef={inputRef}
        />

        <div className="mt-4">
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}
