import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import CarCard from '../components/CarCard';

const SearchResultsPage = () => {
  const [searchParams] = useSearchParams();
  const location = searchParams.get('location'); // Read location from URL

  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!location) return;

    const fetchSearchResults = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:3001/api/cars?location=${location}`);
        setCars(response.data);
      } catch (err) {
        console.error('Failed to fetch search results:', err);
        setError('Could not find cars for this location.');
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [location]); // Re-run this effect if the location in the URL changes

  if (loading) return <p className="text-center mt-8">Searching for cars...</p>;
  if (error) return <p className="text-center mt-8 text-red-500">{error}</p>;

  return (
    <div className="container mx-auto py-12 px-4">
      <h2 className="text-3xl font-bold font-display text-slate-800 mb-8">
        Available Cars in <span className="text-blue-600">{location}</span>
      </h2>
      {cars.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {cars.map((car: any) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      ) : (
        <p className="text-center text-slate-600">No cars found for this location.</p>
      )}
    </div>
  );
};

export default SearchResultsPage;