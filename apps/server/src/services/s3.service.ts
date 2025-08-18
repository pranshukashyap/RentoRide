import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import crypto from 'crypto';

// Initialize the S3 client with credentials from .env
const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
});

const BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME!;

// This function generates a secure, one-time URL for uploading a file
export const generateUploadUrl = async (fileName: string) => {
    // Generate a unique name for the file to prevent overwrites
    const randomBytes = crypto.randomBytes(16).toString('hex');
    const uniqueFileName = `${randomBytes}-${fileName}`;

    const command = new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key: uniqueFileName,
    });

    // The URL is valid for 10 minutes
    const uploadUrl = await getSignedUrl(s3Client, command, { expiresIn: 600 });

    // Return the upload URL and the final key to save in the database
    return {
        uploadUrl,
        key: uniqueFileName
    };
};