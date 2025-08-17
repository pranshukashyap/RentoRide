"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middleware/auth.middleware");
const car_service_1 = require("../services/car.service"); // Import getAllCars
const router = (0, express_1.Router)();
// --- NEW PUBLIC ROUTE ---
// GET /api/cars - Get all car listings
router.get('/', async (req, res) => {
    try {
        const allCars = await (0, car_service_1.getAllCars)();
        res.status(200).json(allCars);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch car listings' });
    }
});
// POST /api/cars - Create a new car listing (Protected)
router.post('/', auth_middleware_1.authenticateToken, async (req, res) => {
    // ... (this function remains the same)
});
exports.default = router;
