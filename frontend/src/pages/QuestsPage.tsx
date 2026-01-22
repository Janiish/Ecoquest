/**
 * Quests Page - List of all quests with filtering
 * Features: fetch from /api/quests, filter by category and difficulty
 */

import React, { useState } from 'react';
import Header from '../components/Header';
import QuestCard from '../components/QuestCard';
import ProofUploadModal from '../components/ProofUploadModal';
import { mockQuests } from '../mocks/quests';
import type { Quest } from '../types';

const QuestsPage: React.FC = () => {
  const [quests] = useState<Quest[]>(mockQuests);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [selectedQuestId, setSelectedQuestId] = useState<string | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);

  // TODO: Replace with actual API call: const { data: quests } = await useApi<Quest[]>(); get('/api/quests');

  const categories = ['all', ...new Set(quests.map((q) => q.category))];
  const difficulties = ['all', 'easy', 'medium', 'hard'];

  const filteredQuests = quests.filter((q) => {
    const categoryMatch =
      selectedCategory === 'all' || q.category === selectedCategory;
    const difficultyMatch =
      selectedDifficulty === 'all' || q.difficulty === selectedDifficulty;
    return categoryMatch && difficultyMatch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-cyan-50">
      <Header title="All Quests" />

      <main className="max-w-md mx-auto px-4 py-6">
        {/* Filters */}
        <section className="mb-6 space-y-3">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Category
            </label>
            <div className="flex gap-2 flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition ${
                    selectedCategory === cat
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  aria-pressed={selectedCategory === cat}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Difficulty
            </label>
            <div className="flex gap-2 flex-wrap">
              {difficulties.map((diff) => (
                <button
                  key={diff}
                  onClick={() => setSelectedDifficulty(diff)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition ${
                    selectedDifficulty === diff
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  aria-pressed={selectedDifficulty === diff}
                >
                  {diff.charAt(0).toUpperCase() + diff.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Quest List */}
        <section className="space-y-3 pb-8">
          {filteredQuests.length > 0 ? (
            filteredQuests.map((quest) => (
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
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">No quests found.</p>
            </div>
          )}
        </section>
      </main>

      <ProofUploadModal
        questId={selectedQuestId || ''}
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        onUploadSuccess={(proof) => {
          console.log('Proof uploaded:', proof);
          setShowUploadModal(false);
        }}
      />
    </div>
  );
};

export default QuestsPage;
