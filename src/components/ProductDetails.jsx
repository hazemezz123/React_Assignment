import { useParams, Link } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import { useCart } from "../context/CartContext";
import { useTheme } from "../context/ThemeContext";
import { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const ProductDetails = () => {
  const { id } = useParams();
  // eslint-disable-next-line no-unused-vars
  const { products } = useProducts();
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const { isDarkMode } = useTheme();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        console.log(`Fetching product with id: ${id}`);

        // Always try direct API fetch for most reliable data
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!response.ok) {
          throw new Error(
            `Failed to fetch product with status: ${response.status}`
          );
        }

        const data = await response.json();
        console.log("Product data from API:", data);

        if (!data || Object.keys(data).length === 0) {
          throw new Error("Received empty product data");
        }

        setProduct(data);
        setError(null);
      } catch (error) {
        console.error("Error fetching product details:", error);
        setError(error.message);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        addToCart(product);
      }
      alert(`Added ${quantity} of ${product.title} to cart`);
    }
  };

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () =>
    quantity > 1 && setQuantity((prev) => prev - 1);

  if (loading) {
    return (
      <div
        className={`min-h-screen flex justify-center items-center ${
          isDarkMode ? "bg-gray-900" : "bg-gray-50"
        }`}
      >
        <div
          className={`w-16 h-16 border-4 border-t-4 border-blue-500 rounded-full animate-spin`}
        ></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div
        className={`min-h-screen flex flex-col items-center justify-center p-4 ${
          isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-800"
        }`}
      >
        <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
        <p className="mb-6">
          {error ||
            "The product you're looking for doesn't exist or has been removed."}
        </p>
        <Link
          to="/"
          className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen ${
        isDarkMode ? "bg-gray-900" : "bg-gray-50"
      } py-8 px-4`}
    >
      <div className="max-w-6xl mx-auto">
        <Link
          to="/"
          className={`inline-flex items-center mb-8 ${
            isDarkMode ? "text-indigo-400" : "text-indigo-600"
          }`}
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
          Back to Products
        </Link>

        <div
          className={`${
            isDarkMode ? "bg-gray-800" : "bg-white"
          } rounded-xl shadow-xl overflow-hidden border ${
            isDarkMode ? "border-gray-700" : "border-gray-200"
          }`}
        >
          <div className="md:flex">
            <div className="md:w-1/2 p-8 flex items-center justify-center">
              <div className="relative">
                <div
                  className={`absolute inset-0 ${
                    isDarkMode
                      ? "bg-gradient-to-br from-gray-700 to-gray-900"
                      : "bg-gradient-to-br from-gray-50 to-white"
                  } rounded-lg`}
                ></div>
                <img
                  src={product.image}
                  alt={product.title}
                  className="relative z-10 max-h-80 object-contain"
                  onError={(e) => {
                    console.log("Image failed to load, using placeholder");
                    e.target.src =
                      "https://via.placeholder.com/400?text=Image+Not+Found";
                  }}
                />
              </div>
            </div>

            <div className="md:w-1/2 p-8">
              <div
                className={`uppercase tracking-wide text-sm ${
                  isDarkMode ? "text-indigo-400" : "text-indigo-600"
                } font-semibold`}
              >
                {product.category}
              </div>

              <h1
                className={`mt-2 text-3xl font-bold ${
                  isDarkMode ? "text-white" : "text-gray-800"
                }`}
              >
                {product.title}
              </h1>

              <div className="mt-4">
                <span
                  className={`text-3xl font-bold ${
                    isDarkMode ? "text-indigo-400" : "text-indigo-600"
                  }`}
                >
                  $
                  {typeof product.price === "number"
                    ? product.price.toFixed(2)
                    : "0.00"}
                </span>

                {product.rating && (
                  <div className="mt-2 flex items-center">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`h-5 w-5 ${
                            i < Math.round(product.rating.rate || 0)
                              ? "text-yellow-500"
                              : isDarkMode
                              ? "text-gray-500"
                              : "text-gray-300"
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span
                      className={`ml-2 ${
                        isDarkMode ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      {product.rating.rate || "0"} out of 5 (
                      {product.rating.count || 0} reviews)
                    </span>
                  </div>
                )}
              </div>

              <div
                className={`mt-6 border-t ${
                  isDarkMode ? "border-gray-700" : "border-gray-200"
                } pt-6`}
              >
                <h2
                  className={`text-xl font-bold ${
                    isDarkMode ? "text-white" : "text-gray-800"
                  } mb-4`}
                >
                  Description
                </h2>
                <p
                  className={`${
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  } leading-relaxed`}
                >
                  {product.description}
                </p>
              </div>

              <div className="mt-8">
                <div className="flex items-center mb-4">
                  <span
                    className={`${
                      isDarkMode ? "text-white" : "text-gray-800"
                    } mr-4`}
                  >
                    Quantity:
                  </span>
                  <div
                    className={`flex items-center border ${
                      isDarkMode ? "border-gray-600" : "border-gray-300"
                    } rounded-lg`}
                  >
                    <button
                      onClick={decrementQuantity}
                      className={`px-3 py-1 ${
                        isDarkMode
                          ? "text-white hover:bg-gray-700"
                          : "text-gray-800 hover:bg-gray-100"
                      } focus:outline-none`}
                    >
                      -
                    </button>
                    <span
                      className={`px-3 py-1 ${
                        isDarkMode ? "text-white" : "text-gray-800"
                      }`}
                    >
                      {quantity}
                    </span>
                    <button
                      onClick={incrementQuantity}
                      className={`px-3 py-1 ${
                        isDarkMode
                          ? "text-white hover:bg-gray-700"
                          : "text-gray-800 hover:bg-gray-100"
                      } focus:outline-none`}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-4 space-y-4">
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                  </svg>
                  Add to Cart
                </button>

                <button
                  onClick={() => toggleWishlist(product)}
                  className={`w-full bg-transparent border ${
                    isDarkMode
                      ? "border-indigo-600 text-indigo-400 hover:bg-indigo-800"
                      : "border-indigo-500 text-indigo-600 hover:bg-indigo-50"
                  } py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill={isInWishlist(product.id) ? "currentColor" : "none"}
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
                  {isInWishlist(product.id)
                    ? "Remove from Wishlist"
                    : "Add to Wishlist"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
