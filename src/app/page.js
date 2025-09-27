'use client';

import { Button } from '@/components/ui/button';
import { useTheme } from '../hooks/useTheme';
import { Sun } from 'lucide-react';
import { Moon } from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';
import { DrawingPrompt } from '@/components/DrawingPrompt';

const HAS_LOGO = false;

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
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {HAS_LOGO && (
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground">🎨</span>
              </div>
            )}
            <div>
              <h1 className="tracking-tight">Draw Daily</h1>
              <p className="text-sm text-muted-foreground">
                Something new to draw everyday
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={toggleTheme}
            className="rounded-full"
          >
            {isDarkMode ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h2 className="mb-2">Today&apos;s Drawing Prompt</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Challenge yourself with a new image to draw. Practice your skills
            and develop your artistic style one drawing at a time.
          </p>
        </div>
        <DrawingPrompt />
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/50 mt-16">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          <p>
            Keep drawing, keep improving. Every artist was first an amateur.
          </p>
        </div>
      </footer>
    </div>
  );
}
