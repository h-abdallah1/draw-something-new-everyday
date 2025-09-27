import { RefreshCw, Loader2, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import Image from 'next/image';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export function DrawingPrompt({
  word,
  imageData,
  isLoading,
  error,
  onRefresh,
}) {
  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <Card className="p-6">
        <div className="aspect-square w-full rounded-lg overflow-hidden bg-muted flex items-center justify-center">
          {isLoading ? (
            <div className="flex flex-col items-center gap-2 text-muted-foreground">
              <Loader2 className="h-8 w-8 animate-spin" />
              <p>Loading new prompt...</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center gap-2 text-destructive">
              <AlertCircle className="h-8 w-8" />
              <p>Failed to load prompt</p>
              <p className="text-sm text-muted-foreground">{error}</p>
            </div>
          ) : word ? (
            <div className="w-full h-full relative">
              {imageData ? (
                <Image
                  src={imageData.url}
                  alt={imageData.alt}
                  fill
                  className="object-cover"
                  onError={(e) => {
                    // Fallback to word display if image fails
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
              ) : null}
              {imageData && (
                <div className="absolute bottom-2 left-2 right-2 bg-black/70 text-white text-xs p-2 rounded backdrop-blur-sm">
                  <p className="truncate">
                    Photo by{' '}
                    <a
                      href={imageData.photographerUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:no-underline"
                    >
                      {imageData.photographer}
                    </a>{' '}
                    on Unsplash
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center text-muted-foreground">
              <p>Click "New Prompt" to get started!</p>
            </div>
          )}
        </div>
      </Card>

      <div className="text-center space-y-1 text-muted-foreground">
        <p>🎨 Take your time and enjoy the process</p>
        <p>✏️ Use any medium you like - pencil, paint, digital, etc.</p>
        <p>
          🔄 Keep drawing, keep improving. Every artist was first an amateur.
        </p>
      </div>
    </div>
  );
}
