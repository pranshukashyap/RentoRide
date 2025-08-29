import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { AuthContext } from './AuthContext';
import { useState, useEffect } from "react";
import type { ReactNode } from "react";

interface DecodedToken {
  exp: number;
}

interface AuthProviderProps {
  children: ReactNode;
} 

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<any>(null);
  const [tokens, setTokens] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true); // Add loading state
  const navigate = useNavigate();

  useEffect(() => {
    const storedTokens = localStorage.getItem('authTokens');
    if (storedTokens) {
      const parsedTokens = JSON.parse(storedTokens);
      const decodedToken: DecodedToken = jwtDecode(parsedTokens.IdToken);

      if (decodedToken.exp * 1000 < Date.now()) {
        logout();
      } else {
        login(parsedTokens, false);
      }
    }
    // Crucially, set loading to false after we've checked
    setIsLoading(false);
  }, []);

  // ... login and logout functions are the same ...
const login = (newTokens: any, shouldRedirect: boolean = true) => {
    const decodedUser = jwtDecode(newTokens.IdToken);
    setTokens(newTokens);
    setUser(decodedUser);
    setIsAuthenticated(true);
    localStorage.setItem('authTokens', JSON.stringify(newTokens));
    if (shouldRedirect) {
      navigate('/dashboard');
    }
  };

  const logout = () => {
    setUser(null);
    setTokens(null);
    setIsAuthenticated(false);
    localStorage.removeItem('authTokens');
    navigate('/login');
  };

  const value = { isAuthenticated, isLoading, user, tokens, login, logout };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};