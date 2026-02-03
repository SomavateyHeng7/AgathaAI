'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, systemTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button className="p-2 rounded-lg border border-gray-700 bg-gray-800">
        <div className="w-5 h-5" />
      </button>
    );
  }

  const currentTheme = theme === 'system' ? systemTheme : theme;
  const isDark = currentTheme === 'dark';

  const toggleTheme = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const newTheme = isDark ? 'light' : 'dark';
    console.log('Toggling theme from', currentTheme, 'to', newTheme);
    setTheme(newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      onMouseDown={(e) => e.stopPropagation()}
      className="p-2 rounded-lg border border-gray-700 bg-gray-800 hover:bg-gray-700 transition-colors cursor-pointer"
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      type="button"
    >
      {isDark ? (
        <Sun className="w-5 h-5 text-yellow-400" />
      ) : (
        <Moon className="w-5 h-5 text-gray-300" />
      )}
    </button>
  );
}
