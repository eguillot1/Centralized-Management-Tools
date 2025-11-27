import { Router, Response } from 'express';
import { authenticateToken, AuthRequest } from '../middleware/auth';
import { quartzyService } from '../services/quartzyService';
import { auditService } from '../services/auditService';

const router = Router();

// Apply authentication to all routes
router.use(authenticateToken);

// Inventory routes
router.get('/inventory', async (req: AuthRequest, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 20;
  const category = req.query.category as string | undefined;
  
  const result = await quartzyService.getInventory(page, limit, category);
  res.json(result);
});

router.get('/inventory/:id', async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const result = await quartzyService.getInventoryItem(id);
  
  if (!result.success) {
    res.status(404).json(result);
    return;
  }
  
  res.json(result);
});

router.post('/inventory', async (req: AuthRequest, res: Response) => {
  const result = await quartzyService.createInventoryItem(req.body);
  
  if (result.success && req.user) {
    await auditService.log({
      action: 'INVENTORY_CREATE',
      entityType: 'inventory',
      entityId: result.data.id,
      userId: req.user.id,
      userName: req.user.name,
      details: { name: result.data.name },
    });
  }
  
  res.status(201).json(result);
});

router.put('/inventory/:id', async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const result = await quartzyService.updateInventoryItem(id, req.body);
  
  if (result.success && req.user) {
    await auditService.log({
      action: 'INVENTORY_UPDATE',
      entityType: 'inventory',
      entityId: id,
      userId: req.user.id,
      userName: req.user.name,
      details: { changes: req.body },
    });
  }
  
  res.json(result);
});

// Orders routes
router.get('/orders', async (req: AuthRequest, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 20;
  const status = req.query.status as string | undefined;
  
  const result = await quartzyService.getOrders(page, limit, status);
  res.json(result);
});

router.get('/orders/:id', async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const result = await quartzyService.getOrder(id);
  
  if (!result.success) {
    res.status(404).json(result);
    return;
  }
  
  res.json(result);
});

router.post('/orders', async (req: AuthRequest, res: Response) => {
  const result = await quartzyService.createOrder(req.body);
  
  if (result.success && req.user) {
    await auditService.log({
      action: 'ORDER_CREATE',
      entityType: 'order',
      entityId: result.data.id,
      userId: req.user.id,
      userName: req.user.name,
      details: { orderNumber: result.data.orderNumber },
    });
  }
  
  res.status(201).json(result);
});

router.patch('/orders/:id/status', async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const { status, notes } = req.body;
  
  const result = await quartzyService.updateOrderStatus(id, status, notes);
  
  if (result.success && req.user) {
    await auditService.log({
      action: 'ORDER_STATUS_UPDATE',
      entityType: 'order',
      entityId: id,
      userId: req.user.id,
      userName: req.user.name,
      details: { status, notes },
    });
  }
  
  res.json(result);
});

export default router;
