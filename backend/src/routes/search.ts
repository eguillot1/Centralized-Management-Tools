import { Router, Response } from 'express';
import { authenticateToken, AuthRequest, searchLimiter } from '../middleware';
import { searchService } from '../services/searchService';

const router = Router();

router.use(searchLimiter);
router.use(authenticateToken);

router.get('/', async (req: AuthRequest, res: Response) => {
  const query = req.query.q as string;
  const types = req.query.types ? (req.query.types as string).split(',') : undefined;
  
  if (!query || query.trim().length === 0) {
    res.status(400).json({ success: false, error: 'Search query is required' });
    return;
  }
  
  const results = await searchService.search(query, types);
  res.json(results);
});

export default router;
