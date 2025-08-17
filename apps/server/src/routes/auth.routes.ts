import { Router, Request, Response } from 'express';
import { registerUser, loginUser } from '../services/auth.service';
import { authenticateToken } from '../middleware/auth.middleware';

const router = Router();

// POST /api/auth/register
router.post('/register', async (req: Request, res: Response) => {
  try {
    const result = await registerUser(req.body);
    res.status(201).json({ 
      message: 'User registered successfully! Please check your email to verify your account.',
      userSub: result.UserSub, 
    });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

// POST /api/auth/login
router.post('/login', async (req: Request, res: Response) => {
  try {
    const tokens = await loginUser(req.body);
    res.status(200).json({
      message: 'Login successful!',
      tokens: tokens,
    });
  } catch (error: any) {
    res.status(401).json({ message: 'Invalid email or password' });
  }
});

// GET /api/auth/profile (This is our new protected route)
router.get('/profile', authenticateToken, (req: Request, res: Response) => {
  res.status(200).json({
    message: 'This is a protected route!',
    userProfile: req.user,
  });
});

export default router;