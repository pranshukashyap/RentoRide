import { Router, Request, Response } from 'express';
import { authenticateToken } from '../middleware/auth.middleware';
import { generateUploadUrl } from '../services/s3.service';

const router = Router();

// POST /api/uploads/url - Generate a presigned URL for file upload
router.post('/url', authenticateToken, async (req: Request, res: Response) => {
    try {
        const { fileName } = req.body;
        if (!fileName) {
            return res.status(400).json({ message: 'fileName is required' });
        }

        const { uploadUrl, key } = await generateUploadUrl(fileName);

        res.status(200).json({ uploadUrl, key });
    } catch (error) {
        console.error('Failed to generate upload URL', error);
        res.status(500).json({ message: 'Error generating upload URL' });
    }
});

export default router;