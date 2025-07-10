import { useRef, useState } from 'react';
import SuggestionButtons from '../components/SuggestionButtons';
import InputBox from '../components/InputBox';
import ChatHistory from '../components/ChatHistory'; 
export default function Home() {
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleSuggestionClick = (text: string) => {
    setInput(text);
    inputRef.current?.focus();
  };

  return (
    <div className="relative min-h-screen w-screen overflow-hidden bg-white dark:bg-black text-black dark:text-white px-4 pt-8 flex flex-col items-center">
      {/* Floating Dots */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 30 }).map((_, i) => {
          const left = Math.random() * 100;
          const top = Math.random() * 100;
          const delay = Math.random() * 3;
          const size = Math.random() * 8 + 4;

          return (
            <div
              key={i}
              className="absolute bg-primary rounded-full opacity-30 blur-sm animate-floatDot"
              style={{
                left: `${left}%`,
                top: `${top}%`,
                width: `${size}px`,
                height: `${size}px`,
                animationDelay: `${delay}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            />
          );
        })}
      </div>

      {/* Main Content */}
      <div className="w-full max-w-2xl z-10 space-y-5">
        <SuggestionButtons onSelect={handleSuggestionClick} currentInput={input} />

        <ChatHistory /> 
        <InputBox
          externalInput={input}
          setExternalInput={setInput}
          inputRef={inputRef}
        />
      </div>
    </div>
  );
                                        }
