import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="p-2 rounded bg-primary text-black dark:text-white"
    >
      {isDark ? 'Light Mode' : 'Dark Mode'}
    </button>
  );
    }
