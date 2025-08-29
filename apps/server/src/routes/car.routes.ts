import { Router, Request, Response } from 'express';
import { authenticateToken } from '../middleware/auth.middleware';
// The fix is to add getCarById to this import list
import { createCar, getAllCars, getCarById, getCarsByOwnerId, updateCar } from '../services/car.service'; 

const router = Router();

// GET /api/cars - Get all car listings
router.get('/', async (req: Request, res: Response) => {
  try {
    const location = req.query.location as string | undefined;
    const allCars = await getAllCars(location);

    // --- ADD THIS LOG ---
    console.log('--- PUBLIC /api/cars ---');
    allCars.forEach(car => {
      console.log(`Car Make: ${car.make}, Owner ID in DB: ${car.ownerId}`);
    });

    res.status(200).json(allCars);
  } catch (error: any) {
    res.status(500).json({ message: 'Failed to fetch car listings' });
  }
});

// GET /api/cars/my-listings - Get cars for the logged-in owner
router.get('/my-listings', authenticateToken, async (req: Request, res: Response) => {
  try {
    const ownerId = req.user.sub;

    // --- ADD THIS LOG ---
    console.log('--- PROTECTED /api/cars/my-listings ---');
    console.log('Searching for cars owned by User ID:', ownerId);

    const cars = await getCarsByOwnerId(ownerId);
    console.log(`Found ${cars.length} cars for this user.`);

    res.status(200).json(cars);
  } catch (error: any) {
    res.status(500).json({ message: 'Failed to fetch your listings' });
  }
});

// GET /api/cars/:id - Get a single car by its ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const car = await getCarById(id);
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }
    res.status(200).json(car);
  } catch (error: any) {
    res.status(500).json({ message: 'Failed to fetch car details' });
  }
});

// POST /api/cars - Create a new car listing (Protected)
router.post('/', authenticateToken, async (req: Request, res: Response) => {
  try {
    const ownerId = req.user.sub;
    const carData = req.body;
    const newCar = await createCar(carData, ownerId);
    res.status(201).json(newCar);
  } catch (error: any) {
    res.status(400).json({ message: 'Failed to create car listing', error: error.message });
  }
});


// PUT /api/cars/:id - Update a car listing
router.put('/:id', authenticateToken, async (req: Request, res: Response) => {
  try {
    const { id: carId } = req.params; // Get the car's ID from the URL
    const ownerId = req.user.sub;     // Get the owner's ID from their login token
    const carData = req.body;         // Get the updated car data from the request

    await updateCar(carId, ownerId, carData);

    res.status(200).json({ message: 'Car updated successfully' });
  } catch (error: any) {
    // If the error message is our custom one, it means not found or not authorized
    if (error.message.includes("not found or user not authorized")) {
        return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: 'Failed to update car listing' });
  }
});

export default router;