import { useState, useEffect} from 'react';
import type { ReactNode } from "react";
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { AuthContext } from './AuthContext';

// Define the props for the provider
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<any>(null);
  const [tokens, setTokens] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();

  // This effect runs once when the app loads
  useEffect(() => {
    const storedTokens = localStorage.getItem('authTokens');
    if (storedTokens) {
      const parsedTokens = JSON.parse(storedTokens);
      // Here you might want to add logic to check if the token is expired
      login(parsedTokens);
    }
  }, []);

  const login = (newTokens: any) => {
    // Decode the ID token to get user information
    const decodedUser = jwtDecode(newTokens.IdToken);

    setTokens(newTokens);
    setUser(decodedUser);
    setIsAuthenticated(true);

    // Store tokens in localStorage to persist the session
    localStorage.setItem('authTokens', JSON.stringify(newTokens));
  };

  const logout = () => {
    setUser(null);
    setTokens(null);
    setIsAuthenticated(false);

    // Remove tokens from localStorage
    localStorage.removeItem('authTokens');

    // Redirect to the login page
    navigate('/login');
  };

  const value = {
    isAuthenticated,
    user,
    tokens,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};