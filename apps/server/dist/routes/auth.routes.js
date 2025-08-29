"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_service_1 = require("../services/auth.service");
const router = (0, express_1.Router)();
router.post('/register', async (req, res) => {
    try {
        const result = await (0, auth_service_1.registerUser)(req.body);
        res.status(201).json({
            message: 'User registered successfully! Please check your email to verify your account.',
            userSub: result.UserSub,
        });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
router.post('/login', async (req, res) => {
    try {
        const tokens = await (0, auth_service_1.loginUser)(req.body);
        res.status(200).json({
            message: 'Login successful!',
            tokens: tokens,
        });
    }
    catch (error) {
        res.status(401).json({ message: 'Invalid email or password' });
    }
});
exports.default = router;
