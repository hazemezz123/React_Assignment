import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const { cartCount, wishlistCount } = useCart();

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
              to="/cart"
              className="text-gray-300 hover:text-indigo-400 font-medium transition-colors duration-200"
            >
              Cart
            </Link>
            <Link
              to="/wishlist"
              className="text-gray-300 hover:text-indigo-400 font-medium transition-colors duration-200"
            >
              Wishlist
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
            <Link to="/wishlist" className="relative">
              <svg
                className="w-6 h-6 text-gray-300 hover:text-red-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                ></path>
              </svg>
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>
            <Link to="/cart" className="relative">
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
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
