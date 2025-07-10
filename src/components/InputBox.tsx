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
import { useState, useEffect } from 'react';
import { OkeyMetaClient } from 'okeymeta-ai-sdk';

const utilityOptions = [
  { icon: <Search size={18} />, label: 'Search', key: 'search' },
  { icon: <Brain size={18} />, label: 'Reasoning', key: 'reasoning' },
  { icon: <Sparkles size={18} />, label: 'Creative', key: 'creative' },
];
const client = new OkeyMetaClient({
  auth_token: 'sk-8e93b9ad8b3c44e9bba0c737a0c12345',
});

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

  const handleSend = async () => {
    const content = externalInput.trim();
    if (!content) return;

    setIsSending(true);

    const newMessage = { role: 'user', content, timestamp: Date.now() };
    const chatHistory = JSON.parse(localStorage.getItem('chatHistory') || '[]');
    const updated = [...chatHistory, newMessage];
    localStorage.setItem('chatHistory', JSON.stringify(updated));

    try {
      const reply = await client.textCompletion({
        model: 'okeyai3.0-vanguard',
        input: content,
      });

      const assistantMsg = { role: 'assistant', content: reply, timestamp: Date.now() };
      localStorage.setItem(
        'chatHistory',
        JSON.stringify([...updated, assistantMsg])
      );
    } catch (err) {
      console.error('Error from OkeyMeta:', err);
    } finally {
      setExternalInput('');
      setIsSending(false);
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = inputRef.current.scrollHeight + 'px';
    }
  }, [externalInput]);

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <div className="bg-white dark:bg-gray-900 border rounded-2xl shadow-sm p-2 relative">
        <textarea
          ref={inputRef}
          value={externalInput}
          onChange={(e) => setExternalInput(e.target.value)}
          placeholder="Ask anything..."
          className="w-full resize-none bg-transparent outline-none text-base placeholder-gray-400 dark:placeholder-gray-500 py-4 px-4 rounded-xl"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
        />
        <div className="absolute bottom-2 left-2 right-2 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="relative">
              <button onClick={() => setShowUpload(!showUpload)} className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800">
                <Paperclip size={20} />
              </button>
              {showUpload && (
                <div className="absolute bottom-12 left-0 bg-white dark:bg-gray-800 border rounded-xl shadow-lg w-48 z-20 text-sm">
                  <button className="flex items-center gap-3 w-full px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700">
                    <FileText size={18} /> Upload File
                  </button>
                  <button className="flex items-center gap-3 w-full px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700">
                    <ImageIcon size={18} /> Upload Image
                  </button>
                  <button className="flex items-center gap-3 w-full px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700">
                    <Camera size={18} /> Use Camera
                  </button>
                </div>
              )}
            </div>
            <button className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800">
              <Mic size={20} />
            </button>
          </div>
          <div className="hidden md:flex items-center gap-2">
            {utilityOptions.map(({ key, icon, label }) => (
              <button
                key={key}
                onClick={() => toggleUtility(key)}
                className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm ${
                  selectedUtilities.includes(key)
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {icon}
                {label}
              </button>
            ))}
          </div>
          <div className="block md:hidden flex items-center gap-2">
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="p-2 rounded-lg border bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"
            >
              <Settings2 size={18} />
            </button>
            <button
              onClick={handleSend}
              disabled={!externalInput.trim() || isSending}
              className={`w-10 h-10 flex items-center justify-center rounded-full bg-primary text-white ${
                !externalInput.trim() ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
              }`}
            >
              {isSending ? <Loader2 className="animate-spin w-5 h-5" /> : <ArrowUpRight size={20} />}
            </button>
          </div>
          {showMobileMenu && (
            <div className="absolute bottom-14 right-2 bg-white dark:bg-gray-900 border rounded-xl shadow-lg z-30 p-2 w-44">
              {utilityOptions.map(({ key, icon, label }) => (
                <button
                  key={key}
                  onClick={() => toggleUtility(key)}
                  className={`flex items-center gap-2 p-2 w-full rounded-lg text-sm ${
                    selectedUtilities.includes(key)
                      ? 'bg-primary text-white'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  {icon} {label}
                </button>
              ))}
            </div>
          )}
          <div className="hidden md:block">
            <button
              onClick={handleSend}
              disabled={!externalInput.trim() || isSending}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-white font-medium ${
                !externalInput.trim() ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
              }`}
            >
              {isSending ? (
                <>
                  <Loader2 className="animate-spin h-4 w-4" /> Sending...
                </>
              ) : (
                <>
                  Send <ArrowUpRight size={16} />
                </>
              )}
            </button>
          </div>
        </div>
        <div className="mt-3 text-xs text-gray-500 dark:text-gray-400 text-center">
          Press Enter to send • Shift+Enter for new line
        </div>
      </div>
    </div>
  );
}
