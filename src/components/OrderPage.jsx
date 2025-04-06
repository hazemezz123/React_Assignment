import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { motion } from "framer-motion";

const OrderPage = () => {
  const { isAuthenticated } = useAuth();
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Redirect if not authenticated
    if (!isAuthenticated()) {
      navigate("/login");
      return;
    }

    // In a real app, we would fetch orders from an API
    // For this demo, let's create some sample orders
    const sampleOrders = [
      {
        id: "ORD-001-2023",
        date: "2023-05-15",
        total: 129.99,
        status: "Delivered",
        items: [
          {
            id: 1,
            name: "Men's Casual Shirt",
            price: 49.99,
            quantity: 1,
            image: "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg",
          },
          {
            id: 2,
            name: "Women's Jacket",
            price: 80.0,
            quantity: 1,
            image: "https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg",
          },
        ],
      },
      {
        id: "ORD-002-2023",
        date: "2023-06-20",
        total: 59.99,
        status: "Processing",
        items: [
          {
            id: 3,
            name: "Mens Cotton Jacket",
            price: 59.99,
            quantity: 1,
            image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
          },
        ],
      },
      {
        id: "ORD-003-2023",
        date: "2023-07-05",
        total: 114.97,
        status: "Shipped",
        items: [
          {
            id: 4,
            name: "Fjallraven - Foldsack",
            price: 109.95,
            quantity: 1,
            image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
          },
          {
            id: 5,
            name: "SanDisk SSD",
            price: 114.0,
            quantity: 1,
            image: "https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg",
          },
          {
            id: 6,
            name: "Silicon Power 256GB SSD",
            price: 109.0,
            quantity: 1,
            image: "https://fakestoreapi.com/img/71kWymZ+c+L._AC_SX679_.jpg",
          },
        ],
      },
    ];

    setTimeout(() => {
      setOrders(sampleOrders);
      setLoading(false);
    }, 800); // Simulate API delay
  }, [isAuthenticated, navigate]);

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

  // Helper for displaying order status with proper color
  const getStatusColor = (status) => {
    if (isDarkMode) {
      switch (status) {
        case "Delivered":
          return "text-green-400";
        case "Shipped":
          return "text-blue-400";
        case "Processing":
          return "text-yellow-400";
        case "Cancelled":
          return "text-red-400";
        default:
          return "text-gray-400";
      }
    } else {
      switch (status) {
        case "Delivered":
          return "text-green-600";
        case "Shipped":
          return "text-blue-600";
        case "Processing":
          return "text-yellow-600";
        case "Cancelled":
          return "text-red-600";
        default:
          return "text-gray-600";
      }
    }
  };

  return (
    <div
      className={`min-h-screen py-8 px-4 sm:px-6 ${
        isDarkMode ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      <motion.div
        className="max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <h1
            className={`text-2xl font-bold mb-6 ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            My Orders
          </h1>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="spinner"></div>
          </div>
        ) : orders.length > 0 ? (
          <div className="space-y-6">
            {orders.map((order) => (
              <motion.div
                key={order.id}
                className={`${
                  isDarkMode ? "bg-gray-800" : "bg-white"
                } rounded-xl shadow-md overflow-hidden`}
                variants={itemVariants}
              >
                <div
                  className={`px-6 py-4 border-b ${
                    isDarkMode ? "border-gray-700" : "border-gray-200"
                  }`}
                >
                  <div className="flex flex-wrap justify-between items-center">
                    <div>
                      <h2
                        className={`text-lg font-medium ${
                          isDarkMode ? "text-white" : "text-gray-900"
                        }`}
                      >
                        Order #{order.id}
                      </h2>
                      <p
                        className={`text-sm ${
                          isDarkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        Placed on {new Date(order.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center mt-2 sm:mt-0">
                      <span
                        className={`text-sm font-medium ${getStatusColor(
                          order.status
                        )} mr-4`}
                      >
                        {order.status}
                      </span>
                      <span
                        className={`text-sm font-bold ${
                          isDarkMode ? "text-white" : "text-gray-900"
                        }`}
                      >
                        Total: ${order.total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex p-4">
                      <div className="flex-shrink-0 w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="ml-4 flex-1">
                        <div className="flex justify-between">
                          <div>
                            <h3
                              className={`text-base font-medium ${
                                isDarkMode ? "text-white" : "text-gray-900"
                              }`}
                            >
                              {item.name}
                            </h3>
                            <p
                              className={`mt-1 text-sm ${
                                isDarkMode ? "text-gray-400" : "text-gray-600"
                              }`}
                            >
                              Qty: {item.quantity}
                            </p>
                          </div>
                          <p
                            className={`text-sm font-medium ${
                              isDarkMode ? "text-white" : "text-gray-900"
                            }`}
                          >
                            ${item.price.toFixed(2)}
                          </p>
                        </div>

                        <div className="mt-4 flex space-x-4">
                          <Link
                            to={`/product/${item.id}`}
                            className={`text-xs font-medium ${
                              isDarkMode
                                ? "text-indigo-400 hover:text-indigo-300"
                                : "text-indigo-600 hover:text-indigo-500"
                            }`}
                          >
                            View Product
                          </Link>
                          <button
                            className={`text-xs font-medium ${
                              isDarkMode
                                ? "text-indigo-400 hover:text-indigo-300"
                                : "text-indigo-600 hover:text-indigo-500"
                            }`}
                          >
                            Buy Again
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div
                  className={`px-6 py-4 ${
                    isDarkMode ? "bg-gray-750" : "bg-gray-50"
                  } flex justify-between`}
                >
                  <button
                    className={`text-sm font-medium ${
                      isDarkMode
                        ? "text-white hover:text-gray-300"
                        : "text-gray-700 hover:text-gray-900"
                    }`}
                  >
                    Track Order
                  </button>
                  <button
                    className={`text-sm font-medium ${
                      isDarkMode
                        ? "text-white hover:text-gray-300"
                        : "text-gray-700 hover:text-gray-900"
                    }`}
                  >
                    Need Help?
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            className={`text-center py-16 ${
              isDarkMode ? "bg-gray-800" : "bg-white"
            } rounded-xl shadow-md`}
            variants={itemVariants}
          >
            <h2
              className={`text-xl font-medium mb-2 ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              No orders yet
            </h2>
            <p
              className={`text-sm mb-6 ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              When you place your first order, it will appear here.
            </p>
            <Link
              to="/"
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium"
            >
              Start Shopping
            </Link>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default OrderPage;
