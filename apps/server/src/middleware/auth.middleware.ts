import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import jwksClient from 'jwks-rsa';

declare global {
  namespace Express {
    export interface Request {
      user?: any;
    }
  }
}

const client = jwksClient({
  jwksUri: `https://cognito-idp.${process.env.AWS_REGION}.amazonaws.com/${process.env.AWS_COGNITO_USER_POOL_ID}/.well-known/jwks.json`,
});

// Corrected getKey function with the proper type for 'key'
const getKey = (header: any, callback: any) => {
  client.getSigningKey(header.kid, (err: Error | null, key: jwksClient.SigningKey | undefined) => {
    // This check now correctly handles both an error and the case where key is undefined
    if (err || !key) {
      return callback(err || new Error('Signing key not found'));
    }
    const signingKey = key.getPublicKey();
    callback(null, signingKey);
  });
};

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, getKey, { algorithms: ['RS256'] }, (err, decoded) => {
    if (err) {
      console.error('Token verification error:', err);
      return res.status(403).json({ message: 'Token is invalid' });
    }

    req.user = decoded;
    next();
  });
};