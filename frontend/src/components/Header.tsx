/**
 * Header Component - Responsive navigation header
 * Props: title?, showBack?, onBack?, rightAction?
 * Features: back button, title, contextual action on right
 * Accessibility: aria-labels, keyboard focus states, 44x44px targets
 */

import React from 'react';

export interface HeaderProps {
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
  rightAction?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({
  title = 'EcoQuest',
  showBack = false,
  onBack,
  rightAction,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
        {/* Left: Back button or spacer */}
        <div className="w-10 h-10">
          {showBack ? (
            <button
              onClick={onBack}
              aria-label="Go back"
              className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            >
              <svg
                className="w-6 h-6 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
          ) : null}
        </div>

        {/* Center: Title */}
        <h1 className="text-lg font-bold text-gray-900 flex-1 text-center">
          {title}
        </h1>

        {/* Right: Action button or spacer */}
        <div className="w-10 h-10 flex items-center justify-end">
          {rightAction}
        </div>
      </div>
    </header>
  );
};

export default Header;
