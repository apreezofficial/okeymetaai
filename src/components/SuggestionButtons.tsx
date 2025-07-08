import { useState } from 'react';
import { Code, ImageIcon, Sparkles } from 'lucide-react';

declare const OkeyMetaClient: any;
const icons = {
  code: <Code size={16} />,
  image: <ImageIcon size={16} />,
  concept: <Sparkles size={16} />,
};

type ContextType = 'code' | 'image' | 'concept';

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

  const getPromptTemplate = (ctx: ContextType) => {
    switch (ctx) {
      case 'code':
        return 'Give me 3 popular coding ideas a beginner can try.';
      case 'image':
        return 'List 3 creative image prompts I can generate.';
      case 'concept':
        return 'Suggest 3 interesting tech concepts to explain.';
    }
  };

  const handleClick = async (context: ContextType) => {
    setActiveContext(context);
    onSelect(getBasePrompt(context));
    setLoading(true);
    setTips([]);

    try {
      const client = new OkeyMetaClient({
        auth_token: 'okeyai_b4749ef67c5a97f17f88a36fd1894adc35723310817b04ec9fc9d1b3b4e93eab', 
      });

      const prompt = getPromptTemplate(context);

      const response = await client.textCompletion({
        model: 'okeyai3.0-vanguard',
        input: prompt,
      });

      console.log('OkeyMeta AI Response:', response);

      const tipsList = response
        .split('\n')
        .map((line: string) => line.replace(/^\d+\.\s*/, '').trim())
        .filter(Boolean);

      setTips(tipsList);
    } catch (err: any) {
      console.error('OkeyMeta Error:', err.message);
      setTips(['Failed to load suggestions']);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="flex flex-wrap justify-center gap-3 mt-6">
        {(['code', 'image', 'concept'] as ContextType[]).map((context) => (
          <button
            key={context}
            onClick={() => handleClick(context)}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 dark:bg-white/5 text-sm backdrop-blur-md border border-white/10 hover:bg-primary hover:text-black transition-all duration-300 shadow hover:scale-105"
          >
            {icons[context]}
            {context === 'code'
              ? 'Generate Code'
              : context === 'image'
              ? 'Create Image'
              : 'Explain Concept'}
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
