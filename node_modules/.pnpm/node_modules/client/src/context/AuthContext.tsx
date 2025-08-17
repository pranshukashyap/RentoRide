import { createContext, useContext } from 'react';

// Define the shape of the data and functions we want in our context
interface AuthContextType {
  isAuthenticated: boolean;
  user: any; // We can define a stricter user type later
  tokens: any; // To hold the JWTs
  login: (tokens: any) => void;
  logout: () => void;
}

// Create the context with default values
export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  tokens: null,
  login: () => {},
  logout: () => {},
});

// Create a custom hook for easy access to the context
export const useAuth = () => {
  return useContext(AuthContext);
};