import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [location, setLocation] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // For now, we'll just log it. Later, this will trigger a search.
    console.log('Searching for cars in:', location);
    // We can navigate to a search results page in the future
    // navigate(`/search?location=${location}`);
  };

  return (
    <div className="text-center">
      <div className="bg-gray-100 py-20 px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">
          Find Your Perfect Ride
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Rent the best cars from local owners, wherever you are.
        </p>

        <form onSubmit={handleSearch} className="mt-8 max-w-xl mx-auto flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter a city, state, or airport"
            className="flex-grow px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
          <button type="submit" className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Search Cars
          </button>
        </form>
      </div>

      {/* We will add a section to display featured cars here later */}
      <div className="py-16">
        <h2 className="text-3xl font-bold text-gray-800">How RentoRide Works</h2>
        {/* Placeholder for feature descriptions */}
        <p className="mt-4 text-gray-600">More content will go here.</p>
      </div>
    </div>
  );
};

export default HomePage;