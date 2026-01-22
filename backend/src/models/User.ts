import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
  uid: string; // Firebase UID
  name: string;
  email: string;
  xp: number;
  badges: string[]; // badge names (e.g., "First Step", "Tree Friend")
  streak: number;
  lastCompletedAt?: Date;
  city?: string;
  createdAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    uid: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    xp: { type: Number, default: 0 },
    badges: { type: [String], default: [] },
    streak: { type: Number, default: 0 },
    lastCompletedAt: { type: Date },
    city: { type: String },
  },
  { timestamps: true }
);

export const User = model<IUser>('User', userSchema);
