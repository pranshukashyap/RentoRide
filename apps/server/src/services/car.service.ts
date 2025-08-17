import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// ... (interface CarData remains the same)
interface CarData {
  make: string;
  model: string;
  year: number;
  location: string;
  pricePerDay: number;
  imageUrl: string;
}

// ... (createCar function remains the same)
export const createCar = async (carData: CarData, ownerId: string) => {
  // ...
};

// --- NEW FUNCTION ---
// Function to retrieve all cars from the database
export const getAllCars = async () => {
  try {
    const cars = await prisma.car.findMany({
      // We can add ordering or filtering here later
      orderBy: {
        createdAt: 'desc', // Show newest cars first
      },
    });
    return cars;
  } catch (error) {
    console.error("Error fetching cars:", error);
    throw error;
  }
};