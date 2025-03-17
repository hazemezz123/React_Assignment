import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-indigo-400">
              FakeStore
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-gray-300 hover:text-indigo-400 font-medium transition-colors duration-200"
            >
              Home
            </Link>
            <Link
              to="/"
              className="text-gray-300 hover:text-indigo-400 font-medium transition-colors duration-200"
            >
              Products
            </Link>
            <Link
              to="/"
              className="text-gray-300 hover:text-indigo-400 font-medium transition-colors duration-200"
            >
              Categories
            </Link>
            <Link
              to="/"
              className="text-gray-300 hover:text-indigo-400 font-medium transition-colors duration-200"
            >
              About
            </Link>
            <Link
              to="/"
              className="text-gray-300 hover:text-indigo-400 font-medium transition-colors duration-200"
            >
              Contact
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="py-2 pl-10 pr-4 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-full md:w-64 text-white"
              />
              <svg
                className="w-5 h-5 text-gray-400 absolute left-3 top-2.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
            <Link to="/" className="relative">
              <svg
                className="w-6 h-6 text-gray-300 hover:text-indigo-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                ></path>
              </svg>
              <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
