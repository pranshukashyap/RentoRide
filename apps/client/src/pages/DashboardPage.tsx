import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import CarCard from '../components/CarCard';

const DashboardPage = () => {
  const [myListings, setMyListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { tokens } = useAuth();

  useEffect(() => {
    const fetchMyListings = async () => {
      if (!tokens) return;
      try {
        const response = await axios.get('http://localhost:3001/api/cars/my-listings', {
          headers: { Authorization: `Bearer ${tokens.IdToken}` }
        });
        setMyListings(response.data);
      } catch (error) {
        console.error('Failed to fetch user listings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyListings();
  }, [tokens]);

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold font-display text-slate-800">My Dashboard</h1>
        <Link to="/add-car" className="py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700">
          + List a New Car
        </Link>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold font-display text-slate-700 mb-4">My Listings</h2>
        {loading ? (
          <p>Loading your listings...</p>
        ) : myListings.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {myListings.map((car: any) => (
              <CarCard key={car.id} car={car} showEditButton={true} />
            ))}
          </div>
        ) : (
          <p className="text-slate-500 bg-slate-100 p-4 rounded-lg">You haven't listed any cars yet.</p>
        )}
      </div>
    </div>

    
  );
};

export default DashboardPage;