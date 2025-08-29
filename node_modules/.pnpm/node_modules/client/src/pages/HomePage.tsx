import { useState, useEffect } from 'react';
import axios from 'axios';
import CarCard from '../components/CarCard';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [location, setLocation] = useState('');
  const navigate = useNavigate();

  // This effect runs once when the component loads to fetch all cars
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/cars');
        setCars(response.data);
      } catch (err) {
        console.error('Failed to fetch cars:', err);
        setError('Could not load car listings.');
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Navigate to the search results page with the location as a query parameter
    if (location) {
      navigate(`/search?location=${location}`);
    }
  };

  return (
    <div>
      {/* Hero Section with Search */}
      <div className="bg-slate-100 py-20 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 font-display">
          Find Your Perfect Ride
        </h1>
        <p className="mt-4 text-lg text-slate-600 font-sans">
          Rent the best cars from local owners, wherever you are.
        </p>
        
        {/* The search form is now correctly placed here */}
        <form onSubmit={handleSearch} className="mt-8 max-w-xl mx-auto flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter a city, state, or airport"
            className="flex-grow px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button type="submit" className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Search Cars
          </button>
        </form>
      </div>

      {/* Car Listings Section */}
      <div className="container mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold text-slate-800 font-display mb-8">Featured Vehicles</h2>
        {loading && <p>Loading cars...</p>}
        {error && <p className="text-red-500">{error}</p>}
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {cars.map((car: any) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;