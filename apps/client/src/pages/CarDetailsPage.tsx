import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { formatCurrency } from '../utils/formatting';
import { UsersIcon, CogIcon, FireIcon, CalendarIcon } from '@heroicons/react/24/solid';

// Define a more specific type for our Car data
interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  location: string;
  pricePerDay: number;
  type: string;
  transmission: string;
  fuelType: string;
  seatingCapacity: number;
  description: string | null;
  owner: {
    firstName: string;
    lastName: string;
  };
}

const CarDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;
    const fetchCarDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/cars/${id}`);
        setCar(response.data);
      } catch (err) {
        setError('Could not find car details.');
      } finally {
        setLoading(false);
      }
    };
    fetchCarDetails();
  }, [id]);

  if (loading) return <p className="text-center mt-8">Loading car details...</p>;
  if (error) return <p className="text-center mt-8 text-red-500">{error}</p>;
  if (!car) return <p className="text-center mt-8">Car not found.</p>;

  return (
    <div className="container mx-auto py-12 px-4 font-sans">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Image Gallery Placeholder */}
        <div className="lg:col-span-2">
          <div className="bg-slate-200 rounded-lg h-96 mb-4 flex items-center justify-center">
              <span className="text-slate-500 text-lg">Main Image Placeholder</span>
          </div>
          <div className="grid grid-cols-4 gap-4">
              <div className="bg-slate-200 rounded h-24"></div>
              <div className="bg-slate-200 rounded h-24"></div>
              <div className="bg-slate-200 rounded h-24"></div>
              <div className="bg-slate-200 rounded h-24"></div>
          </div>
        </div>

        {/* Right Column: Details and Booking */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold font-display text-slate-800">{car.make} {car.model}</h1>
            <p className="text-lg text-slate-500 mt-1">{car.location}</p>

            <div className="grid grid-cols-2 gap-4 text-center my-6 border-y py-4">
              <div className="flex flex-col items-center">
                <CalendarIcon className="h-6 w-6 text-blue-600"/>
                <span className="font-bold mt-1">{car.year}</span>
                <span className="text-xs text-slate-500">Year</span>
              </div>
              <div className="flex flex-col items-center">
                <UsersIcon className="h-6 w-6 text-blue-600"/>
                <span className="font-bold mt-1">{car.seatingCapacity}</span>
                <span className="text-xs text-slate-500">Seats</span>
              </div>
              <div className="flex flex-col items-center">
                <CogIcon className="h-6 w-6 text-blue-600"/>
                <span className="font-bold mt-1 capitalize">{car.transmission.toLowerCase()}</span>
                <span className="text-xs text-slate-500">Transmission</span>
              </div>
              <div className="flex flex-col items-center">
                <FireIcon className="h-6 w-6 text-blue-600"/>
                <span className="font-bold mt-1 capitalize">{car.fuelType.toLowerCase()}</span>
                <span className="text-xs text-slate-500">Fuel Type</span>
              </div>
            </div>

            <div className="text-right">
              <p className="text-3xl font-bold font-display text-slate-900">
                {formatCurrency(car.pricePerDay)}
                <span className="text-base text-slate-500 font-sans">/day</span>
              </p>
            </div>

            <div className="mt-6">
              <button className="w-full py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
                Book Now
              </button>
            </div>
          </div>
          <div className="mt-6 text-center">
            <p className="text-slate-600">Hosted by {car.owner.firstName} {car.owner.lastName.charAt(0)}.</p>
          </div>
        </div>
      </div>

      {car.description && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold font-display text-slate-800">About this car</h2>
          <p className="mt-4 text-slate-700 whitespace-pre-wrap">{car.description}</p>
        </div>
      )}
    </div>
  );
};

export default CarDetailsPage;