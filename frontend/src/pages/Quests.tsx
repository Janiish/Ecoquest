/**
 * Quests Page - Display all available quests
 */

import React, { useState } from 'react';
import QuestCard from '../components/QuestCard';
import ProofUploadModal from '../components/ProofUploadModal';
import type { Quest } from '../types';

// Mock data
const MOCK_QUESTS: Quest[] = [
  {
    id: '1',
    title: 'Plant a Tree',
    description: 'Plant a tree in your community and take a photo',
    xp: 50,
    difficulty: 'easy',
    category: 'Nature',
    completed: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    title: 'Zero Waste Day',
    description: 'Go through an entire day without producing any waste',
    xp: 100,
    difficulty: 'medium',
    category: 'Lifestyle',
    completed: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '3',
    title: 'Carbon Neutral Week',
    description: 'Use only renewable energy for a full week',
    xp: 150,
    difficulty: 'hard',
    category: 'Energy',
    completed: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '4',
    title: 'Clean Local Beach',
    description: 'Organize or participate in a beach cleanup',
    xp: 75,
    difficulty: 'medium',
    category: 'Environment',
    completed: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const Quests: React.FC = () => {
  const [quests] = useState<Quest[]>(MOCK_QUESTS);
  const [selectedQuest, setSelectedQuest] = useState<Quest | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenUpload = (questId: string): void => {
    const quest = quests.find((q) => q.id === questId);
    if (quest) {
      setSelectedQuest(quest);
      setIsModalOpen(true);
    }
  };

  const handleSubmitProof = async (data: {
    file: File;
    caption: string;
  }): Promise<void> => {
    console.log('Submitting proof:', data);
    // TODO: Implement API call to submit proof
    await new Promise((resolve) => setTimeout(resolve, 2000));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-eco-50 to-eco-100 px-4 py-12">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-12">
          <h1 className="mb-3 text-4xl font-bold text-eco-900">Available Quests</h1>
          <p className="text-lg text-gray-600">
            Complete quests, earn XP, and make a real difference
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 flex flex-wrap gap-2">
          {['All', 'Easy', 'Medium', 'Hard'].map((filter) => (
            <button
              key={filter}
              className="rounded-full border-2 border-eco-300 px-4 py-2 text-sm font-semibold text-eco-700 transition-colors hover:bg-eco-100"
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Quests Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {quests.map((quest) => (
            <QuestCard
              key={quest.id}
              id={quest.id}
              title={quest.title}
              description={quest.description}
              xp={quest.xp}
              difficulty={quest.difficulty}
              completed={quest.completed}
              onOpenUpload={handleOpenUpload}
            />
          ))}
        </div>

        {/* Empty State */}
        {quests.length === 0 && (
          <div className="rounded-lg bg-white p-12 text-center shadow-sm">
            <p className="text-gray-600">No quests available at the moment</p>
          </div>
        )}
      </div>

      {/* Upload Modal */}
      {selectedQuest && (
        <ProofUploadModal
          questId={selectedQuest.id}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onUploadSuccess={({ caption }) => {
            handleSubmitProof({ file: new File([], 'proof'), caption: caption || '' });
            setIsModalOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default Quests;
