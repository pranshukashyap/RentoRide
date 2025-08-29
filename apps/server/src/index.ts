import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Import our new auth router
import authRoutes from './routes/auth.routes';
import carRoutes from './routes/car.routes';
// Load environment variables
dotenv.config();

// Initialize the Express application
const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(express.json());

// --- API Routes ---
// All auth routes will be prefixed with /api/auth
app.use('/api/auth', authRoutes);
app.use('/api/cars', carRoutes); 
//app.use('/api/uploads', uploadRoutes); 

// A simple test route to make sure the server is working
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Hello from the RentoRide server!' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});