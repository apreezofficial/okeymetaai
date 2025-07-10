import { useEffect, useState } from 'react';
import {
  ThumbsUp,
  ThumbsDown,
  RotateCw,
  Trash2,
  Copy,
} from 'lucide-react';

type Message = {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  liked?: boolean;
  disliked?: boolean;
};

export default function ChatHistory({
  setExternalInput,
}: {
  setExternalInput: (value: string) => void;
}) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const stored = localStorage.getItem('chatHistory');
      if (stored) {
        const parsed = JSON.parse(stored);
        setMessages(parsed);
        const lastMsg = parsed[parsed.length - 1];
        setIsTyping(lastMsg?.role === 'assistant' && lastMsg.content === '...');
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const updateMessages = (newMsgs: Message[]) => {
    setMessages(newMsgs);
    localStorage.setItem('chatHistory', JSON.stringify(newMsgs));
  };

  const handleLike = (index: number) => {
    const updated = [...messages];
    updated[index].liked = !updated[index].liked;
    if (updated[index].liked) updated[index].disliked = false;
    updateMessages(updated);
  };

  const handleDislike = (index: number) => {
    const updated = [...messages];
    updated[index].disliked = !updated[index].disliked;
    if (updated[index].disliked) updated[index].liked = false;
    updateMessages(updated);
  };

  const handleRegenerate = (content: string) => {
    setExternalInput(content);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (index: number) => {
    const updated = [...messages];
    if (
      updated[index].role === 'assistant' &&
      index > 0 &&
      updated[index - 1].role === 'user'
    ) {
      updated.splice(index - 1, 2); // Delete user + assistant
    } else {
      updated.splice(index, 1);
    }
    updateMessages(updated);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 pb-32 space-y-6">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`group relative px-5 py-4 rounded-xl transition-all max-w-full text-sm sm:text-base shadow-sm border ${
            msg.role === 'user'
              ? 'bg-neutral-100 dark:bg-neutral-900 ml-auto text-right border-transparent'
              : 'bg-[#f8f8f8] dark:bg-[#1a1a1a] mr-auto text-left border-neutral-200 dark:border-neutral-800'
          }`}
        >
          <div className="text-xs text-neutral-400 mb-1">
            {msg.role === 'user' ? 'You' : 'Okeymeta'} •{' '}
            {new Date(msg.timestamp).toLocaleTimeString()}
          </div>

          <div className="whitespace-pre-line leading-relaxed">
            {msg.content}
          </div>

          {msg.role === 'assistant' && (
            <div className="mt-3 flex gap-4 items-center text-neutral-500 text-xs">
              <button
                onClick={() => handleLike(index)}
                className={`hover:text-green-500 ${
                  msg.liked ? 'text-green-600' : ''
                }`}
                title="Like"
              >
                <ThumbsUp size={16} />
              </button>
              <button
                onClick={() => handleDislike(index)}
                className={`hover:text-red-500 ${
                  msg.disliked ? 'text-red-600' : ''
                }`}
                title="Dislike"
              >
                <ThumbsDown size={16} />
              </button>
              <button
                onClick={() => handleRegenerate(msg.content)}
                className="hover:text-yellow-500"
                title="Regenerate"
              >
                <RotateCw size={16} />
              </button>
              <button
                onClick={() => navigator.clipboard.writeText(msg.content)}
                className="hover:text-blue-500"
                title="Copy to clipboard"
              >
                <Copy size={16} />
              </button>
              <button
                onClick={() => handleDelete(index)}
                className="hover:text-gray-400 ml-auto"
                title="Delete message"
              >
                <Trash2 size={16} />
              </button>
            </div>
          )}
        </div>
      ))}

      {isTyping && (
        <div className="animate-pulse px-5 py-4 rounded-xl text-left bg-[#f8f8f8] dark:bg-[#1a1a1a] border border-neutral-200 dark:border-neutral-800 max-w-full text-sm sm:text-base">
          <span className="text-neutral-500">Okeymeta is typing...</span>
        </div>
      )}
    </div>
  );
      }
