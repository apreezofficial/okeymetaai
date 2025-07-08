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
import { useState } from 'react';

type Props = {
  externalInput: string;
  setExternalInput: React.Dispatch<React.SetStateAction<string>>;
  inputRef: React.RefObject<HTMLInputElement>;
};

export default function InputBox({ externalInput, setExternalInput, inputRef }: Props) {
  const [showUpload, setShowUpload] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const handleSend = () => {
    if (!externalInput.trim()) return;
    setIsSending(true);
    setTimeout(() => {
      console.log('Sent:', externalInput);
      setIsSending(false);
      setExternalInput('');
    }, 1500);
  };

  return (
    <div className="w-full">
      <div className="relative w-full">
        <div className="flex items-center gap-2 p-3 bg-white/10 dark:bg-white/5 border border-primary rounded-xl backdrop-blur-md">
          {/* Upload button and menu */}
          <div className="relative">
            <button
              onClick={() => setShowUpload((prev) => !prev)}
              className="p-2 rounded hover:bg-white/10 transition"
            >
              <Paperclip size={18} />
            </button>
            {showUpload && (
              <div className="absolute left-0 top-10 bg-white dark:bg-black text-sm rounded-md border border-white/10 shadow-xl z-10 overflow-hidden">
                <button className="flex items-center gap-2 px-4 py-2 w-full hover:bg-primary hover:text-black">
                  <FileText size={16} /> Upload File
                </button>
                <button className="flex items-center gap-2 px-4 py-2 w-full hover:bg-primary hover:text-black">
                  <ImageIcon size={16} /> Upload Image
                </button>
                <button className="flex items-center gap-2 px-4 py-2 w-full hover:bg-primary hover:text-black">
                  <Camera size={16} /> Use Camera
                </button>
              </div>
            )}
          </div>

          {/* Mic button */}
          <button className="p-2 rounded hover:bg-white/10 transition">
            <Mic size={18} />
          </button>

          {/* Input */}
          <input
            type="text"
            ref={inputRef}
            value={externalInput}
            onChange={(e) => setExternalInput(e.target.value)}
            placeholder="Ask me anything..."
            className="flex-1 bg-transparent outline-none text-sm placeholder:text-white/40"
          />

          {/* Extra utility icons on desktop only */}
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

          {/* Send Button - desktop full, mobile icon only */}
          <button
            onClick={handleSend}
            disabled={!externalInput.trim() || isSending}
            className="bg-primary text-black font-semibold transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {/* Desktop full button */}
            <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg hover:brightness-105">
              {isSending ? (
                <>
                  <Loader2 className="animate-spin h-4 w-4" />
                  Thinking...
                </>
              ) : (
                <>
                  Send <ArrowUpRight size={16} />
                </>
              )}
            </div>

            {/* Mobile icon-only circular button */}
            <div className="md:hidden w-10 h-10 flex items-center justify-center rounded-full hover:brightness-105">
              {isSending ? (
                <Loader2 className="animate-spin w-5 h-5" />
              ) : (
                <ArrowUpRight size={18} />
              )}
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
