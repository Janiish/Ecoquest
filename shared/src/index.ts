/**
 * Shared types and utilities for EcoQuest
 */

export interface ApiResponse<T> {
  status: 'ok' | 'error';
  data?: T;
  message?: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  createdAt: Date;
}

export interface GameSession {
  id: string;
  userId: string;
  score: number;
  startedAt: Date;
  endedAt?: Date;
}

export const API_BASE_URL = process.env.VITE_API_URL || 'http://localhost:3000/api';
