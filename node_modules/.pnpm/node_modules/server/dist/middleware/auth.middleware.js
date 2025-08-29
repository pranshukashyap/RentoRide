"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwks_rsa_1 = __importDefault(require("jwks-rsa"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const client = (0, jwks_rsa_1.default)({
    jwksUri: `https://cognito-idp.${process.env.AWS_REGION}.amazonaws.com/${process.env.AWS_COGNITO_USER_POOL_ID}/.well-known/jwks.json`,
});
// Complete getKey function with error handling
const getKey = (header, callback) => {
    client.getSigningKey(header.kid, (err, key) => {
        if (err || !key) {
            return callback(err || new Error('Signing key not found'));
        }
        const signingKey = key.getPublicKey();
        callback(null, signingKey);
    });
};
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Expects "Bearer TOKEN"
    if (token == null) {
        return res.status(401).json({ message: 'No token provided' });
    }
    jsonwebtoken_1.default.verify(token, getKey, { algorithms: ['RS256'] }, async (err, decoded) => {
        if (err) {
            console.error('Token verification error:', err);
            return res.status(403).json({ message: 'Token is invalid' });
        }
        // User Sync Logic: Ensure a user exists in our local database
        try {
            await prisma.user.upsert({
                where: { id: decoded.sub }, // Find user by their Cognito unique ID
                update: {}, // We don't need to update anything if they already exist
                create: {
                    id: decoded.sub,
                    email: decoded.email,
                    firstName: decoded.given_name,
                    lastName: decoded.family_name,
                    role: 'OWNER', // Default role for new users
                },
            });
        }
        catch (dbError) {
            console.error("Database sync error:", dbError);
            return res.status(500).json({ message: 'Error syncing user with database' });
        }
        // Attach user info to the request and proceed
        req.user = decoded;
        next();
    });
};
exports.authenticateToken = authenticateToken;
