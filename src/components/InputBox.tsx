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
    <div className="w-full max-w-4xl mx-auto px-4">
  <div className="relative w-full">
    <div className="flex items-center gap-2 p-1 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm transition-all focus-within:border-primary focus-within:shadow-md focus-within:shadow-primary/10">
      {/* Attachment dropdown */}
      <div className="relative">
        <button
          onClick={() => setShowUpload((prev) => !prev)}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
          aria-label="Attach files"
        >
          <Paperclip size={20} />
        </button>
        {showUpload && (
          <div className="absolute left-0 bottom-12 mb-2 bg-white dark:bg-gray-800 text-sm rounded-lg border border-gray-200 dark:border-gray-700 shadow-lg z-10 overflow-hidden w-48">
            <button className="flex items-center gap-3 px-4 py-3 w-full hover:bg-gray-50 dark:hover:bg-gray-700 text-left">
              <FileText size={18} className="text-gray-500 dark:text-gray-400" /> 
              <span>Upload File</span>
            </button>
            <button className="flex items-center gap-3 px-4 py-3 w-full hover:bg-gray-50 dark:hover:bg-gray-700 text-left">
              <ImageIcon size={18} className="text-gray-500 dark:text-gray-400" /> 
              <span>Upload Image</span>
            </button>
            <button className="flex items-center gap-3 px-4 py-3 w-full hover:bg-gray-50 dark:hover:bg-gray-700 text-left">
              <Camera size={18} className="text-gray-500 dark:text-gray-400" /> 
              <span>Use Camera</span>
            </button>
          </div>
        )}
      </div>

      {/* Voice input button */}
      <button 
        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
        aria-label="Voice input"
      >
        <Mic size={20} />
      </button>

      {/* Main input field */}
      <input
        type="text"
        ref={inputRef}
        value={externalInput}
        onChange={(e) => setExternalInput(e.target.value)}
        placeholder="Ask anything..."
        className="flex-1 bg-transparent outline-none text-base placeholder:text-gray-400 dark:placeholder:text-gray-500 py-3 px-2"
        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
      />

      {/* Utility buttons*/}
      <div className="hidden md:flex items-center gap-1 mr-2">
        <button 
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition text-gray-500 dark:text-gray-400 hover:text-primary"
          title="Search"
        >
          <Search size={18} />
        </button>
        <button 
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition text-gray-500 dark:text-gray-400 hover:text-primary"
          title="Reasoning mode"
        >
          <Brain size={18} />
        </button>
        <button 
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition text-gray-500 dark:text-gray-400 hover:text-primary"
          title="Creative mode"
        >
          <Sparkles size={18} />
        </button>
      </div>
   <button
        onClick={handleSend}
        disabled={!externalInput.trim() || isSending}
        className={`ml-auto transition-all duration-200 ${!externalInput.trim() ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}`}
        aria-label="Send message"
      >
        <div className="hidden md:flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-white font-medium">
          {isSending ? (
            <>
              <Loader2 className="animate-spin h-4 w-4" />
              <span>Thinking...</span>
            </>
          ) : (
            <>
              <span>Send</span>
              <ArrowUpRight size={16} />
            </>
          )}
        </div>
{/* Mobile send button */}
<div className="block md:hidden w-10 h-10 flex items-center justify-center rounded-full bg-primary text-white">
  {isSending ? (
    <Loader2 className="animate-spin w-5 h-5" />
  ) : (
    <ArrowUpRight size={20} />
  )}
</div>
      </button>
    </div>

    {/* Help text below input */}
    <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 text-center">
      Press Enter to send • Shift+Enter for new line
    </div>
  </div>
</div>
  );
}
