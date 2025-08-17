"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwks_rsa_1 = __importDefault(require("jwks-rsa"));
const client = (0, jwks_rsa_1.default)({
    jwksUri: `https://cognito-idp.${process.env.AWS_REGION}.amazonaws.com/${process.env.AWS_COGNITO_USER_POOL_ID}/.well-known/jwks.json`,
});
// Corrected getKey function with the proper type for 'key'
const getKey = (header, callback) => {
    client.getSigningKey(header.kid, (err, key) => {
        // This check now correctly handles both an error and the case where key is undefined
        if (err || !key) {
            return callback(err || new Error('Signing key not found'));
        }
        const signingKey = key.getPublicKey();
        callback(null, signingKey);
    });
};
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
        return res.status(401).json({ message: 'No token provided' });
    }
    jsonwebtoken_1.default.verify(token, getKey, { algorithms: ['RS256'] }, (err, decoded) => {
        if (err) {
            console.error('Token verification error:', err);
            return res.status(403).json({ message: 'Token is invalid' });
        }
        req.user = decoded;
        next();
    });
};
exports.authenticateToken = authenticateToken;
