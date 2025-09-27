import { RefreshCw, Loader2, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';

export function DrawingPrompt({ word, isLoading, error, onRefresh }) {
  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <Card className="p-6">
        <div className="aspect-square w-full rounded-lg overflow-hidden bg-muted flex items-center justify-center">
          {isLoading ? (
            <div className="flex flex-col items-center gap-2 text-muted-foreground">
              <Loader2 className="h-8 w-8 animate-spin" />
              <p>Loading new word...</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center gap-2 text-destructive">
              <AlertCircle className="h-8 w-8" />
              <p>Failed to load word</p>
              <p className="text-sm text-muted-foreground">{error}</p>
            </div>
          ) : word ? (
            <div className="text-center">
              <div className="text-6xl font-bold text-primary mb-4 capitalize">
                {word}
              </div>
              <p className="text-lg text-muted-foreground">
                Draw your interpretation of a{' '}
                <span className="font-semibold text-foreground">{word}</span>
              </p>
            </div>
          ) : (
            <div className="text-center text-muted-foreground">
              <p>Click "New Word" to get started!</p>
            </div>
          )}
        </div>
      </Card>

      <div className="flex justify-center">
        <Button
          onClick={onRefresh}
          disabled={isLoading}
          size="lg"
          className="gap-2"
        >
          <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          {isLoading ? 'Loading...' : 'New Word'}
        </Button>
      </div>

      <div className="text-center space-y-2 text-muted-foreground">
        <p>🎨 Take your time and enjoy the process</p>
        <p>✏️ Use any medium you like - pencil, paint, digital, etc.</p>
        <p>🔄 Don't like this word? Hit "New Word" for another prompt</p>
      </div>
    </div>
  );
}
