import { useState } from 'react';
import { Paperclip, Mic, Send, FileText, ImageIcon, Camera, Brain, Search, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const dynamicSuggestions: Record<string, string[]> = {
  code: ['a login page', 'a sorting algorithm', 'a weather API script'],
  image: ['a cyberpunk city', 'a flying car concept', 'a retro-futuristic sunset'],
  concept: ['quantum computing', 'AI alignment', 'web3 and decentralization'],
};

export default function InputBox() {
  const [input, setInput] = useState('');
  const [contextTag, setContextTag] = useState<string | null>(null);
  const [showUpload, setShowUpload] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const handleSuggestionClick = (type: string) => {
    const promptMap = {
      code: 'Help me generate a code of ',
      image: 'Create an image of ',
      concept: 'Explain ',
    };
    setInput(promptMap[type] || '');
    setContextTag(type);
  };

  const handleSend = () => {
    if (!input.trim()) return;
    setIsSending(true);
    // Simulate API
    setTimeout(() => {
      setIsSending(false);
      console.log('Sent:', input);
      setInput('');
      setContextTag(null);
    }, 1500);
  };

  return (
    <div className="w-full mt-8">
      {/* Suggestion trigger (simulate suggestion click) */}
      <div className="flex justify-center gap-2 mb-3 text-sm">
        <button onClick={() => handleSuggestionClick('code')} className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-primary hover:text-black transition">Code</button>
        <button onClick={() => handleSuggestionClick('image')} className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-primary hover:text-black transition">Image</button>
        <button onClick={() => handleSuggestionClick('concept')} className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-primary hover:text-black transition">Concept</button>
      </div>

      <div className="relative w-full">
        {/* Input Row */}
        <div className="flex items-center gap-2 p-3 bg-white/10 dark:bg-white/5 border border-primary rounded-xl backdrop-blur-md">
          {/* File Upload Menu */}
          <div className="relative">
            <button onClick={() => setShowUpload(prev => !prev)} className="p-2 rounded hover:bg-white/10 transition">
              <Paperclip size={18} />
            </button>
            <AnimatePresence>
              {showUpload && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  className="absolute left-0 top-10 bg-white dark:bg-black text-sm rounded-md border border-white/10 shadow-xl z-10 overflow-hidden"
                >
                  <button className="flex items-center gap-2 px-4 py-2 w-full hover:bg-primary hover:text-black">
                    <FileText size={16} /> Upload File
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 w-full hover:bg-primary hover:text-black">
                    <ImageIcon size={16} /> Upload Image
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 w-full hover:bg-primary hover:text-black">
                    <Camera size={16} /> Use Camera
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mic */}
          <button className="p-2 rounded hover:bg-white/10 transition">
            <Mic size={18} />
          </button>

          {/* Input */}
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything..."
            className="flex-1 bg-transparent outline-none text-sm placeholder:text-white/40"
          />

          {/* Utilities */}
          <div className="hidden md:flex gap-2">
            <button title="Search" className="p-2 rounded hover:bg-white/10 transition">
              <Search size={16} />
            </button>
            <button title="Reason" className="p-2 rounded hover:bg-white/10 transition">
              <Brain size={16} />
            </button>
            <button title="Think" className="p-2 rounded hover:bg-white/10 transition">
              <Sparkles size={16} />
            </button>
          </div>

          {/* Send Button */}
          <button
            onClick={handleSend}
            disabled={!input.trim() || isSending}
            className="bg-primary text-black px-4 py-2 rounded-lg font-medium hover:opacity-90 transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {isSending ? 'Thinking...' : 'Send'}
          </button>
        </div>

        {/* Contextual Sub-Suggestions */}
        {contextTag && dynamicSuggestions[contextTag] && (
          <div className="flex flex-wrap gap-2 mt-3 text-sm">
            {dynamicSuggestions[contextTag].map((sug, i) => (
              <button
                key={i}
                onClick={() => setInput(prev => prev + sug)}
                className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-primary hover:text-black transition"
              >
                {sug}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
    }
