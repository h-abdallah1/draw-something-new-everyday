'use client';

import { Button } from '@/components/ui/button';
import { useTheme } from '../hooks/useTheme';
import { Sun } from 'lucide-react';
import { Moon } from 'lucide-react';

export default function Home() {
  const { isDarkMode, toggleTheme } = useTheme();

  // Debug: Log theme state
  console.log('Current theme:', isDarkMode ? 'dark' : 'light');

  return (
    <div
      className={`bg-background text-foreground ${
        isDarkMode ? 'dark' : 'light'
      }`}
    >
      <header className="flex justify-between items-center p-4">
        <h1 className="text-xl font-bold">Draw Something New Everyday</h1>

        {/* Theme Toggle Button */}
        <Button onClick={toggleTheme} aria-label="Toggle dark mode">
          {isDarkMode ? <Sun /> : <Moon />}
        </Button>
      </header>

      <main className="p-4">
        <p>Main content area</p>
        <p>Theme: {isDarkMode ? 'Dark' : 'Light'}</p>
        <div className="mt-4 p-4 bg-card text-card-foreground rounded">
          <p>Card with theme colors</p>
        </div>
      </main>

      <footer className="p-4">
        <p>Footer content</p>
      </footer>
    </div>
  );
}
