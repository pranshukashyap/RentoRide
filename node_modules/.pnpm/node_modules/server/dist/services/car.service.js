"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllCars = exports.createCar = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// ... (createCar function remains the same)
const createCar = async (carData, ownerId) => {
    // ...
};
exports.createCar = createCar;
// --- NEW FUNCTION ---
// Function to retrieve all cars from the database
const getAllCars = async () => {
    try {
        const cars = await prisma.car.findMany({
            // We can add ordering or filtering here later
            orderBy: {
                createdAt: 'desc', // Show newest cars first
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
