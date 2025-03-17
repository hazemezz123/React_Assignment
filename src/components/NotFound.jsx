import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-4 bg-gray-900">
      <h1 className="text-4xl font-bold mb-4 text-white">
        404 - Page Not Found
      </h1>
      <p className="text-gray-300 mb-6">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
      >
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
