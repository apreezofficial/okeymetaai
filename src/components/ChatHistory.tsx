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
    <div className="max-w-3xl mx-auto px-4 pb-32 space-y-6">
      {messages.map((msg, index) => {
        const isUser = msg.role === 'user';
        return (
          <div
            key={index}
            className={`group relative px-5 py-4 rounded-xl transition-all max-w-[90%] text-sm sm:text-base shadow-sm border ${
              isUser
                ? 'ml-auto text-right bg-primary/10 dark:bg-yellow-400/10 border-yellow-300/20 dark:border-yellow-500/20'
                : 'mr-auto text-left bg-neutral-100 dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800'
            }`}
          >
            {/* Timestamp and role */}
            <div className="text-xs text-neutral-400 mb-1 flex justify-between">
              <span>
                {isUser ? 'You' : 'Okeymeta'} •{' '}
                {new Date(msg.timestamp).toLocaleTimeString()}
              </span>
              {index === messages.length - 1 && fetchDuration !== null && (
                <span className="text-xs text-neutral-500">
                  {fetchDuration}s
                </span>
              )}
            </div>

            {/* Message content */}
            <div className="whitespace-pre-line leading-relaxed">{msg.content}</div>

            {/* Assistant actions */}
            {!isUser && (
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
                  onClick={() => handleCopy(index, msg.content)}
                  className="hover:text-blue-500"
                  title="Copy"
                >
                  {copiedIndex === index ? (
                    <Check size={16} />
                  ) : (
                    <Copy size={16} />
                  )}
                </button>

                <button
                  onClick={() => handleDelete(index)}
                  className="hover:text-gray-400 ml-auto"
                  title="Delete"
                >
                  <Trash2 size={16} />
                </button>

                <button
                  className="hover:text-gray-400"
                  title="More actions"
                >
                  <MoreVertical size={16} />
                </button>
              </div>
            )}

            {/* Like/Dislike feedback options */}
            {showReasons &&
              showReasons.index === index &&
              (showReasons.type === 'like' ? likeReasons : dislikeReasons).map(
                (reason, i) => (
                  <button
                    key={i}
                    onClick={() =>
                      handleSelectReason(index, reason, showReasons.type)
                    }
                    className="block mt-2 text-xs px-3 py-1 rounded-full bg-white/5 hover:bg-primary hover:text-black transition-all border border-white/10"
                  >
                    {reason}
                  </button>
                )
              )}
          </div>
        );
      })}

      {/* Typing indicator */}
      {isTyping && (
        <div className="animate-pulse px-5 py-4 rounded-xl text-left bg-[#f8f8f8] dark:bg-[#1a1a1a] border border-neutral-200 dark:border-neutral-800 max-w-full text-sm sm:text-base">
          <span className="text-neutral-500">Okeymeta is typing...</span>
        </div>
      )}
    </div>
  );
}
