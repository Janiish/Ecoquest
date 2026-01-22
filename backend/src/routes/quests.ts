import { Router, Request, Response } from 'express';
import { Quest, IQuest } from '../models/Quest';
import { verifyFirebaseToken } from '../middleware/auth';

const router = Router();

// GET /api/quests - List active quests (with optional filters)
router.get('/', async (req: Request, res: Response) => {
  try {
    const { category, difficulty } = req.query;

    let filter: Record<string, unknown> = { active: true };

    if (category && category !== 'all') {
      filter.category = category;
    }

    if (difficulty && difficulty !== 'all') {
      filter.difficulty = difficulty;
    }

    const quests = await Quest.find(filter);
    res.json(quests);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch quests' });
  }
});

// GET /api/quests/:id - Quest detail
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const quest = await Quest.findById(req.params.id);
    if (!quest) {
      res.status(404).json({ error: 'Quest not found' });
      return;
    }
    res.json(quest);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch quest' });
  }
});

// POST /api/quests - Create quest (protected)
router.post('/', verifyFirebaseToken, async (req: Request, res: Response) => {
  try {
    // TODO: Check admin role for authorization
    const { title, description, xp, category, difficulty } = req.body;

    if (!title || !description || !xp || !category || !difficulty) {
      res.status(400).json({ error: 'Missing required fields' });
      return;
    }

    const quest = new Quest({
      title,
      description,
      xp,
      category,
      difficulty,
      active: true,
    });

    await quest.save();
    res.status(201).json(quest);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create quest' });
  }
});

// PUT /api/quests/:id - Update quest
router.put('/:id', verifyFirebaseToken, async (req: Request, res: Response) => {
  try {
    // TODO: Check admin role for authorization
    const quest = await Quest.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!quest) {
      res.status(404).json({ error: 'Quest not found' });
      return;
    }
    res.json(quest);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update quest' });
  }
});

// DELETE /api/quests/:id - Soft delete (set active=false)
router.delete('/:id', verifyFirebaseToken, async (req: Request, res: Response) => {
  try {
    // TODO: Check admin role for authorization
    const quest = await Quest.findByIdAndUpdate(
      req.params.id,
      { active: false },
      { new: true }
    );
    if (!quest) {
      res.status(404).json({ error: 'Quest not found' });
      return;
    }
    res.json({ message: 'Quest deleted', quest });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete quest' });
  }
});

export default router;
