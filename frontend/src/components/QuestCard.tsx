/**
 * QuestCard Component - Compact and expanded quest display
 * Props: id, title, description, xp, difficulty?, onOpenUpload
 * Features: difficulty pill, xp badge, progress ring, card lift animation
 */

import React, { useState } from 'react';
import '../styles/animations.css';

export interface QuestCardCompactProps {
  id: string;
  title: string;
  description: string;
  xp: number;
  difficulty?: 'easy' | 'medium' | 'hard';
  completed?: boolean;
  onOpenUpload: (id: string) => void;
}

const QuestCard: React.FC<QuestCardCompactProps> = ({
  id,
  title,
  description,
  xp,
  difficulty = 'medium',
  completed = false,
  onOpenUpload,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const difficultyColors = {
    easy: 'bg-green-100 text-green-700',
    medium: 'bg-yellow-100 text-yellow-700',
    hard: 'bg-red-100 text-red-700',
  };

  const difficultyEmoji = {
    easy: '🌱',
    medium: '🌿',
    hard: '🔥',
  };

  return (
    <div
      onClick={() => setIsExpanded(!isExpanded)}
      className="card-hover-lift bg-white border border-gray-200 rounded-xl p-4 cursor-pointer transition-all"
      role="button"
      tabIndex={0}
      aria-expanded={isExpanded}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          setIsExpanded(!isExpanded);
        }
      }}
    >
      {/* Compact View */}
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-sm font-bold text-gray-900">{title}</h3>
            {completed && <span aria-label="Completed">✅</span>}
          </div>
          <p className="text-xs text-gray-600 line-clamp-1">{description}</p>
        </div>

        {/* XP Badge */}
        <div className="flex items-center gap-2 ml-2">
          <div className="px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold flex items-center gap-1">
            <span>⚡</span>
            <span>{xp}</span>
          </div>
        </div>
      </div>

      {/* Difficulty Pill */}
      <div className="flex items-center gap-2 mt-3">
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${difficultyColors[difficulty]} flex items-center gap-1`}
        >
          <span>{difficultyEmoji[difficulty]}</span>
          <span className="capitalize">{difficulty}</span>
        </span>
      </div>

      {/* Expanded View */}
      {isExpanded && (
        <div className="mt-4 border-t pt-4 space-y-3">
          <p className="text-sm text-gray-700">{description}</p>

          {/* Progress Ring (mock) */}
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12">
              <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 24 24">
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="2"
                />
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  fill="none"
                  stroke="#16a34a"
                  strokeWidth="2"
                  strokeDasharray={`${completed ? 62.8 : 31.4} 62.8`}
                  strokeLinecap="round"
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-gray-900">
                {completed ? '100%' : '50%'}
              </span>
            </div>
            <div className="flex-1">
              <p className="text-xs font-semibold text-gray-900">
                {completed ? 'Completed!' : 'In Progress'}
              </p>
              <p className="text-xs text-gray-600">
                {xp} XP to earn
              </p>
            </div>
          </div>

          {/* Action Button */}
          {!completed && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpenUpload(id);
              }}
              className="w-full mt-3 px-4 py-2 rounded-lg bg-green-500 text-white font-semibold hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-700 transition text-sm"
              aria-label={`Submit proof for ${title}`}
            >
              📸 Submit Proof
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default QuestCard;
