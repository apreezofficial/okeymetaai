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
  Settings2,
} from 'lucide-react';
import { useState } from 'react';

const utilityOptions = [
  { icon: <Search size={18} />, label: 'Search', key: 'search' },
  { icon: <Brain size={18} />, label: 'Reasoning', key: 'reasoning' },
  { icon: <Sparkles size={18} />, label: 'Creative', key: 'creative' },
];

type Props = {
  externalInput: string;
  setExternalInput: React.Dispatch<React.SetStateAction<string>>;
  inputRef: React.RefObject<HTMLTextAreaElement>;
};

export default function InputBox({
  externalInput,
  setExternalInput,
  inputRef,
}: Props) {
  const [showUpload, setShowUpload] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [selectedUtilities, setSelectedUtilities] = useState<string[]>([]);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const toggleUtility = (key: string) => {
    setSelectedUtilities((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

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
        <div className="flex items-end gap-2 p-2 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm transition-all focus-within:border-primary focus-within:shadow-md focus-within:shadow-primary/10">
          {/* Upload Button */}
          <div className="relative">
            <button
              onClick={() => setShowUpload(!showUpload)}
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

          {/* Voice Input */}
          <button
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
            aria-label="Voice input"
          >
            <Mic size={20} />
          </button>

          {/* Textarea Input */}
          <textarea
            ref={inputRef}
            rows={1}
            value={externalInput}
            onChange={(e) => setExternalInput(e.target.value)}
            placeholder="Ask anything..."
            className="flex-1 resize-none bg-transparent outline-none text-base placeholder:text-gray-400 dark:placeholder:text-gray-500 py-2 px-2"
            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
          />

          {/* Desktop Utilities */}
          <div className="hidden md:flex items-center gap-1 mr-2">
            {utilityOptions.map(({ key, icon, label }) => (
              <button
                key={key}
                onClick={() => toggleUtility(key)}
                className={`p-2 rounded-lg transition text-gray-500 dark:text-gray-400 hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-800 ${
                  selectedUtilities.includes(key)
                    ? 'bg-gray-200 dark:bg-gray-700 text-primary'
                    : ''
                }`}
                title={label}
              >
                {icon}
              </button>
            ))}
          </div>

          {/* Mobile Utility Button */}
          <div className="block md:hidden relative">
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="p-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"
              aria-label="Toggle utilities"
            >
              <Settings2 size={18} />
            </button>
            {showMobileMenu && (
              <div className="absolute bottom-12 right-0 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-lg rounded-xl z-20 p-2 flex flex-col gap-2 w-44">
                {utilityOptions.map(({ key, icon, label }) => (
                  <button
                    key={key}
                    onClick={() => toggleUtility(key)}
                    className={`flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition ${
                      selectedUtilities.includes(key)
                        ? 'bg-gray-200 dark:bg-gray-700 text-primary'
                        : 'text-gray-600 dark:text-gray-300'
                    }`}
                  >
                    {icon} <span className="text-sm">{label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Send Button */}
          <button
            onClick={handleSend}
            disabled={!externalInput.trim() || isSending}
            className={`ml-2 transition-all ${
              !externalInput.trim() ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
            }`}
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
            <div className="block md:hidden w-10 h-10 flex items-center justify-center rounded-full bg-primary text-white">
              {isSending ? <Loader2 className="animate-spin w-5 h-5" /> : <ArrowUpRight size={20} />}
            </div>
          </button>
        </div>

        {/* Help text */}
        <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 text-center">
          Press Enter to send • Shift+Enter for new line
        </div>
      </div>
    </div>
  );
                                               }
