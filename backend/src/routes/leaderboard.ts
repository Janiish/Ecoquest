import { Router, Request, Response } from 'express';
import { getTopGlobal, getTopLocal } from '../services/leaderboard';
import { User } from '../models/User';

const router = Router();

// GET /api/leaderboard/global - Top 10 users globally
router.get('/global', async (req: Request, res: Response) => {
  try {
    const topRanked = await getTopGlobal(10);

    // Fetch user metadata for each ranked user
    const leaderboard = await Promise.all(
      topRanked.map(async (item) => {
        const user = await User.findOne({ uid: item.uid });
        return {
          rank: item.rank,
          uid: item.uid,
          name: user?.name || 'Anonymous',
          xp: item.xp,
          city: user?.city,
        };
      })
    );

    res.json(leaderboard);
  } catch (error) {
    console.error('Leaderboard fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
});

// GET /api/leaderboard/local - Top 10 users in a city
router.get('/local', async (req: Request, res: Response) => {
  try {
    const { city } = req.query;

    if (!city) {
      res.status(400).json({ error: 'city query parameter is required' });
      return;
    }

    const topRanked = await getTopLocal(city as string, 10);

    // Fetch user metadata for each ranked user
    const leaderboard = await Promise.all(
      topRanked.map(async (item) => {
        const user = await User.findOne({ uid: item.uid });
        return {
          rank: item.rank,
          uid: item.uid,
          name: user?.name || 'Anonymous',
          xp: item.xp,
          city: user?.city,
        };
      })
    );

    res.json(leaderboard);
  } catch (error) {
    console.error('Leaderboard fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
});

export default router;
