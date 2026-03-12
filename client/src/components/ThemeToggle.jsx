
import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`fixed bottom-6 right-6 p-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 z-50 ${
        theme === 'dark'
          ? 'bg-slate-800 text-yellow-400 border border-slate-700 hover:bg-slate-700'
          : 'bg-white text-indigo-600 border border-slate-200 hover:bg-slate-50'
      }`}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
    </button>
  );
}
