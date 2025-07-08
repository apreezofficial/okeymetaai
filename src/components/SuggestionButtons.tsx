import { useState } from 'react';
import { Code, ImageIcon, Sparkles } from 'lucide-react';

type Suggestion = {
  label: string;
  icon: React.ReactNode;
  context: 'code' | 'image' | 'concept';
  text: string;
};

const suggestions: Suggestion[] = [
  {
    label: 'Generate Code',
    icon: <Code size={16} />,
    context: 'code',
    text: 'Help me generate a code of ',
  },
  {
    label: 'Create Image',
    icon: <ImageIcon size={16} />,
    context: 'image',
    text: 'Create an image of ',
  },
  {
    label: 'Explain Concept',
    icon: <Sparkles size={16} />,
    context: 'concept',
    text: 'Explain ',
  },
];

const dynamicSuggestions: Record<'code' | 'image' | 'concept', string[]> = {
  code: ['a login page', 'a sorting algorithm', 'a weather API script'],
  image: ['a cyberpunk city', 'a flying car concept', 'a retro-futuristic sunset'],
  concept: ['quantum computing', 'AI alignment', 'web3 and decentralization'],
};

export default function SuggestionButtons({
  onSelect,
}: {
  onSelect: (text: string) => void;
}) {
  const [activeContext, setActiveContext] = useState<'code' | 'image' | 'concept' | null>(null);

  const handleClick = (suggestion: Suggestion) => {
    setActiveContext(suggestion.context);
    onSelect(suggestion.text);
  };

  return (
    <div className="w-full">
      <div className="flex flex-wrap justify-center gap-3 mt-6">
        {suggestions.map((s, i) => (
          <button
            key={i}
            onClick={() => handleClick(s)}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 dark:bg-white/5 text-sm backdrop-blur-md border border-white/10 hover:bg-primary hover:text-black transition-all duration-300 shadow hover:scale-105"
          >
            {s.icon}
            {s.label}
          </button>
        ))}
      </div>

      {activeContext && (
        <div className="flex flex-wrap justify-center gap-2 mt-4 text-sm">
          {dynamicSuggestions[activeContext].map((tip, i) => (
            <button
              key={i}
              onClick={() => onSelect((prev) => prev + tip)}
              className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-primary hover:text-black transition-all"
            >
              {tip}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
