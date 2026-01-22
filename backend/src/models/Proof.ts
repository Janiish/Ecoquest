import { Schema, model, Document, Types } from 'mongoose';

export interface IProof extends Document {
  userUid: string;
  questId: Types.ObjectId;
  mediaUrl: string;
  caption?: string;
  verified: boolean;
  createdAt: Date;
}

const proofSchema = new Schema<IProof>(
  {
    userUid: { type: String, required: true },
    questId: { type: Schema.Types.ObjectId, ref: 'Quest', required: true },
    mediaUrl: { type: String, required: true },
    caption: { type: String },
    verified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Proof = model<IProof>('Proof', proofSchema);
