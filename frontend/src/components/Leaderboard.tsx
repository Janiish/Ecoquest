/**
 * Leaderboard Component - Real-time user rankings
 * Props: users, local?
 * Features: top 3 highlighted, top 10 list, real-time indicator
 * Accessibility: semantic HTML, aria-labels for ranks
 */

import React from 'react';

export interface LeaderboardUser {
  id: string;
  name: string;
  xp: number;
  city?: string;
}

export interface LeaderboardProps {
  users: LeaderboardUser[];
  local?: string;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ users, local }) => {
  // Get top 3 for podium, then top 10 for list
  const top3 = users.slice(0, 3);
  const top10 = users.slice(0, 10);

  return (
    <div className="w-full max-w-md mx-auto px-4 py-6 bg-white rounded-2xl">
      <h2 className="text-xl font-bold text-gray-900 mb-6">
        {local ? `${local} Leaderboard` : 'Global Leaderboard'}
      </h2>

      {/* Podium for top 3 */}
      {top3.length > 0 && (
        <div className="mb-8">
          <div className="grid grid-cols-3 gap-2 mb-4">
            {/* 2nd Place */}
            {top3[1] && (
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center text-white font-bold mb-2">
                  🥈
                </div>
                <p className="text-xs font-bold text-gray-700 text-center truncate">
                  {top3[1].name}
                </p>
                <p className="text-xs text-gray-500">{top3[1].xp} XP</p>
              </div>
            )}

            {/* 1st Place */}
            {top3[0] && (
              <div className="flex flex-col items-center -mt-2">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-300 to-yellow-500 flex items-center justify-center text-white font-bold mb-2 shadow-lg">
                  👑
                </div>
                <p className="text-xs font-bold text-gray-900 text-center truncate">
                  {top3[0].name}
                </p>
                <p className="text-xs text-gray-600">{top3[0].xp} XP</p>
              </div>
            )}

            {/* 3rd Place */}
            {top3[2] && (
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-300 to-orange-400 flex items-center justify-center text-white font-bold mb-2">
                  🥉
                </div>
                <p className="text-xs font-bold text-gray-700 text-center truncate">
                  {top3[2].name}
                </p>
                <p className="text-xs text-gray-500">{top3[2].xp} XP</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Numbered list for top 10 */}
      <div className="space-y-2 border-t pt-4">
        {top10.map((user, index) => (
          <div
            key={user.id}
            className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition"
          >
            <div className="flex items-center gap-3 flex-1">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm"
                style={{
                  backgroundColor:
                    index === 0 ? '#fbbf24' : index === 1 ? '#d1d5db' : index === 2 ? '#f97316' : '#e5e7eb',
                  color: index < 3 ? '#fff' : '#666',
                }}
                aria-label={`Rank ${index + 1}`}
              >
                {index + 1}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">
                  {user.name}
                </p>
                {user.city && (
                  <p className="text-xs text-gray-500">{user.city}</p>
                )}
              </div>
            </div>

            {/* Real-time indicator for top 5 */}
            <div className="flex items-center gap-2">
              {index < 5 && (
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              )}
              <p className="text-sm font-bold text-green-600">{user.xp} XP</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
