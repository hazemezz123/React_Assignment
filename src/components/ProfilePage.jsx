import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { motion } from "framer-motion";

const ProfilePage = () => {
  const { currentUser, logout, isAuthenticated } = useAuth();
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    // Redirect if not authenticated
    if (!isAuthenticated()) {
      navigate("/login");
      return;
    }

    // Load user data
    if (currentUser) {
      setFormData({
        name: currentUser.name || "",
        email: currentUser.email || "",
        phone: localStorage.getItem("userPhone") || "",
        address: localStorage.getItem("userAddress") || "",
      });
    }
  }, [currentUser, isAuthenticated, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // In a real app, we would make an API call to update the user profile
    // For this demo, we'll just store the additional info in localStorage
    localStorage.setItem("userPhone", formData.phone);
    localStorage.setItem("userAddress", formData.address);

    setMessage({
      type: "success",
      text: "Profile updated successfully!",
    });

    setTimeout(() => {
      setMessage({ type: "", text: "" });
    }, 3000);

    setIsEditing(false);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  };

  return (
    <div
      className={`min-h-screen py-12 px-4 sm:px-6 ${
        isDarkMode ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      <motion.div
        className="max-w-3xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className={`${
            isDarkMode ? "bg-gray-800" : "bg-white"
          } rounded-xl shadow-lg overflow-hidden p-6 sm:p-8`}
          variants={itemVariants}
        >
          <div className="flex justify-between items-center mb-8">
            <h1
              className={`text-2xl font-bold ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              My Profile
            </h1>
            <button
              onClick={handleLogout}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                isDarkMode
                  ? "bg-red-600 hover:bg-red-700 text-white"
                  : "bg-red-500 hover:bg-red-600 text-white"
              }`}
            >
              Sign Out
            </button>
          </div>

          {message.text && (
            <div
              className={`mb-6 p-4 rounded-lg ${
                message.type === "success"
                  ? "bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                  : "bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300"
              }`}
            >
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div>
                <div
                  className={`flex items-center justify-between mb-2 ${
                    isDarkMode ? "text-gray-200" : "text-gray-700"
                  }`}
                >
                  <label htmlFor="name" className="block text-sm font-medium">
                    Full Name
                  </label>
                  {!isEditing && (
                    <button
                      type="button"
                      className={`text-sm font-medium ${
                        isDarkMode
                          ? "text-indigo-400 hover:text-indigo-300"
                          : "text-indigo-600 hover:text-indigo-500"
                      }`}
                      onClick={() => setIsEditing(true)}
                    >
                      Edit Profile
                    </button>
                  )}
                </div>
                {isEditing ? (
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    className={`block w-full px-4 py-2 rounded-lg ${
                      isDarkMode
                        ? "bg-gray-700 border-gray-600 text-white"
                        : "bg-white border-gray-300 text-gray-900"
                    } border focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                    placeholder="Your full name"
                  />
                ) : (
                  <p
                    className={`px-4 py-2 rounded-lg ${
                      isDarkMode
                        ? "bg-gray-700 text-gray-200"
                        : "bg-gray-50 text-gray-800"
                    }`}
                  >
                    {formData.name || "Not provided"}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className={`block text-sm font-medium mb-2 ${
                    isDarkMode ? "text-gray-200" : "text-gray-700"
                  }`}
                >
                  Email Address
                </label>
                {isEditing ? (
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled
                    className={`block w-full px-4 py-2 rounded-lg ${
                      isDarkMode
                        ? "bg-gray-700 border-gray-600 text-gray-400"
                        : "bg-gray-100 border-gray-300 text-gray-500"
                    } border focus:outline-none cursor-not-allowed`}
                    placeholder="Your email address"
                  />
                ) : (
                  <p
                    className={`px-4 py-2 rounded-lg ${
                      isDarkMode
                        ? "bg-gray-700 text-gray-200"
                        : "bg-gray-50 text-gray-800"
                    }`}
                  >
                    {formData.email || "Not provided"}
                  </p>
                )}
                {isEditing && (
                  <p
                    className={`mt-1 text-xs ${
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    Email cannot be changed
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className={`block text-sm font-medium mb-2 ${
                    isDarkMode ? "text-gray-200" : "text-gray-700"
                  }`}
                >
                  Phone Number
                </label>
                {isEditing ? (
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`block w-full px-4 py-2 rounded-lg ${
                      isDarkMode
                        ? "bg-gray-700 border-gray-600 text-white"
                        : "bg-white border-gray-300 text-gray-900"
                    } border focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                    placeholder="Your phone number"
                  />
                ) : (
                  <p
                    className={`px-4 py-2 rounded-lg ${
                      isDarkMode
                        ? "bg-gray-700 text-gray-200"
                        : "bg-gray-50 text-gray-800"
                    }`}
                  >
                    {formData.phone || "Not provided"}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="address"
                  className={`block text-sm font-medium mb-2 ${
                    isDarkMode ? "text-gray-200" : "text-gray-700"
                  }`}
                >
                  Shipping Address
                </label>
                {isEditing ? (
                  <textarea
                    id="address"
                    name="address"
                    rows="3"
                    value={formData.address}
                    onChange={handleChange}
                    className={`block w-full px-4 py-2 rounded-lg ${
                      isDarkMode
                        ? "bg-gray-700 border-gray-600 text-white"
                        : "bg-white border-gray-300 text-gray-900"
                    } border focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                    placeholder="Your shipping address"
                  />
                ) : (
                  <p
                    className={`px-4 py-2 rounded-lg ${
                      isDarkMode
                        ? "bg-gray-700 text-gray-200"
                        : "bg-gray-50 text-gray-800"
                    }`}
                  >
                    {formData.address || "Not provided"}
                  </p>
                )}
              </div>

              {isEditing && (
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium ${
                      isDarkMode
                        ? "bg-gray-700 hover:bg-gray-600 text-white"
                        : "bg-gray-200 hover:bg-gray-300 text-gray-800"
                    }`}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium"
                  >
                    Save Changes
                  </button>
                </div>
              )}
            </div>
          </form>
        </motion.div>

        <motion.div
          className={`mt-8 ${
            isDarkMode ? "bg-gray-800" : "bg-white"
          } rounded-xl shadow-lg overflow-hidden p-6 sm:p-8`}
          variants={itemVariants}
        >
          <h2
            className={`text-xl font-bold mb-6 ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Account Security
          </h2>

          <div className="space-y-4">
            <div>
              <button
                className={`text-sm font-medium ${
                  isDarkMode
                    ? "text-indigo-400 hover:text-indigo-300"
                    : "text-indigo-600 hover:text-indigo-500"
                }`}
              >
                Change Password
              </button>
            </div>

            <div>
              <button
                className={`text-sm font-medium ${
                  isDarkMode
                    ? "text-indigo-400 hover:text-indigo-300"
                    : "text-indigo-600 hover:text-indigo-500"
                }`}
              >
                Enable Two-Factor Authentication
              </button>
            </div>

            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <button
                className={`text-sm font-medium ${
                  isDarkMode
                    ? "text-red-400 hover:text-red-300"
                    : "text-red-600 hover:text-red-500"
                }`}
              >
                Delete Account
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ProfilePage;
