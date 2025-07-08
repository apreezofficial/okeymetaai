import {
  Paperclip,
  Mic,
  FileText,
  ImageIcon,
  Camera,
  Brain,
  Search,
  Sparkles,
  ArrowUpRight,
  Loader2,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

type Props = {
  externalInput: string;
  setExternalInput: React.Dispatch<React.SetStateAction<string>>;
  inputRef: React.RefObject<HTMLInputElement>;
};

const dynamicSuggestions: Record<'code' | 'image' | 'concept', string[]> = {
  code: ['a login page', 'a sorting algorithm', 'a weather API script'],
  image: ['a cyberpunk city', 'a flying car concept', 'a retro-futuristic sunset'],
  concept: ['quantum computing', 'AI alignment', 'web3 and decentralization'],
};

export default function InputBox({ externalInput, setExternalInput, inputRef }: Props) {
  const [contextTag, setContextTag] = useState<'code' | 'image' | 'concept' | null>(null);
  const [showUpload, setShowUpload] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const handleContextClick = (type: 'code' | 'image' | 'concept') => {
    const promptMap = {
      code: 'Help me generate a code of ',
      image: 'Create an image of ',
      concept: 'Explain ',
    };
    setExternalInput(promptMap[type]);
    setContextTag(type);
    inputRef.current?.focus();
  };

  const handleSend = () => {
    if (!externalInput.trim()) return;
    setIsSending(true);
    setTimeout(() => {
      console.log('Sent:', externalInput);
      setIsSending(false);
      setExternalInput('');
      setContextTag(null);
    }, 1500);
  };

  return (
    <div className="w-full">
      <div className="flex justify-center gap-2 mb-3 text-sm flex-wrap">
        <button onClick={() => handleContextClick('code')} className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-primary hover:text-black transition">Code</button>
        <button onClick={() => handleContextClick('image')} className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-primary hover:text-black transition">Image</button>
        <button onClick={() => handleContextClick('concept')} className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-primary hover:text-black transition">Concept</button>
      </div>

      <div className="relative w-full">
        <div className="flex items-center gap-2 p-3 bg-white/10 dark:bg-white/5 border border-primary rounded-xl backdrop-blur-md">
          <div className="relative">
            <button onClick={() => setShowUpload((prev) => !prev)} className="p-2 rounded hover:bg-white/10 transition">
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

          <button className="p-2 rounded hover:bg-white/10 transition">
            <Mic size={18} />
          </button>

          <input
            type="text"
            ref={inputRef}
            value={externalInput}
            onChange={(e) => setExternalInput(e.target.value)}
            placeholder="Ask me anything..."
            className="flex-1 bg-transparent outline-none text-sm placeholder:text-white/40"
          />

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

          <button
            onClick={handleSend}
            disabled={!externalInput.trim() || isSending}
            className="flex items-center justify-center gap-2 bg-primary text-black px-4 py-2 rounded-lg font-semibold hover:brightness-105 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {isSending ? (
              <>
                <Loader2 className="animate-spin h-4 w-4" />
                Thinking...
              </>
            ) : (
              <>
                Send
                <ArrowUpRight size={16} />
              </>
            )}
          </button>
        </div>

        {contextTag && dynamicSuggestions[contextTag] && (
          <div className="flex flex-wrap gap-2 mt-3 text-sm">
            {dynamicSuggestions[contextTag].map((sug, i) => (
              <button
                key={i}
                onClick={() => setExternalInput((prev) => prev + sug)}
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
