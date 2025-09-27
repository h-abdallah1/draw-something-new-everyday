'use client';

import { Button } from '@/components/ui/button';
import { useTheme } from '../hooks/useTheme';
import { useRandomWord } from '../hooks/useRandomWord';
import { useUnsplashImage } from '../hooks/useUnsplashImage';
import { Sun } from 'lucide-react';
import { Moon } from 'lucide-react';
import { DrawingPrompt } from '@/components/DrawingPrompt';
import { LineSquiggle } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { RefreshCw } from 'lucide-react';

const HAS_LOGO = true;

const WordLabel = ({ word, onClick, loading, disabled }) => (
  <div className="flex justify-center items-center gap-x-2">
    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
      {word}
    </h3>
    <Tooltip>
      <TooltipTrigger>
        <Button
          onClick={onClick}
          disabled={disabled}
          size="lg"
          variant="ghost"
          className="gap-2"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Add to library</p>
      </TooltipContent>
    </Tooltip>
  </div>
);

export default function Home() {
  const { isDarkMode, toggleTheme } = useTheme();
  const {
    word,
    isLoading: wordLoading,
    error: wordError,
    fetchRandomWord,
  } = useRandomWord();
  const {
    imageData,
    isLoading: imageLoading,
    error: imageError,
    fetchImage,
  } = useUnsplashImage(word);

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
                <span className="text-primary-foreground">
                  <LineSquiggle />
                </span>
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
      <main className="container flex flex-col mx-auto px-4 py-8 gap-y-5">
        <div className="flex flex-col text-center gap-y-2">
          <h2 className="">Today&apos;s Drawing Prompt</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Challenge yourself with a new word to draw. Practice your skills and
            develop your artistic style one drawing at a time.
          </p>
        </div>
        <div>
          <WordLabel
            word={word}
            onCLick={fetchRandomWord}
            disabled={wordLoading || imageError}
            loading={wordLoading || imageLoading}
          />
        </div>
        <DrawingPrompt
          word={word}
          imageData={imageData}
          isLoading={wordLoading || imageLoading}
          error={wordError || imageError}
          onRefresh={fetchRandomWord}
        />
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/50 mt-16">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          <div className="flex flex-row gap-x-2 justify-between items-center">
            <div>
              <p>Draw Daily - a project by @habdallah-1 on github</p>
            </div>
            <div className="flex flex-row gap-x-5">
              <a>About</a>
              <a>Changelog</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
