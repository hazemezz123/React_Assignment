import { Link } from "react-router-dom";
import ScrollLink from "./ScrollLink";
import { useCart } from "../context/CartContext";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const { cartCount, wishlistCount } = useCart();
  const { isDarkMode, toggleTheme } = useTheme();
  const { currentUser, logout, isAuthenticated } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const userMenuRef = useRef(null);
  const userButtonRef = useRef(null);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Don't close if clicking on the toggle button
      if (buttonRef.current && buttonRef.current.contains(event.target)) {
        return;
      }

      // Close if clicking outside the menu
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }

      // Handle user menu
      if (
        userButtonRef.current &&
        userButtonRef.current.contains(event.target)
      ) {
        return;
      }

      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close menu when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleMenu = (e) => {
    e.stopPropagation();
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleUserMenu = (e) => {
    e.stopPropagation();
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
  };

  return (
    <motion.nav
      className={`${
        isDarkMode ? "bg-gray-800" : "bg-white"
      } shadow-md sticky top-0 z-50 transition-colors duration-300`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 15 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <ScrollLink to="/" className="flex items-center">
            <motion.span
              className={`text-2xl font-bold ${
                isDarkMode ? "text-indigo-400" : "text-indigo-600"
              }`}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              FakeStore
            </motion.span>
          </ScrollLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <ScrollLink
              to="/"
              className={`${
                isDarkMode
                  ? "text-gray-300 hover:text-indigo-400"
                  : "text-gray-700 hover:text-indigo-600"
              } font-medium transition-colors duration-200`}
            >
              Home
            </ScrollLink>
            <ScrollLink
              to="/products"
              className={`${
                isDarkMode
                  ? "text-gray-300 hover:text-indigo-400"
                  : "text-gray-700 hover:text-indigo-600"
              } font-medium transition-colors duration-200`}
            >
              Products
            </ScrollLink>
            <ScrollLink
              to="/about"
              className={`${
                isDarkMode
                  ? "text-gray-300 hover:text-indigo-400"
                  : "text-gray-700 hover:text-indigo-600"
              } font-medium transition-colors duration-200`}
            >
              About Us
            </ScrollLink>
            {isAuthenticated() && (
              <ScrollLink
                to="/orders"
                className={`${
                  isDarkMode
                    ? "text-gray-300 hover:text-indigo-400"
                    : "text-gray-700 hover:text-indigo-600"
                } font-medium transition-colors duration-200`}
              >
                Orders
              </ScrollLink>
            )}
            <ScrollLink
              to="/cart"
              className={`${
                isDarkMode
                  ? "text-gray-300 hover:text-indigo-400"
                  : "text-gray-700 hover:text-indigo-600"
              } font-medium transition-colors duration-200`}
            >
              Cart
            </ScrollLink>
            <ScrollLink
              to="/wishlist"
              className={`${
                isDarkMode
                  ? "text-gray-300 hover:text-indigo-400"
                  : "text-gray-700 hover:text-indigo-600"
              } font-medium transition-colors duration-200`}
            >
              Wishlist
            </ScrollLink>
          </div>

          {/* Search, Theme Toggle, and Icons */}
          <div className="flex items-center">
            <div className="relative hidden sm:block mr-4">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`py-2 pl-10 pr-4 rounded-lg ${
                  isDarkMode
                    ? "bg-gray-700 border-gray-600 text-white focus:ring-indigo-500 focus:border-indigo-500"
                    : "bg-gray-100 border-gray-200 text-gray-700 focus:ring-indigo-500 focus:border-indigo-500"
                } border focus:outline-none focus:ring-2 w-40 md:w-64 transition-colors duration-200`}
              />
              <svg
                className={`w-5 h-5 ${
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                } absolute left-3 top-2.5`}
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

            {/* Theme Toggle Button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className={`p-2 rounded-full mx-2 ${
                isDarkMode
                  ? "bg-gray-700 text-yellow-300"
                  : "bg-blue-100 text-indigo-600"
              }`}
              aria-label="Toggle theme"
            >
              {isDarkMode ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </motion.button>

            {/* Wishlist Icon */}
            <ScrollLink to="/wishlist" className="relative p-2 mx-1">
              <motion.div whileTap={{ scale: 0.9 }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-6 w-6 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </motion.div>
              {wishlistCount > 0 && (
                <span
                  className={`absolute -top-1 -right-1 ${
                    isDarkMode ? "bg-indigo-500" : "bg-indigo-600"
                  } text-white text-xs rounded-full h-5 w-5 flex items-center justify-center`}
                >
                  {wishlistCount}
                </span>
              )}
            </ScrollLink>

            {/* Cart Icon */}
            <ScrollLink to="/cart" className="relative p-2 mx-1">
              <motion.div whileTap={{ scale: 0.9 }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-6 w-6 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
              </motion.div>
              {cartCount > 0 && (
                <span
                  className={`absolute -top-1 -right-1 ${
                    isDarkMode ? "bg-indigo-500" : "bg-indigo-600"
                  } text-white text-xs rounded-full h-5 w-5 flex items-center justify-center`}
                >
                  {cartCount}
                </span>
              )}
            </ScrollLink>

            {/* Auth Section */}
            <div className="ml-4 relative hidden md:block">
              {isAuthenticated() ? (
                <div className="relative">
                  <button
                    ref={userButtonRef}
                    onClick={toggleUserMenu}
                    className={`flex items-center space-x-2 focus:outline-none ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full overflow-hidden ${
                        isDarkMode ? "bg-gray-700" : "bg-gray-200"
                      } flex items-center justify-center text-sm font-medium`}
                    >
                      {currentUser.name?.charAt(0).toUpperCase() || "U"}
                    </div>
                    <span className="font-medium truncate max-w-[100px]">
                      {currentUser.name?.split(" ")[0] || "User"}
                    </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-5 w-5 ${
                        isDarkMode ? "text-gray-400" : "text-gray-500"
                      } transition-transform ${
                        isUserMenuOpen ? "rotate-180" : ""
                      }`}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>

                  <AnimatePresence>
                    {isUserMenuOpen && (
                      <motion.div
                        ref={userMenuRef}
                        className={`origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg ${
                          isDarkMode ? "bg-gray-800" : "bg-white"
                        } ring-1 ring-black ring-opacity-5 z-50`}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.1 }}
                      >
                        <div className="py-1">
                          <div
                            className={`block px-4 py-2 text-sm ${
                              isDarkMode ? "text-gray-300" : "text-gray-700"
                            } border-b ${
                              isDarkMode ? "border-gray-700" : "border-gray-200"
                            }`}
                          >
                            <div className="font-medium">
                              {currentUser.name || "User"}
                            </div>
                            <div
                              className={`text-xs ${
                                isDarkMode ? "text-gray-400" : "text-gray-500"
                              }`}
                            >
                              {currentUser.email}
                            </div>
                          </div>
                          <ScrollLink
                            to="/profile"
                            className={`block px-4 py-2 text-sm ${
                              isDarkMode
                                ? "text-gray-300 hover:bg-gray-700"
                                : "text-gray-700 hover:bg-gray-100"
                            }`}
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            Your Profile
                          </ScrollLink>
                          <ScrollLink
                            to="/orders"
                            className={`block px-4 py-2 text-sm ${
                              isDarkMode
                                ? "text-gray-300 hover:bg-gray-700"
                                : "text-gray-700 hover:bg-gray-100"
                            }`}
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            Orders
                          </ScrollLink>
                          <button
                            onClick={handleLogout}
                            className={`block w-full text-left px-4 py-2 text-sm ${
                              isDarkMode
                                ? "text-gray-300 hover:bg-gray-700"
                                : "text-gray-700 hover:bg-gray-100"
                            }`}
                          >
                            Sign out
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="flex space-x-4">
                  <ScrollLink
                    to="/login"
                    className={`font-medium text-sm ${
                      isDarkMode
                        ? "text-indigo-400 hover:text-indigo-300"
                        : "text-indigo-600 hover:text-indigo-500"
                    }`}
                  >
                    Sign in
                  </ScrollLink>
                  <ScrollLink
                    to="/register"
                    className={`font-medium text-sm px-3 py-1 rounded-md ${
                      isDarkMode
                        ? "bg-indigo-600 hover:bg-indigo-500 text-white"
                        : "bg-indigo-500 hover:bg-indigo-600 text-white"
                    }`}
                  >
                    Sign up
                  </ScrollLink>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden ml-2">
              <button
                ref={buttonRef}
                onClick={toggleMenu}
                className={`p-2 rounded-md focus:outline-none ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                {isMenuOpen ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16m-7 6h7"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              ref={menuRef}
              className={`md:hidden ${
                isDarkMode ? "bg-gray-800" : "bg-white"
              } px-2 pt-2 pb-3 space-y-1 rounded-md shadow-lg`}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ScrollLink
                to="/"
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isDarkMode
                    ? "text-gray-300 hover:bg-gray-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </ScrollLink>
              <ScrollLink
                to="/products"
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isDarkMode
                    ? "text-gray-300 hover:bg-gray-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </ScrollLink>
              <ScrollLink
                to="/about"
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isDarkMode
                    ? "text-gray-300 hover:bg-gray-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </ScrollLink>
              {isAuthenticated() && (
                <ScrollLink
                  to="/orders"
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isDarkMode
                      ? "text-gray-300 hover:bg-gray-700"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Orders
                </ScrollLink>
              )}
              {isAuthenticated() && (
                <ScrollLink
                  to="/profile"
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isDarkMode
                      ? "text-gray-300 hover:bg-gray-700"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profile
                </ScrollLink>
              )}
              <ScrollLink
                to="/cart"
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isDarkMode
                    ? "text-gray-300 hover:bg-gray-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Cart
              </ScrollLink>
              <ScrollLink
                to="/wishlist"
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isDarkMode
                    ? "text-gray-300 hover:bg-gray-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Wishlist
              </ScrollLink>

              {/* Mobile Auth Options */}
              <div
                className={`border-t mt-4 pt-4 ${
                  isDarkMode ? "border-gray-700" : "border-gray-200"
                }`}
              >
                {isAuthenticated() ? (
                  <>
                    <div className="px-3 py-2">
                      <div
                        className={`text-base font-medium ${
                          isDarkMode ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {currentUser.name}
                      </div>
                      <div
                        className={`text-sm ${
                          isDarkMode ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        {currentUser.email}
                      </div>
                    </div>
                    <ScrollLink
                      to="/profile"
                      className={`block px-3 py-2 rounded-md text-base font-medium ${
                        isDarkMode
                          ? "text-gray-300 hover:bg-gray-700"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Your Profile
                    </ScrollLink>
                    <ScrollLink
                      to="/orders"
                      className={`block px-3 py-2 rounded-md text-base font-medium ${
                        isDarkMode
                          ? "text-gray-300 hover:bg-gray-700"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Orders
                    </ScrollLink>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                      className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                        isDarkMode
                          ? "text-gray-300 hover:bg-gray-700"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      Sign out
                    </button>
                  </>
                ) : (
                  <div className="flex flex-col space-y-2 px-3">
                    <ScrollLink
                      to="/login"
                      className={`px-3 py-2 rounded-md text-center font-medium ${
                        isDarkMode
                          ? "text-indigo-400 hover:bg-gray-700"
                          : "text-indigo-600 hover:bg-gray-100"
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign in
                    </ScrollLink>
                    <ScrollLink
                      to="/register"
                      className={`px-3 py-2 rounded-md text-center font-medium ${
                        isDarkMode
                          ? "bg-indigo-600 hover:bg-indigo-500 text-white"
                          : "bg-indigo-500 hover:bg-indigo-600 text-white"
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign up
                    </ScrollLink>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
