import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import jwksClient from 'jwks-rsa';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const client = jwksClient({
  jwksUri: `https://cognito-idp.${process.env.AWS_REGION}.amazonaws.com/${process.env.AWS_COGNITO_USER_POOL_ID}/.well-known/jwks.json`,
});

// Complete getKey function with error handling
const getKey = (header: any, callback: any) => {
  client.getSigningKey(header.kid, (err: Error | null, key: jwksClient.SigningKey | undefined) => {
    if (err || !key) {
      return callback(err || new Error('Signing key not found'));
    }
    const signingKey = key.getPublicKey();
    callback(null, signingKey);
  });
};

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Expects "Bearer TOKEN"

  if (token == null) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, getKey, { algorithms: ['RS256'] }, async (err, decoded: any) => {
    if (err) {
      console.error('Token verification error:', err);
      return res.status(403).json({ message: 'Token is invalid' });
    }
    
    // User Sync Logic: Ensure a user exists in our local database
    try {
      await prisma.user.upsert({
        where: { id: decoded.sub }, // Find user by their Cognito unique ID
        update: {}, // We don't need to update anything if they already exist
        create: {   // If they don't exist, create them in our database
          id: decoded.sub,
          email: decoded.email,
          firstName: decoded.given_name,
          lastName: decoded.family_name,
          role: 'OWNER', // Default role for new users
        },
      });
    } catch (dbError) {
      console.error("Database sync error:", dbError);
      return res.status(500).json({ message: 'Error syncing user with database' });
    }
    
    // Attach user info to the request and proceed
    req.user = decoded;
    next();
  });
};