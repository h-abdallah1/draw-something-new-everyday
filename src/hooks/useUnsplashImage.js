'use client';

import { useState, useEffect } from 'react';

export function useUnsplashImage(word) {
  const [imageData, setImageData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchImage = async (searchTerm) => {
    if (!searchTerm) return;

    setIsLoading(true);
    setError(null);

    try {
      // Call our backend API route
      const response = await fetch(
        `/api/unsplash?query=${encodeURIComponent(searchTerm)}`
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch image');
      }

      const result = await response.json();

      if (result.success && result.data) {
        setImageData(result.data);
      } else {
        throw new Error('No image data received');
      }
    } catch (err) {
      setError(err.message);
      console.error('Error fetching image:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch image when word changes
  useEffect(() => {
    if (word) {
      fetchImage(word);
    }
  }, [word]);

  return {
    imageData,
    isLoading,
    error,
    fetchImage,
  };
}
