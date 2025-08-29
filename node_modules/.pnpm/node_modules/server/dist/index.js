"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
// Import our new auth router
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const car_routes_1 = __importDefault(require("./routes/car.routes"));
// Load environment variables
dotenv_1.default.config();
// Initialize the Express application
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
// Middlewares
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// --- API Routes ---
// All auth routes will be prefixed with /api/auth
app.use('/api/auth', auth_routes_1.default);
app.use('/api/cars', car_routes_1.default);
//app.use('/api/uploads', uploadRoutes); 
// A simple test route to make sure the server is working
app.get('/', (req, res) => {
    res.json({ message: 'Hello from the RentoRide server!' });
});
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
