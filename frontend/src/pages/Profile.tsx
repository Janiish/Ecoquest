/**
 * Profile Page - User profile and statistics
 */

import React, { useState } from 'react';
import type { User } from '../types';

const MOCK_USER: User = {
  id: '1',
  username: 'ecowarrior',
  email: 'user@example.com',
  totalXp: 325,
  level: 3,
  streak: 2,
  avatar: '🌿',
  badges: [],
};

const Profile: React.FC = () => {
  const [user] = useState<User>(MOCK_USER);

  const stats = [
    { label: 'Total XP', value: user.totalXp, icon: '⭐' },
    { label: 'Level', value: user.level, icon: '🏆' },
    { label: 'Quests Done', value: 4, icon: '✓' },
    { label: 'Impact Score', value: 87, icon: '🌍' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-eco-50 to-eco-100 px-4 py-12">
      <div className="mx-auto max-w-2xl">
        {/* Profile Card */}
        <div className="rounded-lg bg-white p-8 shadow-lg">
          {/* Header */}
          <div className="mb-8 flex items-center gap-6">
            <div className="text-6xl">{user.avatar || '👤'}</div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900">@{user.username}</h1>
              <p className="text-gray-600">{user.email}</p>
            </div>
            <button className="rounded-md border-2 border-eco-500 px-4 py-2 font-semibold text-eco-500 transition-colors hover:bg-eco-50">
              Edit Profile
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid gap-4 md:grid-cols-4">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="rounded-lg border-2 border-eco-200 bg-eco-50 p-4 text-center"
              >
                <div className="mb-2 text-4xl">{stat.icon}</div>
                <p className="text-xs font-semibold text-gray-600">{stat.label}</p>
                <p className="mt-2 text-2xl font-bold text-eco-900">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Divider */}
          <hr className="my-8 border-gray-300" />

          {/* Recent Activity */}
          <div>
            <h2 className="mb-4 text-xl font-bold text-gray-900">Recent Activity</h2>
            <div className="space-y-3">
              {[
                { action: 'Completed Plant a Tree quest', date: '2 days ago', xp: '+50' },
                { action: 'Completed Zero Waste Day quest', date: '5 days ago', xp: '+100' },
                { action: 'Completed Clean Local Beach quest', date: '1 week ago', xp: '+75' },
                { action: 'Reached Level 3', date: '2 weeks ago', xp: '+100' },
              ].map((activity, idx) => (
                <div key={idx} className="flex items-center justify-between border-l-4 border-eco-500 pl-4 py-2">
                  <div>
                    <p className="font-semibold text-gray-900">{activity.action}</p>
                    <p className="text-xs text-gray-500">{activity.date}</p>
                  </div>
                  <span className="font-bold text-eco-500">{activity.xp}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Settings */}
          <div className="mt-8 flex gap-2">
            <button className="flex-1 rounded-md border-2 border-gray-300 px-4 py-2 font-semibold text-gray-700 transition-colors hover:bg-gray-50">
              Settings
            </button>
            <button className="flex-1 rounded-md border-2 border-red-300 px-4 py-2 font-semibold text-red-600 transition-colors hover:bg-red-50">
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
