'use client';

import { useState, useEffect } from 'react';

export function useTheme() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Initialize theme on component mount
  useEffect(() => {
    // Load theme preference from localStorage
    const savedTheme = localStorage.getItem('darkMode');
    let darkMode = false;

    if (savedTheme !== null) {
      darkMode = JSON.parse(savedTheme);
    } else {
      // Check system preference
      darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }

    setIsDarkMode(darkMode);

    // Apply dark mode to document
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Save theme preference and apply to document
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));

    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Toggle theme function
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return {
    isDarkMode,
    toggleTheme,
  };
}
