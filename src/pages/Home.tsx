import ThemeToggle from '../components/ThemeToggle';
import BackgroundDots from '../components/BackgroundDots';

export default function Home() {
  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <BackgroundDots />
      <div className="text-center space-y-6 z-10">
        <h1 className="text-4xl font-bold text-primary">Welcome to Okey AI</h1>
        <p className="text-lg">Your smart assistant powered by AI.</p>
        <ThemeToggle />
      </div>
    </div>
  );
}
