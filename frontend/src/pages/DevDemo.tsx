/**
 * DevDemo Page - Full flow demonstration for development
 * Features: Open quest, upload proof, badge unlock, leaderboard update
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import QuestCard from '../components/QuestCard';
import ProofUploadModal from '../components/ProofUploadModal';
import BadgeUnlockModal from '../components/BadgeUnlockModal';
import Leaderboard from '../components/Leaderboard';
import { mockQuests, mockBadges, mockUsers } from '../mocks/quests';
import '../styles/animations.css';

const DevDemo: React.FC = () => {
  const navigate = useNavigate();
  const [selectedQuestId, setSelectedQuestId] = useState<string | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showBadgeModal, setShowBadgeModal] = useState(false);
  const [unlockedBadge, setUnlockedBadge] = useState(mockBadges[0]);
  const [uploadedProofs, setUploadedProofs] = useState<
    Array<{ mediaUrl: string; caption?: string }>
  >([]);

  const handleUploadSuccess = (proof: { mediaUrl: string; caption?: string }) => {
    console.log('✅ Proof uploaded:', proof);
    setUploadedProofs([...uploadedProofs, proof]);
    setShowUploadModal(false);

    // Simulate badge unlock
    setTimeout(() => {
      setUnlockedBadge(
        mockBadges[Math.floor(Math.random() * mockBadges.length)]
      );
      setShowBadgeModal(true);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-cyan-50">
      <Header
        title="🎬 Dev Demo"
        showBack={true}
        onBack={() => navigate('/')}
      />

      <main className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Instructions */}
        <section className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
          <p className="text-sm font-semibold text-blue-900 mb-2">
            📌 Demo Instructions
          </p>
          <p className="text-xs text-blue-700">
            1. Click on a quest to expand it
            <br />
            2. Click "Submit Proof" to open upload modal
            <br />
            3. Simulate upload to trigger badge unlock
            <br />
            4. See leaderboard update below
          </p>
        </section>

        {/* Featured Quests */}
        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">
            📋 Demo Quests
          </h2>
          <div className="space-y-3">
            {mockQuests.slice(0, 3).map((quest) => (
              <QuestCard
                key={quest.id}
                id={quest.id}
                title={quest.title}
                description={quest.description}
                xp={quest.xp}
                difficulty={quest.difficulty}
                completed={quest.completed}
                onOpenUpload={(id) => {
                  setSelectedQuestId(id);
                  setShowUploadModal(true);
                }}
              />
            ))}
          </div>
        </section>

        {/* Uploaded Proofs */}
        {uploadedProofs.length > 0 && (
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              ✅ Uploaded Proofs ({uploadedProofs.length})
            </h2>
            <div className="space-y-2">
              {uploadedProofs.map((proof, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg p-3 border border-green-200 flex items-center gap-3"
                >
                  <div className="text-2xl">📸</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">
                      {proof.caption || 'Proof uploaded'}
                    </p>
                    <p className="text-xs text-gray-500">
                      {proof.mediaUrl.substring(0, 30)}...
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Leaderboard */}
        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">
            🏆 Live Leaderboard
          </h2>
          <Leaderboard users={mockUsers.map(u => ({ id: u.id, name: u.username, xp: u.totalXp, city: u.city }))} />
        </section>

        {/* Badges Earned */}
        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">
            ⭐ Available Badges
          </h2>
          <div className="grid grid-cols-3 gap-3">
            {mockBadges.map((badge) => (
              <button
                key={badge.id}
                onClick={() => {
                  setUnlockedBadge(badge);
                  setShowBadgeModal(true);
                }}
                className="bg-white rounded-lg p-4 border border-gray-200 text-center hover:shadow-lg transition"
                aria-label={`View ${badge.name} badge`}
              >
                <div className="text-3xl mb-2">{badge.iconUrl}</div>
                <p className="text-xs font-semibold text-gray-900">
                  {badge.name}
                </p>
              </button>
            ))}
          </div>
        </section>

        {/* Navigation */}
        <section className="flex gap-3 pb-8">
          <button
            onClick={() => navigate('/')}
            className="flex-1 px-4 py-3 rounded-lg bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
          >
            Home
          </button>
          <button
            onClick={() => navigate('/quests')}
            className="flex-1 px-4 py-3 rounded-lg bg-green-500 text-white font-semibold hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-700 transition"
          >
            All Quests
          </button>
        </section>
      </main>

      {/* Modals */}
      <ProofUploadModal
        questId={selectedQuestId || ''}
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        onUploadSuccess={handleUploadSuccess}
      />

      <BadgeUnlockModal
        badge={unlockedBadge}
        isOpen={showBadgeModal}
        onClose={() => setShowBadgeModal(false)}
      />
    </div>
  );
};

export default DevDemo;
