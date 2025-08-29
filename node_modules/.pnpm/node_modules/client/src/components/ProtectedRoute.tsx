import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import type { ReactElement } from "react";

interface ProtectedRouteProps {
  children: ReactElement;
}
const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading } = useAuth();

  // While we are checking for the token, show a loading message
  if (isLoading) {
    return <div>Loading session...</div>;
  }

  // After loading, if not authenticated, redirect
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If loading is finished and user is authenticated, show the page
  return children;
};

export default ProtectedRoute;