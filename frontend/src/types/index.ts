/**
 * Shared TypeScript types for EcoQuest frontend
 */

export interface Quest {
  id: string;
  title: string;
  description: string;
  xp: number;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Proof {
  id: string;
  questId: string;
  mediaUrl: string;
  caption?: string;
  uploadedAt: Date;
  verified: boolean;
}

export interface Badge {
  id: string;
  name: string;
  tier: 'bronze' | 'silver' | 'gold';
  iconUrl?: string;
  unlockedAt?: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  totalXp: number;
  level: number;
  streak: number;
  avatar?: string;
  city?: string;
  badges: Badge[];
}

export interface ApiResponse<T> {
  status: 'ok' | 'error';
  data?: T;
  message?: string;
}

export interface UploadProgress {
  loaded: number;
  total: number;
  percentage: number;
}
