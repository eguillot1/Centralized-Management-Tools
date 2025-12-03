import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { authenticateToken, AuthRequest, authLimiter, apiLimiter } from '../middleware';
import { auditService } from '../services/auditService';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const JWT_EXPIRY = '24h';

// Demo users (in production, use a real database)
const users = [
  {
    id: uuidv4(),
    email: 'admin@example.com',
    password: bcrypt.hashSync('password', 10),
    name: 'Admin User',
    role: 'admin',
  },
  {
    id: uuidv4(),
    email: 'user@example.com',
    password: bcrypt.hashSync('password', 10),
    name: 'Regular User',
    role: 'user',
  },
];

router.post('/login', authLimiter, async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ success: false, error: 'Email and password are required' });
    return;
  }

  const user = users.find((u) => u.email === email);
  if (!user) {
    res.status(401).json({ success: false, error: 'Invalid credentials' });
    return;
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    res.status(401).json({ success: false, error: 'Invalid credentials' });
    return;
  }

  const token = jwt.sign(
    { id: user.id, email: user.email, name: user.name, role: user.role },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRY }
  );

  await auditService.log({
    action: 'USER_LOGIN',
    entityType: 'user',
    entityId: user.id,
    userId: user.id,
    userName: user.name,
    details: { email: user.email },
  });

  res.json({
    user: { id: user.id, email: user.email, name: user.name, role: user.role },
    token,
  });
});

router.post('/logout', apiLimiter, authenticateToken, async (req: AuthRequest, res: Response) => {
  if (req.user) {
    await auditService.log({
      action: 'USER_LOGOUT',
      entityType: 'user',
      entityId: req.user.id,
      userId: req.user.id,
      userName: req.user.name,
      details: {},
    });
  }
  res.json({ success: true });
});

router.get('/me', apiLimiter, authenticateToken, (req: AuthRequest, res: Response) => {
  res.json(req.user);
});

router.post('/refresh', apiLimiter, authenticateToken, (req: AuthRequest, res: Response) => {
  const user = req.user;
  if (!user) {
    res.status(401).json({ success: false, error: 'Invalid token' });
    return;
  }

  const token = jwt.sign(
    { id: user.id, email: user.email, name: user.name, role: user.role },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRY }
  );

  res.json({ token });
});

export default router;
