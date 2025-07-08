import ThemeToggle from '../components/ThemeToggle';
import SuggestionButtons from '../components/SuggestionButtons';
import BackgroundDots from '../components/BackgroundDots';
import InputBox from '../components/InputBox';

export default function Home() {
  return (
    <div className="relative min-h-screen bg-white dark:bg-black text-black dark:text-white flex items-center justify-center px-4">
      <BackgroundDots />

      <div className="w-full max-w-2xl text-center space-y-6 z-10">

        {/* Suggestion Buttons */}
        <SuggestionButtons onSelect={(type) => {
          const map: any = {
            'Generate Code': 'Help me generate a code of ',
            'Create Image': 'Create an image of ',
            'Explain Concept': 'Explain ',
          };
          const text = map[type] || '';
          const event = new CustomEvent('suggestion-click', { detail: text });
          window.dispatchEvent(event);
        }} />

        <InputBox />

        <div className="mt-4">
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}
