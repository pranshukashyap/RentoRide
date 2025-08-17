import { Router, Request, Response } from 'express';
import { authenticateToken } from '../middleware/auth.middleware';
import { createCar, getAllCars } from '../services/car.service'; // Import getAllCars

const router = Router();

// --- NEW PUBLIC ROUTE ---
// GET /api/cars - Get all car listings
router.get('/', async (req: Request, res: Response) => {
  try {
    const allCars = await getAllCars();
    res.status(200).json(allCars);
  } catch (error: any) {
    res.status(500).json({ message: 'Failed to fetch car listings' });
  }
});

// POST /api/cars - Create a new car listing (Protected)
router.post('/', authenticateToken, async (req: Request, res: Response) => {
  // ... (this function remains the same)
});

export default router;