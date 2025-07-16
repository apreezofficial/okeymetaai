import { useEffect, useState } from 'react';
import {
  ThumbsUp,
  ThumbsDown,
  RotateCw,
  Trash2,
  Copy,
  Check,
  MoreVertical,
} from 'lucide-react';

const likeReasons = ['Helpful', 'Accurate', 'Clear explanation', 'Fast'];
const dislikeReasons = ['Incorrect', 'Confusing', 'Outdated', 'Slow'];

type Message = {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  liked?: boolean;
  disliked?: boolean;
  feedbackReason?: string;
};

export default function ChatHistory({
  setExternalInput,
}: {
  setExternalInput: (value: string) => void;
}) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [fetchDuration, setFetchDuration] = useState<number | null>(null);
  const [showReasons, setShowReasons] = useState<{
    index: number;
    type: 'like' | 'dislike';
  } | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const start = performance.now();
      const stored = localStorage.getItem('chatHistory');
      if (stored) {
        const parsed = JSON.parse(stored);
        setMessages(parsed);
        const lastMsg = parsed[parsed.length - 1];
        setIsTyping(lastMsg?.role === 'assistant' && lastMsg.content === '...');
        const end = performance.now();
        setFetchDuration(Number(((end - start) / 1000).toFixed(2)));
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const updateMessages = (newMsgs: Message[]) => {
    setMessages(newMsgs);
    localStorage.setItem('chatHistory', JSON.stringify(newMsgs));
  };

  const handleLike = (index: number) => {
    setShowReasons({ index, type: 'like' });
  };

  const handleDislike = (index: number) => {
    setShowReasons({ index, type: 'dislike' });
  };

  const handleSelectReason = (
    index: number,
    reason: string,
    type: 'like' | 'dislike'
  ) => {
    const updated = [...messages];
    updated[index].feedbackReason = reason;
    updated[index].liked = type === 'like';
    updated[index].disliked = type === 'dislike';
    updateMessages(updated);
    setShowReasons(null);
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
      updated.splice(index - 1, 2); // delete user + assistant
    } else {
      updated.splice(index, 1);
    }
    updateMessages(updated);
  };

  const handleCopy = (index: number, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
  <div className="w-full max-w-[100ch] mx-auto px-4 pb-40 space-y-6">
  {messages.map((msg, index) => {
    const isUser = msg.role === 'user';
    return (
      <div
        key={index}
        className={`group relative px-6 py-5 rounded-2xl transition-all shadow-md border max-w-[95%] sm:max-w-[85%] lg:max-w-[75%] ${
          isUser
            ? 'ml-auto text-right bg-yellow-100 dark:bg-yellow-900 border-yellow-200 dark:border-yellow-600'
            : 'mr-auto text-left bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-700'
        }`}
      >
        {/* Timestamp and role */}
        <div className="text-xs text-gray-500 mb-2 flex justify-between">
          <span>
            {isUser ? 'You' : 'Okeymeta'} • {new Date(msg.timestamp).toLocaleTimeString()}
          </span>
          {index === messages.length - 1 && fetchDuration !== null && (
            <span>{fetchDuration}s</span>
          )}
        </div>

        {/* Message content */}
        <div className="whitespace-pre-line leading-relaxed text-base text-black dark:text-white">
          {msg.content}
        </div>

        {/* Assistant actions */}
        {!isUser && (
          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
            <button
              onClick={() => handleLike(index)}
              className={`hover:text-green-600 ${msg.liked ? 'text-green-600 font-bold' : ''}`}
              title="Like"
            >
              <ThumbsUp size={18} />
            </button>

            <button
              onClick={() => handleDislike(index)}
              className={`hover:text-red-600 ${msg.disliked ? 'text-red-600 font-bold' : ''}`}
              title="Dislike"
            >
              <ThumbsDown size={18} />
            </button>

            <button
              onClick={() => handleRegenerate(msg.content)}
              className="hover:text-yellow-500"
              title="Regenerate"
            >
              <RotateCw size={18} />
            </button>

            <button
              onClick={() => handleCopy(index, msg.content)}
              className="hover:text-blue-600"
              title="Copy"
            >
              {copiedIndex === index ? <Check size={18} /> : <Copy size={18} />}
            </button>

            <button
              onClick={() => handleDelete(index)}
              className="hover:text-gray-500 ml-auto"
              title="Delete"
            >
              <Trash2 size={18} />
            </button>

            <button className="hover:text-gray-400" title="More">
              <MoreVertical size={18} />
            </button>
          </div>
        )}

        {/* Like/Dislike Feedback */}
        {showReasons &&
          showReasons.index === index &&
          (showReasons.type === 'like' ? likeReasons : dislikeReasons).map((reason, i) => (
            <button
              key={i}
              onClick={() => handleSelectReason(index, reason, showReasons.type)}
              className="mt-2 mr-2 text-xs px-3 py-1 rounded-full bg-white/10 hover:bg-primary hover:text-black border border-white/10 transition-all"
            >
              {reason}
            </button>
          ))}
      </div>
    );
  })}

  {isTyping && (
    <div className="animate-pulse px-6 py-5 rounded-2xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-gray-500 max-w-[75%]">
      Okeymeta is typing...
    </div>
  )}
</div>
  );
}
