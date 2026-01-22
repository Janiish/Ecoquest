import { Router, Request, Response } from 'express';
import { verifyFirebaseToken } from '../middleware/auth';
import { User } from '../models/User';

const router = Router();

// POST /api/auth/session - Exchange Firebase token for session info
router.post('/session', verifyFirebaseToken, async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ uid: req.user!.uid });

    res.json({
      uid: req.user!.uid,
      email: req.user!.email,
      name: req.user!.name,
      user: user || null,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get session' });
  }
});

export default router;
