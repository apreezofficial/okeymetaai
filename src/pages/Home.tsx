import { useState, useRef } from 'react';
import ThemeToggle from '../components/ThemeToggle';
import BackgroundDots from '../components/BackgroundDots';
import { Code, ImageIcon, Sparkles } from 'lucide-react';

const suggestions = [
  { label: 'Generate code snippet', icon: <Code size={18} />, text: 'Write a JavaScript function that reverses a string' },
  { label: 'Create an image', icon: <ImageIcon size={18} />, text: 'Create a futuristic cityscape with flying cars' },
  { label: 'Explain concept', icon: <Sparkles size={18} />, text: 'Explain quantum computing in simple terms' },
];

export default function Home() {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSuggestionClick = (text: string) => {
    setInputValue(text);
    inputRef.current?.focus();
  };

  return (
    <div className="relative min-h-screen bg-white dark:bg-black text-black dark:text-white flex items-center justify-center px-4">
      <BackgroundDots />

      <div className="w-full max-w-2xl text-center space-y-6 z-10">
        <h1 className="text-4xl font-bold text-primary drop-shadow">Welcome to Okey AI</h1>
        <p className="text-lg">Your smart assistant powered by AI.</p>

        {/* Suggestions */}
        <div className="flex flex-wrap justify-center gap-3">
          {suggestions.map((s, i) => (
            <button
              key={i}
              onClick={() => handleSuggestionClick(s.text)}
              className="flex items-center gap-2 border border-primary text-sm px-4 py-2 rounded-full bg-white/10 backdrop-blur-md hover:bg-primary hover:text-black transition"
            >
              {s.icon}
              {s.label}
            </button>
          ))}
        </div>

        {/* Input Box */}
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Ask me anything..."
          className="w-full mt-6 px-4 py-3 rounded-xl bg-white/10 dark:bg-white/5 text-sm border border-primary outline-none focus:ring-2 focus:ring-primary transition"
        />

        {/* Theme Toggle */}
        <div className="mt-4">
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
   }
