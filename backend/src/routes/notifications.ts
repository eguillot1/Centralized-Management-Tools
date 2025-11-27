import { Router, Response } from 'express';
import { authenticateToken, AuthRequest } from '../middleware/auth';
import { notificationService } from '../services/notificationService';

const router = Router();

router.use(authenticateToken);

router.get('/', async (req: AuthRequest, res: Response) => {
  const unreadOnly = req.query.unreadOnly === 'true';
  const userId = req.user?.id;
  
  if (!userId) {
    res.status(401).json({ success: false, error: 'User not authenticated' });
    return;
  }
  
  const notifications = await notificationService.getNotifications(userId, unreadOnly);
  res.json(notifications);
});

router.patch('/:id/read', async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const userId = req.user?.id;
  
  if (!userId) {
    res.status(401).json({ success: false, error: 'User not authenticated' });
    return;
  }
  
  await notificationService.markAsRead(id, userId);
  res.json({ success: true });
});

router.patch('/read-all', async (req: AuthRequest, res: Response) => {
  const userId = req.user?.id;
  
  if (!userId) {
    res.status(401).json({ success: false, error: 'User not authenticated' });
    return;
  }
  
  await notificationService.markAllAsRead(userId);
  res.json({ success: true });
});

router.delete('/:id', async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const userId = req.user?.id;
  
  if (!userId) {
    res.status(401).json({ success: false, error: 'User not authenticated' });
    return;
  }
  
  await notificationService.deleteNotification(id, userId);
  res.json({ success: true });
});

export default router;
