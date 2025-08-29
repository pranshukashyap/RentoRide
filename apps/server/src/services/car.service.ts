import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

interface CarData {
  make: string;
  model: string;
  year: number;
  location: string;
  pricePerDay: number;
  type: 'SEDAN' | 'SUV' | 'HATCHBACK' | 'LUXURY';
  transmission: 'MANUAL' | 'AUTOMATIC';
  fuelType: 'PETROL' | 'DIESEL' | 'ELECTRIC';
  seatingCapacity: number;
  description?: string | null;
}

export const createCar = async (carData: CarData, ownerId: string) => {
  try {
    const newCar = await prisma.car.create({
      data: {
        ...carData,
        description: carData.description || null,
        owner: {
          connect: {
            id: ownerId,
          },
        },
      },
    });
    return newCar;
  } catch (error) {
    console.error("Error creating car:", error);
    throw error;
  }
};

export const getAllCars = async (location?: string) => {
  try {
    const whereClause: Prisma.CarWhereInput = location
      ? { location: { contains: location, mode: 'insensitive' } }
      : {};
    const cars = await prisma.car.findMany({
      where: whereClause,
      orderBy: { createdAt: 'desc' },
    });
    return cars;
  } catch (error) {
    console.error("Error fetching cars:", error);
    throw error;
  }
};

export const getCarById = async (id: string) => {
  try {
    const car = await prisma.car.findUnique({
      where: { id },
      include: {
        owner: {
          select: { firstName: true, lastName: true },
        },
      },
    });
    return car;
  } catch (error) {
    console.error(`Error fetching car with id ${id}:`, error);
    throw error;
  }
};

// This function was missing or not exported
export const getCarsByOwnerId = async (ownerId: string) => {
  try {
    const cars = await prisma.car.findMany({
      where: { ownerId },
      orderBy: { createdAt: 'desc' },
    });
    return cars;
  } catch (error) {
    console.error("Error fetching cars by owner:", error);
    throw error;
  }
};

export const updateCar = async (carId: string, ownerId: string, carData: CarData) => {
    try {
      const carToUpdate = await prisma.car.findUnique({
        where: { id: carId },
      });
  
      if (!carToUpdate || carToUpdate.ownerId !== ownerId) {
        throw new Error("Car not found or user not authorized to edit.");
      }
      
      const {
          make, model, year, location, pricePerDay,
          type, transmission, fuelType, seatingCapacity, description
      } = carData;
  
      const updatedCar = await prisma.car.update({
        where: { id: carId },
        data: {
          make, model, year, location, pricePerDay,
          type, transmission, fuelType, seatingCapacity,
          description: description || null,
        },
      });
  
      return updatedCar;
    } catch (error) {
      console.error("Error updating car:", error);
      throw error;
    }
  };