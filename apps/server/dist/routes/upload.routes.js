"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middleware/auth.middleware");
const s3_service_1 = require("../services/s3.service");
const router = (0, express_1.Router)();
router.post('/url', auth_middleware_1.authenticateToken, async (req, res) => {
    try {
        // Get both fileName and fileType from the request body
        const { fileName, fileType } = req.body;
        if (!fileName || !fileType) {
            return res.status(400).json({ message: 'fileName and fileType are required' });
        }
        // Pass both to the service function
        const { uploadUrl, key } = await (0, s3_service_1.generateUploadUrl)(fileName, fileType);
        res.status(200).json({ uploadUrl, key });
    }
    catch (error) {
        console.error('Failed to generate upload URL', error);
        res.status(500).json({ message: 'Error generating upload URL' });
    }
});
exports.default = router;
