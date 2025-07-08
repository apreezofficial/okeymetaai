import { useEffect, useState } from 'react';
import { Menu, Sun, Moon, Send, LogIn, LocateFixed } from 'lucide-react';
import clsx from 'clsx';

export default function Header() {
  const [dark, setDark] = useState(false);
  const [open, setOpen] = useState(false);

  // Theme toggle persistence with local storage(will use that of user logged when connected with supabase)
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
      setDark(true);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !dark;
    setDark(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', newTheme);
  };

  return (
    <header className="fixed top-0 w-full z-50 backdrop-blur-xl bg-white/10 dark:bg-black/20 border-b border-white/10 dark:border-white/10 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2 text-primary font-bold text-lg">
          <Send size={20} />
          OkeyAI
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          <button className="flex items-center gap-1 text-sm hover:text-primary transition">
            <LocateFixed size={16} />
            Track Order
          </button>
          <button className="flex items-center gap-1 text-sm hover:text-primary transition">
            <LogIn size={16} />
            Sign In
          </button>
          <button className="bg-primary text-black px-4 py-1.5 rounded-lg text-sm hover:scale-105 transition font-medium shadow">
            Submit
          </button>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-white/10 transition"
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </nav>

        {/* Mobile Nav Toggle */}
        <div className="md:hidden flex items-center gap-3">
          <button className="flex items-center gap-1 text-sm hover:text-primary transition">
            <LogIn size={16} />
            Sign In
          </button>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-white/10 transition"
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            onClick={() => setOpen(!open)}
            className="p-2 rounded hover:bg-white/10 transition"
          >
            <Menu size={20} />
          </button>
        </div>
      </div>

    </header>
  );
        }
