/**
 * Profile Page - User profile, XP, streak, badges, recent proofs
 */

import React from 'react';
import Header from '../components/Header';
import Leaderboard from '../components/Leaderboard';
import { mockUsers } from '../mocks/quests';

const ProfilePage: React.FC = () => {
  const user = mockUsers[0]; // Mock current user

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-cyan-50">
      <Header title="Profile" />

      <main className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* User Info */}
        <section className="bg-white rounded-2xl p-6 border border-gray-200 text-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-cyan-500 text-white text-3xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            {user.avatar}
          </div>
          <h1 className="text-2xl font-bold text-gray-900">{user.username}</h1>
          <p className="text-sm text-gray-600 mb-4">{user.city}</p>
          <button className="px-6 py-2 rounded-lg bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 transition text-sm">
            Edit Profile
          </button>
        </section>

        {/* Stats Grid */}
        <section className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <p className="text-sm text-gray-600">Total XP</p>
            <p className="text-3xl font-bold text-green-600 mt-1">
              {user.totalXp}
            </p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <p className="text-sm text-gray-600">Level</p>
            <p className="text-3xl font-bold text-cyan-600 mt-1">
              {user.level}
            </p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <p className="text-sm text-gray-600">Streak</p>
            <p className="text-3xl font-bold text-orange-600 mt-1">
              🔥 {user.streak}
            </p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <p className="text-sm text-gray-600">Badges</p>
            <p className="text-3xl font-bold text-yellow-600 mt-1">
              {user.badges.length}
            </p>
          </div>
        </section>

        {/* Badges */}
        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">⭐ Badges</h2>
          {user.badges.length > 0 ? (
            <div className="grid grid-cols-3 gap-3">
              {user.badges.map((badge) => (
                <div
                  key={badge.id}
                  className="bg-white rounded-lg p-4 border border-gray-200 text-center"
                >
                  <div className="text-3xl mb-2">
                    {badge.iconUrl || '⭐'}
                  </div>
                  <p className="text-xs font-semibold text-gray-900">
                    {badge.name}
                  </p>
                  <p className="text-xs text-gray-500 mt-1 capitalize">
                    {badge.tier}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 text-sm">No badges yet. Complete quests to earn them!</p>
          )}
        </section>

        {/* Leaderboard Preview */}
        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">
            🏆 Leaderboard
          </h2>
          <Leaderboard users={mockUsers.map(u => ({ id: u.id, name: u.username, xp: u.totalXp, city: u.city }))} />
        </section>

        {/* Settings */}
        <section className="flex gap-3 pb-8">
          <button className="flex-1 px-4 py-3 rounded-lg bg-white border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 transition">
            ⚙️ Settings
          </button>
          <button className="flex-1 px-4 py-3 rounded-lg bg-red-50 border-2 border-red-200 text-red-600 font-semibold hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500 transition">
            🚪 Sign Out
          </button>
        </section>
      </main>
    </div>
  );
};

export default ProfilePage;
