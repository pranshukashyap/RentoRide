"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateUploadUrl = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
const crypto_1 = __importDefault(require("crypto"));
// Initialize the S3 client with credentials from .env
const s3Client = new client_s3_1.S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});
const BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME;
// This function generates a secure, one-time URL for uploading a file
const generateUploadUrl = async (fileName) => {
    // Generate a unique name for the file to prevent overwrites
    const randomBytes = crypto_1.default.randomBytes(16).toString('hex');
    const uniqueFileName = `${randomBytes}-${fileName}`;
    const command = new client_s3_1.PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key: uniqueFileName,
    });
    // The URL is valid for 10 minutes
    const uploadUrl = await (0, s3_request_presigner_1.getSignedUrl)(s3Client, command, { expiresIn: 600 });
    // Return the upload URL and the final key to save in the database
    return {
        uploadUrl,
        key: uniqueFileName
    };
};
exports.generateUploadUrl = generateUploadUrl;
