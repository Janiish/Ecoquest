import { Schema, model, Document } from 'mongoose';

export interface IQuest extends Document {
  title: string;
  description: string;
  xp: number;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  active: boolean;
  createdAt: Date;
}

const questSchema = new Schema<IQuest>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    xp: { type: Number, required: true },
    category: { type: String, required: true },
    difficulty: { type: String, enum: ['easy', 'medium', 'hard'], required: true },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Quest = model<IQuest>('Quest', questSchema);
