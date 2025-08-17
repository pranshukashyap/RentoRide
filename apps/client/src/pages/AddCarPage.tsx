import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const AddCarPage = () => {
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: '',
    location: '',
    pricePerDay: '',
    imageUrl: '',
  });
  const [error, setError] = useState('');
  const { tokens } = useAuth(); // Get tokens from our AuthContext
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      // Send the request to the protected backend endpoint
      await axios.post('http://localhost:3001/api/cars', {
        ...formData,
        // Convert year and price to numbers
        year: parseInt(formData.year),
        pricePerDay: parseFloat(formData.pricePerDay),
      }, {
        headers: {
          // Include the user's token to prove they are authenticated
          Authorization: `Bearer ${tokens.IdToken}`,
        },
      });

      alert('Car listed successfully!');
      navigate('/dashboard'); // Redirect to dashboard on success

    } catch (err) {
      console.error('Failed to add car:', err);
      setError('Failed to list car. Please try again.');
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">List a New Car</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Form fields for make, model, year, etc. */}
        <div className="flex space-x-4">
          <div className="w-1/2">
            <label htmlFor="make" className="block text-sm font-medium text-gray-700">Make (e.g., Toyota)</label>
            <input type="text" name="make" value={formData.make} onChange={handleChange} required className="mt-1 block w-full input" />
          </div>
          <div className="w-1/2">
            <label htmlFor="model" className="block text-sm font-medium text-gray-700">Model (e.g., Camry)</label>
            <input type="text" name="model" value={formData.model} onChange={handleChange} required className="mt-1 block w-full input" />
          </div>
        </div>
         <div>
            <label htmlFor="year" className="block text-sm font-medium text-gray-700">Year</label>
            <input type="number" name="year" value={formData.year} onChange={handleChange} required className="mt-1 block w-full input" />
          </div>
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location (e.g., City, State)</label>
            <input type="text" name="location" value={formData.location} onChange={handleChange} required className="mt-1 block w-full input" />
          </div>
           <div>
            <label htmlFor="pricePerDay" className="block text-sm font-medium text-gray-700">Price per Day ($)</label>
            <input type="number" name="pricePerDay" value={formData.pricePerDay} onChange={handleChange} required className="mt-1 block w-full input" />
          </div>
          <div>
            <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">Image URL</label>
            <input type="text" name="imageUrl" value={formData.imageUrl} onChange={handleChange} required className="mt-1 block w-full input" />
          </div>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <button type="submit" className="w-full btn btn-primary">
          List My Car
        </button>
      </form>
    </div>
  );
};

export default AddCarPage;