import { useEffect, useState } from 'react';
import {
  ThumbsUp,
  ThumbsDown,
  RotateCw,
  Trash2,
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

  useEffect(() => {
    const stored = localStorage.getItem('chatHistory');
    if (stored) {
      setMessages(JSON.parse(stored));
    }
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
    updated.splice(index, 1);
    updateMessages(updated);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 pb-28 space-y-4">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`group relative p-4 rounded-xl shadow-md transition-all max-w-[90%] ${
            msg.role === 'user'
              ? 'bg-blue-100 dark:bg-blue-900 ml-auto text-right'
              : 'bg-gray-100 dark:bg-gray-800 mr-auto text-left'
          }`}
        >
          <div className="text-sm text-gray-500 mb-1">
            {msg.role === 'user' ? 'You' : 'AI'} •{' '}
            {new Date(msg.timestamp).toLocaleTimeString()}
          </div>

          <div className="text-base whitespace-pre-line">{msg.content}</div>

          {/* Action Buttons */}
          {msg.role === 'assistant' && (
            <div className="mt-3 flex gap-3 items-center text-gray-500 dark:text-gray-400 text-sm">
              <button
                onClick={() => handleLike(index)}
                className={`hover:text-green-500 ${
                  msg.liked ? 'text-green-600' : ''
                }`}
                title="Like"
              >
                <ThumbsUp size={18} />
              </button>

              <button
                onClick={() => handleDislike(index)}
                className={`hover:text-red-500 ${
                  msg.disliked ? 'text-red-600' : ''
                }`}
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
                onClick={() => handleDelete(index)}
                className="hover:text-gray-500 ml-auto"
                title="Delete message"
              >
                <Trash2 size={18} />
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
