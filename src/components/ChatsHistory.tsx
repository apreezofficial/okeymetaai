import { useEffect, useState } from 'react';

type Message = {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
};

export default function ChatHistory() {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('chatHistory');
    if (stored) {
      setMessages(JSON.parse(stored));
    }
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 pb-8">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`mb-4 p-4 rounded-xl shadow-sm max-w-[90%] ${
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
        </div>
      ))}
    </div>
  );
  }
