import { Router, Request, Response } from 'express';
import multer from 'multer';
import cloudinary from '../config/cloudinary';
import { Proof } from '../models/Proof';
import { verifyFirebaseToken } from '../middleware/auth';
import { awardPointsForProof } from '../services/points';
import { io } from '../server';

const router = Router();

// Memory storage for file uploads (process in-memory before uploading to Cloudinary)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 15 * 1024 * 1024, // 15MB for videos
  },
});

// POST /api/proofs - Submit proof for a quest (protected)
router.post('/', verifyFirebaseToken, upload.single('file'), async (req: Request, res: Response) => {
  try {
    const { questId, caption } = req.body;
    const userUid = req.user!.uid;

    if (!questId || !req.file) {
      res.status(400).json({ error: 'questId and file are required' });
      return;
    }

    // Validate file type
    const mimeType = req.file.mimetype;
    const isImage = mimeType.startsWith('image/');
    const isVideo = mimeType.startsWith('video/');

    if (!isImage && !isVideo) {
      res.status(400).json({ error: 'Only images and videos are allowed' });
      return;
    }

    // Validate video duration (15s max) - simplified check via file size heuristic
    if (isVideo && req.file.size > 15 * 1024 * 1024) {
      res.status(400).json({ error: 'Video too large (max 15MB)' });
      return;
    }

    // Upload to Cloudinary
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: 'auto', // Auto-detect image or video
        folder: 'ecoquest/proofs',
        public_id: `${userUid}-${Date.now()}`,
      },
      async (error, result) => {
        if (error) {
          console.error('Cloudinary upload error:', error);
          res.status(500).json({ error: 'Failed to upload to Cloudinary' });
          return;
        }

        // Create Proof document
        const proof = new Proof({
          userUid,
          questId,
          mediaUrl: result!.secure_url,
          caption: caption || '',
          verified: false,
        });

        await proof.save();

        // Award points and update leaderboard
        try {
          await awardPointsForProof(userUid, questId);
        } catch (err) {
          console.error('Error awarding points:', err);
        }

        // Emit socket event
        io.emit('proof:submitted', {
          userUid,
          questId,
          mediaUrl: result!.secure_url,
          caption: caption || '',
        });

        res.status(201).json(proof);
      }
    );

    // Write file buffer to stream
    uploadStream.end(req.file.buffer);
  } catch (error) {
    console.error('Proof submission error:', error);
    res.status(500).json({ error: 'Failed to submit proof' });
  }
});

// GET /api/proofs - List proofs for a user (protected)
router.get('/', verifyFirebaseToken, async (req: Request, res: Response) => {
  try {
    const { userUid } = req.query;

    if (!userUid) {
      res.status(400).json({ error: 'userUid query parameter is required' });
      return;
    }

    const proofs = await Proof.find({ userUid }).populate('questId');
    res.json(proofs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch proofs' });
  }
});

export default router;
