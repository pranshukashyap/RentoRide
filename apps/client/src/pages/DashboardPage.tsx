import { Link } from 'react-router-dom';

const DashboardPage = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">My Dashboard</h1>
      <p>Welcome to your RentoRide dashboard.</p>

      <div className="mt-6">
        <Link to="/add-car" className="py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700">
          + List a New Car
        </Link>
      </div>
    </div>
  );
};

export default DashboardPage;