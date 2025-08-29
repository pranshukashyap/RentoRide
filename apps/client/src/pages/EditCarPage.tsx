import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const EditCarPage = () => {
  const { id: carId } = useParams<{ id: string }>();
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: '',
    location: '',
    pricePerDay: '',
    type: 'SEDAN',
    transmission: 'MANUAL',
    fuelType: 'PETROL',
    seatingCapacity: '',
    description: '',
  });
  const [error, setError] = useState('');
  const { tokens } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCarData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/cars/${carId}`);
        setFormData(response.data);
      } catch (err) {
        console.error('Failed to fetch car data:', err);
        setError('Could not load car data for editing.');
      }
    };
    if (carId) {
      fetchCarData();
    }
  }, [carId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const payload = {
    make: formData.make,
    model: formData.model,
    year: parseInt(formData.year),
    location: formData.location,
    pricePerDay: parseFloat(formData.pricePerDay),
    type: formData.type,
    transmission: formData.transmission,
    fuelType: formData.fuelType,
    seatingCapacity: parseInt(formData.seatingCapacity),
    description: formData.description,
  };

  try {
    await axios.put(`http://localhost:3001/api/cars/${carId}`, payload, {
      headers: { Authorization: `Bearer ${tokens.IdToken}` },
    });

    alert('Car updated successfully!');
    navigate('/dashboard');

  } catch (err) {
    console.error('Failed to update car:', err);
    setError('Failed to update car. Please try again.');
  }
  };

  return (
    <div className="max-w-xl mx-auto mt-8 p-8 bg-white rounded-lg shadow-xl font-sans">
      <h2 className="text-3xl font-bold text-center text-slate-800 mb-8 font-display">Edit Your Car</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        
        <div className="flex flex-col sm:flex-row gap-6">
          <div className="sm:w-1/2">
            <label htmlFor="make" className="block text-sm font-medium text-slate-700">Make</label>
            <input type="text" name="make" value={formData.make} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
          </div>
          <div className="sm:w-1/2">
            <label htmlFor="model" className="block text-sm font-medium text-slate-700">Model</label>
            <input type="text" name="model" value={formData.model} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-6">
          <div className="sm:w-1/2">
            <label htmlFor="type" className="block text-sm font-medium text-slate-700">Car Type</label>
            <select name="type" value={formData.type} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                <option>SEDAN</option>
                <option>SUV</option>
                <option>HATCHBACK</option>
                <option>LUXURY</option>
            </select>
          </div>
          <div className="sm:w-1/2">
            <label htmlFor="transmission" className="block text-sm font-medium text-slate-700">Transmission</label>
            <select name="transmission" value={formData.transmission} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                <option>MANUAL</option>
                <option>AUTOMATIC</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-6">
          <div className="sm:w-1/2">
            <label htmlFor="year" className="block text-sm font-medium text-slate-700">Year</label>
            <input type="number" name="year" value={formData.year} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
          </div>
          <div className="sm:w-1/2">
            <label htmlFor="seatingCapacity" className="block text-sm font-medium text-slate-700">Seats</label>
            <input type="number" name="seatingCapacity" value={formData.seatingCapacity} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-6">
          <div className="sm:w-1/2">
            <label htmlFor="fuelType" className="block text-sm font-medium text-slate-700">Fuel Type</label>
            <select name="fuelType" value={formData.fuelType} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                <option>PETROL</option>
                <option>DIESEL</option>
                <option>ELECTRIC</option>
            </select>
          </div>
          <div className="sm:w-1/2">
            <label htmlFor="pricePerDay" className="block text-sm font-medium text-slate-700">Price per Day (₹)</label>
            <input type="number" name="pricePerDay" value={formData.pricePerDay} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
          </div>
        </div>
        
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-slate-700">Location</label>
          <input type="text" name="location" value={formData.location} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
        </div>

        <div>
            <label htmlFor="description" className="block text-sm font-medium text-slate-700">Description (Optional)</label>
            <textarea name="description" value={formData.description || ''} onChange={handleChange} rows={3} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"></textarea>
        </div>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <button type="submit" className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditCarPage;