import { useState } from 'react';
import { RefreshCw, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';

export function DrawingPrompt({ imageUrl, isLoading, onRefresh }) {
  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <Card className="p-6">
        <div className="aspect-square w-full rounded-lg overflow-hidden bg-muted flex items-center justify-center">
          {isLoading ? (
            <div className="flex flex-col items-center gap-2 text-muted-foreground">
              <Loader2 className="h-8 w-8 animate-spin" />
              <p>Loading new prompt...</p>
            </div>
          ) : imageUrl ? (
            <></>
          ) : (
            // <ImageWithFallback
            //   src={imageUrl}
            //   alt="Drawing prompt - a random image to inspire your art"
            //   className="w-full h-full object-cover"
            // />
            <div className="text-center text-muted-foreground">
              <p>Click "New Prompt" to get started!</p>
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
          {isLoading ? 'Loading...' : 'New Prompt'}
        </Button>
      </div>

      <div className="text-center space-y-2 text-muted-foreground">
        <p>🎨 Take your time and enjoy the process</p>
        <p>✏️ Use any medium you like - pencil, paint, digital, etc.</p>
        <p>🔄 Don't like this one? Hit "New Prompt" for another image</p>
      </div>
    </div>
  );
}
