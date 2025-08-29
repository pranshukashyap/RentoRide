import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import AddCarPage from './pages/AddCarPage';
import SearchResultsPage from './pages/SearchResultsPage'; // 1. Import
import CarDetailsPage from './pages/CarDetailsPage';
import EditCarPage from './pages/EditCarPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="search" element={<SearchResultsPage />} /> {/* 2. Add route */}
        <Route path="cars/:id" element={<CarDetailsPage />} /> {/* 2. Add route */}
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route 
          path="dashboard" 
          element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} 
        />
        <Route 
          path="add-car" 
          element={<ProtectedRoute><AddCarPage /></ProtectedRoute>} 
        />
        <Route 
          path="edit-car/:id" 
          element={<ProtectedRoute><EditCarPage /></ProtectedRoute>} 
        />
      </Route>
    </Routes>
  );
}

export default App;