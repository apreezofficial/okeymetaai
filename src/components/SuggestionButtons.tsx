import { Code, ImageIcon, Sparkles } from 'lucide-react';

type Suggestion = {
  label: string;
  icon: React.ReactNode;
  text: string;
};

const suggestions: Suggestion[] = [
  {
    label: 'Generate Code',
    icon: <Code size={16} />,
    text: 'Write a JavaScript function that sorts an array of numbers.',
  },
  {
    label: 'Create Image',
    icon: <ImageIcon size={16} />,
    text: 'Create an image of a robot meditating in space.',
  },
  {
    label: 'Explain Concept',
    icon: <Sparkles size={16} />,
    text: 'Explain the blockchain to a 12-year-old.',
  },
];

export default function SuggestionButtons({
  onSelect,
}: {
  onSelect: (text: string) => void;
}) {
  return (
    <div className="flex flex-wrap justify-center gap-3 mt-6">
      {suggestions.map((s, i) => (
        <button
          key={i}
          onClick={() => onSelect(s.text)}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 dark:bg-white/5 text-sm backdrop-blur-md border border-white/10 hover:bg-primary hover:text-black dark:hover:text-black transition-all duration-300 shadow hover:scale-105"
        >
          {s.icon}
          {s.label}
        </button>
      ))}
    </div>
  );
}
