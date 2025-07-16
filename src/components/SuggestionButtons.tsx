import { useState, useEffect } from 'react';
import { Code, ImageIcon, Sparkles } from 'lucide-react';

type ContextType = 'code' | 'image' | 'concept';
const icons = {
  code: <Code size={16} />,
  image: <ImageIcon size={16} />,
  concept: <Sparkles size={16} />,
};

export default function SuggestionButtons({
  onSelect,
  currentInput,
}: {
  onSelect: (text: string) => void;
  currentInput: string;
}) {
  const [activeContext, setActiveContext] = useState<ContextType | null>(null);
  const [tips, setTips] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasChatHistory, setHasChatHistory] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const stored = localStorage.getItem('chatHistory');
      setHasChatHistory(!!stored && JSON.parse(stored).length > 0);
    }, 10);
    return () => clearInterval(interval);
  }, []);

  const getBasePrompt = (ctx: ContextType) => {
    switch (ctx) {
      case 'code':
        return 'Help me generate a code of ';
      case 'image':
        return 'Create an image of ';
      case 'concept':
        return 'Explain ';
    }
  };

  const getPollinationsUrl = (ctx: ContextType) => {
    const prompt = encodeURIComponent(
      ctx === 'code'
        ? '3 beginner coding project ideas'
        : ctx === 'image'
        ? '3 creative image prompts'
        : '3 interesting tech concepts to explain'
    );
    return `https://text.pollinations.ai/${prompt}`;
  };

  const handleClick = async (ctx: ContextType) => {
    setActiveContext(ctx);
    onSelect(getBasePrompt(ctx));
    setLoading(true);
    setTips([]);

    try {
      const res = await fetch(getPollinationsUrl(ctx));
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const text = await res.text();
      const list = text
        .split('\n')
        .map(l => l.replace(/^\d+\.\s*/, '').trim())
        .filter(Boolean);
      setTips(list);
    } catch (e) {
      console.error('Pollinations error:', e);
      setTips(['Failed to load suggestions']);
    } finally {
      setLoading(false);
    }
  };

  // Hide suggestions if chat exists
  if (hasChatHistory) return null;

  return (
    <div className="w-full">
      <div className="flex flex-wrap justify-center gap-3 mt-6">
        {(['code', 'image', 'concept'] as ContextType[]).map(ctx => (
          <button
            key={ctx}
            onClick={() => handleClick(ctx)}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 dark:bg-white/5 text-sm backdrop-blur-md border border-white/10 hover:bg-primary hover:text-black transition duration-200 shadow hover:scale-105"
          >
            {icons[ctx]}
            {ctx === 'code' ? 'Generate Code' : ctx === 'image' ? 'Create Image' : 'Explain Concept'}
          </button>
        ))}
      </div>

      {activeContext && (
        <div className="flex flex-wrap justify-center gap-2 mt-4 text-sm">
          {loading && <p className="text-gray-400">Loading suggestions...</p>}
          {!loading &&
            tips.map((tip, i) => (
              <button
                key={i}
                onClick={() => onSelect(currentInput + tip)}
                className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-primary hover:text-black transition"
              >
                {tip}
              </button>
            ))}
        </div>
      )}
    </div>
  );
}
