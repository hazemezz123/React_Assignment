import { useCart } from "../context/CartContext";
import { useTheme } from "../context/ThemeContext";
import { Link } from "react-router-dom";
import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const CartPage = () => {
  const { cart, removeFromCart, updateCartQuantity, cartTotal, clearCart } =
    useCart();
  const { isDarkMode } = useTheme();
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

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

  const handleCheckout = () => {
    // Simulate a checkout process
    clearCart();
    setCheckoutSuccess(true);
    // In a real app, you would send the order to a backend here
  };

  if (checkoutSuccess) {
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
              className="w-20 h-20 text-green-500 mx-auto mb-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
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
              Order Successful!
            </motion.h2>
            <motion.p
              className={`${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              } mb-8`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Thank you for your purchase. Your order has been placed
              successfully.
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
                Continue Shopping
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    );
  }

  if (cart.length === 0) {
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
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
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
              Your Cart is Empty
            </motion.h2>
            <motion.p
              className={`${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              } mb-8`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Looks like you haven't added any products to your cart yet.
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
                Start Shopping
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
      <motion.div
        className="max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className={`text-3xl font-bold mb-8 ${
            isDarkMode ? "text-white" : "text-gray-800"
          }`}
          variants={itemVariants}
        >
          Your Cart
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div className="lg:col-span-2" variants={itemVariants}>
            <div
              className={`${
                isDarkMode ? "bg-gray-800" : "bg-white"
              } rounded-xl shadow-lg overflow-hidden border ${
                isDarkMode ? "border-gray-700" : "border-gray-200"
              }`}
            >
              <div className="p-6">
                {cart.map((item, index) => (
                  <motion.div
                    key={item.id}
                    className={`flex flex-col sm:flex-row items-start sm:items-center py-6 border-b ${
                      isDarkMode ? "border-gray-700" : "border-gray-200"
                    }`}
                    variants={itemVariants}
                    custom={index}
                  >
                    <div
                      className={`sm:w-24 h-24 flex-shrink-0 ${
                        isDarkMode ? "bg-gray-700" : "bg-gray-100"
                      } rounded-lg p-2 mb-4 sm:mb-0 relative`}
                    >
                      <div
                        className={`absolute inset-0 ${
                          isDarkMode
                            ? "bg-gradient-to-b from-gray-700 to-gray-800"
                            : "bg-gradient-to-b from-gray-100 to-white"
                        } opacity-90 rounded-lg`}
                      ></div>
                      <motion.img
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-contain relative z-10"
                        whileHover={{ scale: 1.1 }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 10,
                        }}
                      />
                    </div>
                    <div className="sm:ml-6 flex-1">
                      <div className="flex flex-col sm:flex-row sm:justify-between">
                        <Link
                          to={`/product/${item.id}`}
                          className={`text-lg font-medium ${
                            isDarkMode
                              ? "text-white hover:text-indigo-400"
                              : "text-gray-800 hover:text-indigo-600"
                          } mb-2 sm:mb-0`}
                        >
                          {item.title}
                        </Link>
                        <span
                          className={`${
                            isDarkMode ? "text-indigo-400" : "text-indigo-600"
                          } font-bold`}
                        >
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                      <div
                        className={`${
                          isDarkMode ? "text-gray-400" : "text-gray-500"
                        } mb-4 text-sm`}
                      >
                        {item.category}
                      </div>
                      <div className="flex items-center justify-between">
                        <div
                          className={`flex items-center border ${
                            isDarkMode ? "border-gray-600" : "border-gray-300"
                          } rounded-lg`}
                        >
                          <motion.button
                            onClick={() =>
                              updateCartQuantity(item.id, item.quantity - 1)
                            }
                            className={`px-3 py-1 ${
                              isDarkMode
                                ? "text-white hover:bg-gray-700"
                                : "text-gray-800 hover:bg-gray-100"
                            }`}
                            whileTap={{ scale: 0.9 }}
                          >
                            -
                          </motion.button>
                          <span
                            className={`px-3 py-1 ${
                              isDarkMode ? "text-white" : "text-gray-800"
                            }`}
                          >
                            {item.quantity}
                          </span>
                          <motion.button
                            onClick={() =>
                              updateCartQuantity(item.id, item.quantity + 1)
                            }
                            className={`px-3 py-1 ${
                              isDarkMode
                                ? "text-white hover:bg-gray-700"
                                : "text-gray-800 hover:bg-gray-100"
                            }`}
                            whileTap={{ scale: 0.9 }}
                          >
                            +
                          </motion.button>
                        </div>
                        <motion.button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-400 hover:text-red-500"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <div
              className={`${
                isDarkMode ? "bg-gray-800" : "bg-white"
              } rounded-xl shadow-lg p-6 sticky top-6 border ${
                isDarkMode ? "border-gray-700" : "border-gray-200"
              }`}
            >
              <h2
                className={`text-xl font-bold ${
                  isDarkMode ? "text-white" : "text-gray-800"
                } mb-6`}
              >
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-300">
                  <span
                    className={`${
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    Subtotal
                  </span>
                  <span
                    className={`${
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    ${cartTotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span
                    className={`${
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    Shipping
                  </span>
                  <span
                    className={`${
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    Free
                  </span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span
                    className={`${
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    Tax
                  </span>
                  <span
                    className={`${
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    ${(cartTotal * 0.1).toFixed(2)}
                  </span>
                </div>
                <div
                  className={`border-t ${
                    isDarkMode ? "border-gray-700" : "border-gray-200"
                  } pt-4 flex justify-between ${
                    isDarkMode ? "text-white" : "text-gray-800"
                  } font-bold`}
                >
                  <span>Total</span>
                  <span>${(cartTotal + cartTotal * 0.1).toFixed(2)}</span>
                </div>
              </div>

              <motion.button
                onClick={handleCheckout}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 rounded-lg font-medium transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Checkout
              </motion.button>

              <div className="mt-6">
                <motion.div
                  whileHover={{ x: -5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
                >
                  <Link
                    to="/"
                    className={`${
                      isDarkMode
                        ? "text-indigo-400 hover:text-indigo-300"
                        : "text-indigo-600 hover:text-indigo-500"
                    } flex items-center justify-center`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Continue Shopping
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default CartPage;
