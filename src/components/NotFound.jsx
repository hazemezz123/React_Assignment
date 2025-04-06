import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

const NotFound = () => {
  const { isDarkMode } = useTheme();

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center text-center p-4 ${
        isDarkMode ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md"
      >
        <motion.h1
          className={`text-5xl font-bold mb-4 ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        >
          404
        </motion.h1>

        <motion.h2
          className={`text-2xl font-semibold mb-6 ${
            isDarkMode ? "text-gray-200" : "text-gray-800"
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Page Not Found
        </motion.h2>

        <motion.p
          className={`${isDarkMode ? "text-gray-300" : "text-gray-600"} mb-8`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          The page you are looking for doesn't exist or has been moved.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <Link
            to="/"
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium transition-colors"
          >
            Go Home
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFound;
