import { useCart } from "../context/CartContext";
import { useTheme } from "../context/ThemeContext";
import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const WishlistPage = () => {
  const { wishlist, removeFromWishlist, addToCart } = useCart();
  const { isDarkMode } = useTheme();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 10 },
    },
  };

  if (wishlist.length === 0) {
    return (
      <div
        className={`min-h-screen ${
          isDarkMode ? "bg-gray-900" : "bg-gray-50"
        } py-12 px-4 sm:px-6 transition-colors duration-300`}
      >
        <motion.div
          className={`max-w-4xl mx-auto ${
            isDarkMode ? "bg-gray-800" : "bg-white"
          } rounded-xl shadow-xl p-8 border ${
            isDarkMode ? "border-gray-700" : "border-gray-200"
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center">
            <motion.svg
              className={`w-20 h-20 ${
                isDarkMode ? "text-gray-500" : "text-gray-400"
              } mx-auto mb-6`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </motion.svg>
            <motion.h2
              className={`text-3xl font-bold ${
                isDarkMode ? "text-white" : "text-gray-800"
              } mb-4`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Your Wishlist is Empty
            </motion.h2>
            <motion.p
              className={`${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              } mb-8`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              You haven't added any products to your wishlist yet.
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/"
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors inline-block"
              >
                Explore Products
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen ${
        isDarkMode ? "bg-gray-900" : "bg-gray-50"
      } py-12 px-4 sm:px-6 transition-colors duration-300`}
    >
      <div className="max-w-6xl mx-auto">
        <motion.h1
          className={`text-3xl font-bold mb-8 ${
            isDarkMode ? "text-white" : "text-gray-800"
          }`}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Your Wishlist
        </motion.h1>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {wishlist.map((product) => (
            <motion.div
              key={product.id}
              className={`${
                isDarkMode
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-200"
              } rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border flex flex-col hover-lift`}
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              <div
                className={`h-56 flex items-center justify-center ${
                  isDarkMode ? "bg-gray-850" : "bg-gray-50"
                } p-6 relative`}
              >
                <div
                  className={`absolute inset-0 ${
                    isDarkMode
                      ? "bg-gradient-to-b from-gray-800 to-gray-900"
                      : "bg-gradient-to-b from-gray-50 to-white"
                  } opacity-90`}
                ></div>
                <motion.img
                  src={product.image}
                  alt={product.title}
                  className="h-full object-contain relative z-10"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
                />
                <motion.button
                  onClick={() => removeFromWishlist(product.id)}
                  className={`absolute top-2 right-2 z-20 ${
                    isDarkMode ? "bg-gray-700" : "bg-gray-100"
                  } p-2 rounded-full hover:bg-red-600 transition-colors`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-5 h-5 text-red-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </motion.button>
              </div>
              <div
                className={`p-5 flex flex-col flex-grow border-t ${
                  isDarkMode ? "border-gray-700" : "border-gray-200"
                }`}
              >
                <h2
                  className={`text-lg font-bold mb-2 ${
                    isDarkMode ? "text-white" : "text-gray-800"
                  } line-clamp-2 h-14`}
                >
                  {product.title}
                </h2>
                <p
                  className={`${
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  } mb-4 line-clamp-3 text-sm flex-grow`}
                >
                  {product.description}
                </p>
                <div className="flex justify-between items-center mt-auto">
                  <span
                    className={`text-xl font-bold ${
                      isDarkMode ? "text-indigo-400" : "text-indigo-600"
                    }`}
                  >
                    ${product.price.toFixed(2)}
                  </span>
                  <span
                    className={`px-3 py-1 ${
                      isDarkMode
                        ? "bg-gray-700 text-gray-300"
                        : "bg-gray-100 text-gray-600"
                    } text-sm rounded-full font-medium`}
                  >
                    {product.category}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3 mt-4">
                  <motion.div whileTap={{ scale: 0.95 }}>
                    <Link
                      to={`/product/${product.id}`}
                      className="block bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-medium transition-colors text-center"
                    >
                      Details
                    </Link>
                  </motion.div>
                  <motion.button
                    onClick={() => addToCart(product)}
                    className="bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium transition-colors"
                    whileTap={{ scale: 0.95 }}
                  >
                    Add to Cart
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default WishlistPage;
