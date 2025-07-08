import { useState, useRef } from 'react';
import SuggestionButtons from '../components/SuggestionButtons';
import InputBox from '../components/InputBox';

export default function Home() {
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSuggestionClick = (text: string) => {
    setInput(text);
    inputRef.current?.focus();
  };

  return (
    <div className="relative min-h-screen w-screen bg-white dark:bg-black text-black dark:text-white px-4 flex flex-col items-center justify-center overflow-hidden">
      {/* Dots Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="w-full h-full grid grid-cols-12 gap-4 opacity-10 animate-pulse-slow">
          {[...Array(144)].map((_, i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-primary animate-floatingDot"
              style={{
                animationDelay: `${(i % 10) * 0.2}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-2xl space-y-6 z-10 text-center">
        <h1 className="text-4xl font-bold text-primary drop-shadow">Welcome to Okey AI</h1>
        <p className="text-lg">Your smart assistant powered by AI.</p>

        <SuggestionButtons onSelect={handleSuggestionClick} currentInput={input} />
        <InputBox externalInput={input} setExternalInput={setInput} inputRef={inputRef} />
      </div>
    </div>
  );
}
