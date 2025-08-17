import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    // If the user is not authenticated, redirect them to the /login page
    return <Navigate to="/login" replace />;
  }

  // If the user is authenticated, render the child component (the protected page)
  return children;
};

export default ProtectedRoute;