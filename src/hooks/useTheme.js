'use client';

import { useState, useEffect } from 'react';

export function useTheme() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Initialize theme on component mount
  useEffect(() => {
    // Check if theme is already set in localStorage
    const theme = localStorage.getItem('theme');

    // Apply theme immediately to avoid FOUC
    document.documentElement.classList.toggle(
      'dark',
      theme === 'dark' ||
        (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)
    );

    // Update state
    setIsDarkMode(
      theme === 'dark' ||
        (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)
    );
  }, []);

  // Toggle theme function
  const toggleTheme = () => {
    const newTheme = isDarkMode ? 'light' : 'dark';

    // Update localStorage
    if (newTheme === 'light') {
      localStorage.setItem('theme', 'light');
    } else {
      localStorage.setItem('theme', 'dark');
    }

    // Apply theme to document
    document.documentElement.classList.toggle('dark', newTheme === 'dark');

    // Update state
    setIsDarkMode(newTheme === 'dark');
  };

  return {
    isDarkMode,
    toggleTheme,
  };
}
