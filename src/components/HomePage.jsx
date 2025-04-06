import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { motion } from "framer-motion";

const HomePage = () => {
  const { isDarkMode } = useTheme();
  const [featured, setFeatured] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch featured products (limiting to 4)
        const productsResponse = await fetch(
          "https://fakestoreapi.com/products?limit=4"
        );
        const productsData = await productsResponse.json();
        setFeatured(productsData);

        // Fetch categories
        const categoriesResponse = await fetch(
          "https://fakestoreapi.com/products/categories"
        );
        const categoriesData = await categoriesResponse.json();
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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

  const heroVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.3,
      },
    },
  };

  const heroItemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 60,
        damping: 15,
      },
    },
  };

  return (
    <div
      className={`min-h-screen ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-800"
      } transition-colors duration-300`}
    >
      {/* Hero Section */}
      <motion.section
        className="relative"
        variants={heroVariants}
        initial="hidden"
        animate="visible"
      >
        <div
          className={`${
            isDarkMode
              ? "bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900"
              : "bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50"
          }`}
        >
          <div className="container mx-auto px-4 py-32">
            <div className="max-w-3xl">
              <motion.h1
                className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 ${
                  isDarkMode
                    ? "text-gradient bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-600"
                    : "text-gradient bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-700"
                }`}
                variants={heroItemVariants}
              >
                Discover Amazing Products For Your Lifestyle
              </motion.h1>
              <motion.p
                className={`text-xl ${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                } mb-8`}
                variants={heroItemVariants}
              >
                Shop the latest trends with our curated collection of
                high-quality products
              </motion.p>
              <motion.div
                className="flex flex-wrap gap-4"
                variants={heroItemVariants}
              >
                <Link
                  to="/products"
                  className={`px-8 py-3 ${
                    isDarkMode
                      ? "bg-indigo-600 hover:bg-indigo-700"
                      : "bg-indigo-600 hover:bg-indigo-700"
                  } rounded-lg text-white font-medium transition-colors duration-300`}
                >
                  Shop Now
                </Link>
                <Link
                  to="/wishlist"
                  className={`px-8 py-3 ${
                    isDarkMode
                      ? "bg-gray-800 border border-gray-600 hover:bg-gray-700"
                      : "bg-white border border-gray-300 hover:bg-gray-100 text-gray-800"
                  } rounded-lg font-medium transition-colors duration-300`}
                >
                  View Wishlist
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-full h-full overflow-hidden z-[-1] opacity-20">
          <svg
            className="absolute right-0 top-0 h-full"
            viewBox="0 0 500 500"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop
                  offset="0%"
                  stopColor={isDarkMode ? "#6366F1" : "#4F46E5"}
                />
                <stop
                  offset="100%"
                  stopColor={isDarkMode ? "#A855F7" : "#7E22CE"}
                />
              </linearGradient>
            </defs>
            <motion.path
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
              d="M370.5,59.5 C418.5,89.5 400,135 427.5,212.5 C455,290 494.5,306 485.5,367.5 C476.5,429 401.5,427.5 344.5,454.5 C287.5,481.5 155.5,518.5 93,485.5 C30.5,452.5 20,365 19,314.5 C18,264 18.5,222 56,132.5 C93.5,43 193,12.5 253,13 C313,13.5 322.5,29.5 370.5,59.5 Z"
              fill="url(#gradient)"
            />
          </svg>
        </div>
      </motion.section>

      {/* Featured Products */}
      <section className={`py-16 ${isDarkMode ? "bg-gray-900" : "bg-white"}`}>
        <div className="container mx-auto px-4">
          <motion.h2
            className={`text-3xl font-bold mb-12 text-center ${
              isDarkMode ? "text-white" : "text-gray-800"
            }`}
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Featured Products
          </motion.h2>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <motion.div
                className="spinner"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              />
            </div>
          ) : (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {featured.map((product) => (
                <motion.div
                  key={product.id}
                  className={`${
                    isDarkMode
                      ? "bg-gray-800 hover:shadow-xl"
                      : "bg-white hover:shadow-xl border border-gray-200"
                  } rounded-xl overflow-hidden shadow-lg transition-shadow duration-300 flex flex-col hover-lift`}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                >
                  <div
                    className={`h-56 p-4 ${
                      isDarkMode ? "bg-gray-850" : "bg-gray-50"
                    } flex items-center justify-center relative`}
                  >
                    <div
                      className={`absolute inset-0 ${
                        isDarkMode
                          ? "bg-gradient-to-b from-gray-800 to-gray-900"
                          : "bg-gradient-to-b from-gray-50 to-white"
                      } opacity-90 rounded-t-xl`}
                    ></div>
                    <motion.img
                      src={product.image}
                      alt={product.title}
                      className="h-full object-contain z-10"
                      whileHover={{ scale: 1.05 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 10,
                      }}
                    />
                  </div>
                  <div className="p-5 flex flex-col flex-grow">
                    <h3
                      className={`text-lg font-semibold mb-2 line-clamp-1 ${
                        isDarkMode ? "text-white" : "text-gray-800"
                      }`}
                    >
                      {product.title}
                    </h3>
                    <div className="flex justify-between items-center mt-auto pt-4">
                      <span
                        className={`text-xl font-bold ${
                          isDarkMode ? "text-indigo-400" : "text-indigo-600"
                        }`}
                      >
                        ${product.price.toFixed(2)}
                      </span>
                      <motion.div whileTap={{ scale: 0.95 }}>
                        <Link
                          to={`/product/${product.id}`}
                          className="px-4 py-2 bg-indigo-600 rounded-lg text-white font-medium text-sm hover:bg-indigo-700 transition-colors"
                        >
                          View Details
                        </Link>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <Link
              to="/products"
              className={`px-6 py-3 ${
                isDarkMode
                  ? "bg-gray-800 border border-gray-600 hover:bg-gray-700"
                  : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-100"
              } rounded-lg font-medium transition-colors`}
            >
              View All Products
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className={`py-16 ${isDarkMode ? "bg-gray-800" : "bg-gray-50"}`}>
        <div className="container mx-auto px-4">
          <motion.h2
            className={`text-3xl font-bold mb-12 text-center ${
              isDarkMode ? "text-white" : "text-gray-800"
            }`}
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Shop by Category
          </motion.h2>

          {loading ? (
            <div className="flex justify-center items-center h-32">
              <motion.div
                className="spinner"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              />
            </div>
          ) : (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {categories.map((category, index) => (
                <motion.div
                  key={index}
                  className={`${
                    isDarkMode
                      ? "bg-gray-700"
                      : "bg-white border border-gray-200"
                  } rounded-xl overflow-hidden shadow-lg cursor-pointer relative h-48 hover-lift`}
                  variants={itemVariants}
                  whileHover={{ scale: 1.03 }}
                >
                  <div
                    className={`absolute inset-0 ${
                      isDarkMode
                        ? "bg-gradient-to-tr from-indigo-800/60 to-gray-900/60"
                        : "bg-gradient-to-tr from-indigo-500/20 to-purple-500/20"
                    }`}
                  ></div>
                  <div className="absolute inset-0 flex flex-col justify-center items-center p-6 text-center">
                    <h3
                      className={`text-xl font-bold mb-3 capitalize ${
                        isDarkMode ? "text-white" : "text-gray-800"
                      }`}
                    >
                      {category}
                    </h3>
                    <motion.div whileTap={{ scale: 0.95 }}>
                      <Link
                        to="/products"
                        className={`px-4 py-2 ${
                          isDarkMode
                            ? "bg-indigo-600/90 hover:bg-indigo-700"
                            : "bg-indigo-600 hover:bg-indigo-700"
                        } rounded-lg text-white font-medium text-sm transition-colors`}
                      >
                        Browse Products
                      </Link>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section
        className={`py-20 ${
          isDarkMode
            ? "bg-gradient-to-r from-indigo-900 to-purple-900"
            : "bg-gradient-to-r from-indigo-600 to-purple-600"
        }`}
      >
        <div className="container mx-auto px-4 text-center">
          <motion.h2
            className="text-3xl font-bold mb-6 text-white"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Join Our Newsletter
          </motion.h2>
          <motion.p
            className="text-xl text-gray-100 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Subscribe to get special offers, free giveaways, and
            once-in-a-lifetime deals.
          </motion.p>
          <motion.div
            className="max-w-md mx-auto flex flex-col sm:flex-row gap-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <input
              type="email"
              placeholder="Your email address"
              className={`px-4 py-3 rounded-lg ${
                isDarkMode
                  ? "bg-gray-700 border-gray-600"
                  : "bg-white/90 border-purple-200"
              } text-white flex-grow focus:outline-none focus:ring-2 focus:ring-indigo-500 border`}
            />
            <motion.button
              className="px-6 py-3 bg-indigo-600 rounded-lg text-white font-medium hover:bg-indigo-700 transition-colors whitespace-nowrap"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Subscribe
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
