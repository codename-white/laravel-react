import React, { useState, useEffect, useCallback } from 'react';

// Helper function to generate a random hex color
const getRandomHexColor = (): string => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

// Icon component for the generate button
const SparklesIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.536a1 1 0 01-1.414 0l-1.06-1.06a1 1 0 011.414-1.414l1.06 1.06a1 1 0 010 1.414zM4.536 14.536a1 1 0 011.414 0l1.06 1.06a1 1 0 01-1.414 1.414l-1.06-1.06a1 1 0 010-1.414zM16 10a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM3 10a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zm.464-5.536a1 1 0 010 1.414l-1.06 1.06a1 1 0 01-1.414-1.414l1.06-1.06a1 1 0 011.414 0zM14.536 3.464a1 1 0 010 1.414l-1.06 1.06a1 1 0 11-1.414-1.414l1.06-1.06a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
);


const App: React.FC = () => {
  const [palette, setPalette] = useState<string[]>([]);
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  const generatePalette = useCallback(() => {
    const newPalette = Array.from({ length: 5 }, getRandomHexColor);
    setPalette(newPalette);
  }, []);

  // Generate initial palette on mount
  useEffect(() => {
    generatePalette();
  }, [generatePalette]);

  const handleCopy = useCallback((color: string) => {
    navigator.clipboard.writeText(color).then(() => {
      setCopiedColor(color);
      setTimeout(() => setCopiedColor(null), 1500);
    }).catch(err => {
      console.error('Failed to copy color: ', err);
    });
  }, []);

  return (
    <main className="bg-gray-900 min-h-screen flex flex-col items-center justify-center font-sans text-white p-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 mb-2">
          Creative Color Palette
        </h1>
        <p className="text-gray-400">Click a color to copy, or generate a new palette.</p>
      </div>

      <div className="w-full max-w-2xl bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-700">
        <div className="flex flex-col md:flex-row h-80">
          {palette.map((color) => (
            <div
              key={color}
              onClick={() => handleCopy(color)}
              className="flex-1 flex items-center justify-center text-lg font-mono cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105"
              style={{ backgroundColor: color }}
              aria-label={`Copy color ${color}`}
              role="button"
              tabIndex={0}
            >
              <span className="bg-black bg-opacity-50 text-white px-3 py-1 rounded-md">
                {copiedColor === color ? 'Copied!' : color}
              </span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-8">
        <button
          onClick={generatePalette}
          className="flex items-center justify-center px-8 py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-bold rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-cyan-500 focus:ring-opacity-50"
          aria-label="Generate new palette"
        >
          <SparklesIcon />
          <span className="ml-2">Generate New Palette</span>
        </button>
      </div>
    </main>
  );
};

export default App;