'use client';

import { useState, useEffect } from 'react';

export function useRandomWord() {
  const [word, setWord] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRandomWord = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        'https://random-word-api.herokuapp.com/word?number=1'
      );

      if (!response.ok) {
        throw new Error('Failed to fetch random word');
      }

      const words = await response.json();
      setWord(words[0]);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching random word:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch initial word on mount
  useEffect(() => {
    fetchRandomWord();
  }, []);

  return {
    word,
    isLoading,
    error,
    fetchRandomWord,
  };
}
