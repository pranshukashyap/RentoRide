import { createContext, useContext } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean; // Add this line
  user: any;
  tokens: any;
  login: (tokens: any) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isLoading: true, // Default to true
  user: null,
  tokens: null,
  login: () => {},
  logout: () => {},
});

export const useAuth = () => {
  return useContext(AuthContext);
};