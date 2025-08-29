// This tells TypeScript that we are adding a new property to the Express Request interface
declare global {
  namespace Express {
    interface Request {
      user?: any; // We can make this more specific later
    }
  }
}

// Add this line to make it a module
export {};