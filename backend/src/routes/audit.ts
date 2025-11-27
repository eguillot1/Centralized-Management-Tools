import { Router, Response } from 'express';
import { authenticateToken, requireRole, AuthRequest } from '../middleware/auth';
import { auditService } from '../services/auditService';

const router = Router();

router.use(authenticateToken);

router.get('/', requireRole('admin', 'manager'), async (req: AuthRequest, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 50;
  const entityType = req.query.entityType as string | undefined;
  const userId = req.query.userId as string | undefined;
  
  const logs = await auditService.getLogs({ page, limit, entityType, userId });
  res.json(logs);
});

export default router;
