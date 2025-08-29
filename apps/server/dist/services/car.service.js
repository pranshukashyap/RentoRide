"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCarsByOwnerId = exports.updateCar = exports.getCarById = exports.getAllCars = exports.createCar = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createCar = async (carData, ownerId) => {
    try {
        const newCar = await prisma.car.create({
            data: {
                ...carData,
                owner: {
                    connect: {
                        id: ownerId,
                    },
                },
            },
        });
        return newCar;
    }
    catch (error) {
        console.error("Error creating car:", error);
        throw error;
    }
};
exports.createCar = createCar;
const getAllCars = async (location) => {
    try {
        const whereClause = location
            ? {
                location: {
                    contains: location,
                    mode: 'insensitive',
                },
            }
            : {};
        const cars = await prisma.car.findMany({
            where: whereClause,
            orderBy: {
                createdAt: 'desc',
            },
        });
        return cars;
    }
    catch (error) {
        console.error("Error fetching cars:", error);
        throw error;
    }
};
exports.getAllCars = getAllCars;
const getCarById = async (id) => {
    try {
        const car = await prisma.car.findUnique({
            where: { id },
            include: {
                owner: {
                    select: {
                        firstName: true,
                        lastName: true,
                    },
                },
            },
        });
        return car;
    }
    catch (error) {
        console.error(`Error fetching car with id ${id}:`, error);
        throw error;
    }
};
exports.getCarById = getCarById;
// Add this new function to the file
const updateCar = async (carId, ownerId, carData) => {
    try {
        // Here, we use a compound `where` clause. The update will only succeed
        // if the carId matches AND the ownerId matches the ID of the logged-in user.
        // This prevents one user from editing another user's car.
        const updatedCar = await prisma.car.updateMany({
            where: {
                id: carId,
                ownerId: ownerId,
            },
            data: carData,
        });
        if (updatedCar.count === 0) {
            throw new Error("Car not found or user not authorized to edit.");
        }
        return { success: true };
    }
    catch (error) {
        console.error("Error updating car:", error);
        throw error;
    }
};
exports.updateCar = updateCar;
// Add this new function to the file
const getCarsByOwnerId = async (ownerId) => {
    try {
        const cars = await prisma.car.findMany({
            where: { ownerId },
            orderBy: { createdAt: 'desc' },
        });
        return cars;
    }
    catch (error) {
        console.error("Error fetching cars by owner:", error);
        throw error;
    }
};
exports.getCarsByOwnerId = getCarsByOwnerId;
