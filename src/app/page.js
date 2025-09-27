'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

// List of drawing topics
const drawingTopics = [
  'bus',
  'truck',
  'plant',
  'face',
  'glasses',
  'pencil',
  'tree',
  'car',
  'house',
  'cat',
  'dog',
  'bird',
  'flower',
  'mountain',
  'river',
  'bridge',
  'clock',
  'book',
  'cup',
  'chair',
  'table',
  'lamp',
  'window',
  'door',
  'bicycle',
  'airplane',
  'boat',
  'fish',
  'butterfly',
  'apple',
  'banana',
  'cake',
  'pizza',
  'hat',
  'shoe',
  'bag',
  'phone',
  'computer',
  'key',
];

export default function Home() {
  const [currentTopic, setCurrentTopic] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Get today's drawing topic based on the date
  const getTodaysTopic = () => {
    const today = new Date();
    const dayOfYear = Math.floor(
      (today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24)
    );
    const topicIndex = dayOfYear % drawingTopics.length;
    return drawingTopics[topicIndex];
  };

  // Generate a random image URL for the topic (using Unsplash API)
  const generateImageUrl = (topic) => {
    const randomId = Math.floor(Math.random() * 1000);
    return `https://picsum.photos/400/300?random=${randomId}&topic=${topic}`;
  };

  // Initialize the page
  useEffect(() => {
    const topic = getTodaysTopic();
    setCurrentTopic(topic);
    setImageUrl(generateImageUrl(topic));

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

  // Save theme preference to localStorage and apply to document
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));

    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Handle refresh button click
  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setImageUrl(generateImageUrl(currentTopic));
      setIsLoading(false);
    }, 500);
  };

  // Handle theme toggle
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div
      className="min-h-screen transition-colors duration-300"
      style={{ background: 'var(--bg-primary)' }}
    >
      {/* Header */}
      <header
        className="shadow-lg transition-colors duration-300"
        style={{ backgroundColor: 'var(--bg-secondary)' }}
      >
        <div className="max-w-4xl mx-auto px-4 py-6 flex justify-between items-center">
          <h1
            className="text-4xl font-bold text-center flex-1 transition-colors duration-300"
            style={{ color: 'var(--text-primary)' }}
          >
            Draw Something New Everyday
          </h1>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg transition-colors duration-200 hover:scale-105"
            style={{
              backgroundColor: 'var(--bg-toggle)',
              color: 'var(--text-toggle)',
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = 'var(--bg-toggle-hover)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'var(--bg-toggle)';
            }}
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div
          className="rounded-lg shadow-xl p-8 text-center transition-colors duration-300"
          style={{ backgroundColor: 'var(--bg-card)' }}
        >
          {/* Today's Topic */}
          <div className="mb-8">
            <h2
              className="text-2xl font-semibold mb-2 transition-colors duration-300"
              style={{ color: 'var(--text-secondary)' }}
            >
              Today&apos;s Drawing Challenge:
            </h2>
            <div
              className="text-4xl font-bold mb-4 capitalize transition-colors duration-300"
              style={{ color: 'var(--text-accent)' }}
            >
              {currentTopic}
            </div>
            <p
              className="transition-colors duration-300"
              style={{ color: 'var(--text-tertiary)' }}
            >
              Draw your interpretation of a{' '}
              <span className="font-semibold capitalize">{currentTopic}</span>
            </p>
          </div>

          {/* Image Display */}
          <div className="mb-8">
            <div className="relative inline-block">
              {isLoading ? (
                <div
                  className="w-96 h-72 rounded-lg flex items-center justify-center transition-colors duration-300"
                  style={{ backgroundColor: 'var(--bg-loading)' }}
                >
                  <div
                    className="animate-spin rounded-full h-12 w-12 border-b-2 transition-colors duration-300"
                    style={{ borderColor: 'var(--border-accent)' }}
                  ></div>
                </div>
              ) : imageUrl ? (
                <Image
                  src={imageUrl}
                  alt={`Reference image for drawing a ${currentTopic}`}
                  width={400}
                  height={300}
                  className="rounded-lg shadow-md"
                  onError={(e) => {
                    // Fallback to a simple colored div if image fails to load
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
              ) : null}
              {/* Fallback div */}
              <div
                className="w-96 h-72 rounded-lg flex items-center justify-center font-medium text-lg transition-colors duration-300"
                style={{
                  background: 'var(--bg-fallback)',
                  color: 'var(--text-secondary)',
                  display: isLoading || imageUrl ? 'none' : 'flex',
                }}
              >
                Image placeholder for {currentTopic}
              </div>
            </div>
          </div>

          {/* Refresh Button */}
          <button
            onClick={handleRefresh}
            disabled={isLoading}
            className="font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center mx-auto hover:scale-105 disabled:hover:scale-100 disabled:opacity-50"
            style={{
              backgroundColor: 'var(--bg-button)',
              color: 'white',
            }}
            onMouseEnter={(e) => {
              if (!isLoading) {
                e.target.style.backgroundColor = 'var(--bg-button-hover)';
              }
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'var(--bg-button)';
            }}
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Loading...
              </>
            ) : (
              <>
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                Get Different Image
              </>
            )}
          </button>

          {/* Instructions */}
          <div
            className="mt-8 p-4 rounded-lg transition-colors duration-300"
            style={{ backgroundColor: 'var(--bg-loading)' }}
          >
            <p
              className="text-sm transition-colors duration-300"
              style={{ color: 'var(--text-secondary)' }}
            >
              💡 <strong>Tip:</strong> Use the refresh button to see different
              examples of {currentTopic}s for inspiration!
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
