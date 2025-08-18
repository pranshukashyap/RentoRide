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
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const { tokens } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!imageFile) {
      setError('Please select an image to upload.');
      return;
    }

    try {
      // 1. Get the presigned URL
      const presignedUrlResponse = await axios.post('http://localhost:3001/api/uploads/url', 
        { fileName: imageFile.name },
        { headers: { Authorization: `Bearer ${tokens.IdToken}` } }
      );
      const { uploadUrl, key } = presignedUrlResponse.data;

      // 2. Upload the image file to S3
      await axios.put(uploadUrl, imageFile, {
        headers: { 'Content-Type': imageFile.type },
      });

      const imageUrl = `https://${process.env.VITE_AWS_S3_BUCKET_NAME}.s3.${process.env.VITE_AWS_REGION}.amazonaws.com/${key}`;

      // 3. Send car data to our backend
      await axios.post('http://localhost:3001/api/cars', {
        ...formData,
        year: parseInt(formData.year),
        pricePerDay: parseFloat(formData.pricePerDay),
        imageUrl: imageUrl,
      }, {
        headers: { Authorization: `Bearer ${tokens.IdToken}` },
      });

      alert('Car listed successfully!');
      navigate('/dashboard');

    } catch (err) {
      console.error('Failed to add car:', err);
      setError('Failed to list car. Please try again.');
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">List a New Car</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex space-x-4">
          <div className="w-1/2">
            <label htmlFor="make" className="block text-sm font-medium text-gray-700">Make (e.g., Toyota)</label>
            <input type="text" name="make" value={formData.make} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
          </div>
          <div className="w-1/2">
            <label htmlFor="model" className="block text-sm font-medium text-gray-700">Model (e.g., Camry)</label>
            <input type="text" name="model" value={formData.model} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
          </div>
        </div>
        <div>
          <label htmlFor="year" className="block text-sm font-medium text-gray-700">Year</label>
          <input type="number" name="year" value={formData.year} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
        </div>
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location (e.g., Chennai, Tamil Nadu)</label>
          <input type="text" name="location" value={formData.location} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
        </div>
        <div>
          <label htmlFor="pricePerDay" className="block text-sm font-medium text-gray-700">Price per Day (₹)</label>
          <input type="number" name="pricePerDay" value={formData.pricePerDay} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
        </div>
        <div>
          <label htmlFor="imageFile" className="block text-sm font-medium text-gray-700">Car Image</label>
          <input type="file" name="imageFile" onChange={handleFileChange} required className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100" />
        </div>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <button type="submit" className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          List My Car
        </button>
      </form>
    </div>
  );
};

export default AddCarPage;