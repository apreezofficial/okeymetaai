import { useEffect, useRef, useState } from 'react';
import SuggestionButtons from '../components/SuggestionButtons';
import InputBox from '../components/InputBox';
import ChatHistory from '../components/ChatHistory';

export default function Home() {
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [hasChats, setHasChats] = useState(false);

  const handleSuggestionClick = (text: string) => {
    setInput(text);
    inputRef.current?.focus();
  };

  useEffect(() => {
    const stored = localStorage.getItem('chatHistory');
    if (stored && JSON.parse(stored).length > 0) {
      setHasChats(true);
    }
  }, []);

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-white dark:bg-black text-black dark:text-white">
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

      <div className="relative z-10 h-full flex flex-col">
        {!hasChats && (
          <div className="px-4 pt-8">
            <SuggestionButtons onSelect={handleSuggestionClick} currentInput={input} />
          </div>
        )}

        <div className="flex-1 overflow-y-auto px-4 pt-4 pb-36">
          <ChatHistory />
        </div>

        <div className="fixed bottom-0 left-0 right-0 z-20 bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800 px-4 py-3">
          <InputBox
            externalInput={input}
            setExternalInput={setInput}
            inputRef={inputRef}
          />
        </div>
      </div>
    </div>
  );
                  }
