/**
 * Badge Unlock Modal - Celebratory modal for earning badges
 * Props: badge, isOpen, onClose
 * Features: scale animation, confetti burst, share buttons
 * Animation: 600ms reveal with confetti particles
 */

import React, { useEffect } from 'react';
import '../styles/animations.css';

export interface BadgeData {
  name: string;
  tier: 'bronze' | 'silver' | 'gold';
  iconUrl?: string;
}

export interface BadgeUnlockModalProps {
  badge: BadgeData;
  isOpen: boolean;
  onClose: () => void;
}

const BadgeUnlockModal: React.FC<BadgeUnlockModalProps> = ({
  badge,
  isOpen,
  onClose,
}) => {
  useEffect(() => {
    if (isOpen) {
      // Generate confetti on modal open
      const confettiCount = 30;
      for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = `confetti ${i % 2 === 0 ? 'spin' : ''}`;
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.backgroundColor = [
          '#16a34a',
          '#06b6d4',
          '#fbbf24',
          '#f97316',
        ][Math.floor(Math.random() * 4)];
        confetti.style.animationDelay = Math.random() * 0.3 + 'ms';
        document.body.appendChild(confetti);

        setTimeout(() => confetti.remove(), 2500);
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const badgeColors = {
    bronze: 'from-orange-400 to-orange-600',
    silver: 'from-gray-300 to-gray-500',
    gold: 'from-yellow-300 to-yellow-500',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overlay-enter">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-sm w-full p-8 modal-enter">
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <svg
            className="w-6 h-6 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Content */}
        <div className="text-center">
          <p className="text-sm font-semibold text-green-600 mb-2 uppercase tracking-wide">
            🎉 Badge Unlocked!
          </p>

          {/* Badge Icon */}
          <div
            className={`w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center bg-gradient-to-br ${badgeColors[badge.tier]} badge-unlock-animation shadow-lg`}
          >
            {badge.iconUrl ? (
              <img
                src={badge.iconUrl}
                alt={badge.name}
                className="w-16 h-16"
              />
            ) : (
              <span className="text-5xl">⭐</span>
            )}
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {badge.name}
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            Great work! You earned a {badge.tier} badge.
          </p>

          {/* Share Buttons */}
          <div className="flex gap-3 mb-6">
            <button
              aria-label="Share on Twitter"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-blue-400 text-white font-semibold hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
            >
              <span>𝕏</span>
            </button>
            <button
              aria-label="Share with friends"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-800 transition"
            >
              <span>Share</span>
            </button>
          </div>

          <button
            onClick={onClose}
            className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-green-700 transition"
          >
            Keep Going
          </button>
        </div>
      </div>
    </div>
  );
};

export default BadgeUnlockModal;
