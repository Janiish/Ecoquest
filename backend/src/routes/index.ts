import { Router } from 'express';
import authRoutes from './auth';
import questRoutes from './quests';
import proofRoutes from './proofs';
import leaderboardRoutes from './leaderboard';

const router = Router();

router.use('/auth', authRoutes);
router.use('/quests', questRoutes);
router.use('/proofs', proofRoutes);
router.use('/leaderboard', leaderboardRoutes);

export default router;
