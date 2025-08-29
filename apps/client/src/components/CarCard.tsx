import { formatCurrency } from '../utils/formatting';
import { Link } from 'react-router-dom';

// ... Car interface ...

interface CarCardProps {
  car: Car;
  showEditButton?: boolean; // Make the edit button optional
}

const CarCard = ({ car, showEditButton = false }: CarCardProps) => {
  const cardContent = (
    <div className="p-4">
      <h3 className="text-lg font-bold font-display text-slate-800">{car.make} {car.model} ({car.year})</h3>
      <p className="text-sm text-slate-600 font-sans mt-1">{car.location}</p>
      <div className="mt-4 flex justify-between items-center">
        <div>
          {showEditButton && (
            <Link to={`/edit-car/${car.id}`} className="text-sm font-semibold text-blue-600 hover:text-blue-800">Edit</Link>
          )}
        </div>
        <div className="text-right">
          <span className="text-xl font-bold font-display text-slate-900">
            {formatCurrency(car.pricePerDay)}
          </span>
          <span className="text-sm text-slate-500 font-sans">/day</span>
        </div>
      </div>
    </div>
  );

  // If it's just for public view, the whole card is a link to the details page
  if (!showEditButton) {
    return (
      <Link to={`/cars/${car.id}`} className="block border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white">
        {cardContent}
      </Link>
    );
  }

  // If it's on the dashboard, it's not a single big link, but has an internal edit link
  return (
    <div className="border rounded-lg overflow-hidden shadow-lg bg-white">
      {cardContent}
    </div>
  );
};

export default CarCard;