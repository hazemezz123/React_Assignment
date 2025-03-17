import { useProducts } from "../context/ProductContext";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

const ProductList = () => {
  const { products, loading, error } = useProducts();
  const { addToCart, toggleWishlist, isInWishlist } = useCart();

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-900">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 bg-gray-900">
      <h1 className="text-4xl font-bold mb-8 text-center text-white">
        Our Products
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-700 flex flex-col"
          >
            <div className="h-56 flex items-center justify-center bg-gray-850 p-6 relative">
              <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-gray-900 opacity-90"></div>
              <img
                src={product.image}
                alt={product.title}
                className="h-full object-contain relative z-10"
              />
              {/* Wishlist button */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  toggleWishlist(product);
                }}
                className="absolute top-2 right-2 z-20 text-gray-300 hover:text-red-500 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill={isInWishlist(product.id) ? "currentColor" : "none"}
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className={`w-6 h-6 ${
                    isInWishlist(product.id) ? "text-red-500" : "text-gray-300"
                  }`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>
            </div>
            <div className="p-5 flex flex-col flex-grow border-t border-gray-700">
              <h2 className="text-lg font-bold mb-2 text-white line-clamp-2 h-14">
                {product.title}
              </h2>
              <p className="text-gray-300 mb-4 line-clamp-3 text-sm flex-grow">
                {product.description}
              </p>
              <div className="flex justify-between items-center mt-auto">
                <span className="text-xl font-bold text-indigo-400">
                  ${product.price.toFixed(2)}
                </span>
                <span className="px-3 py-1 bg-gray-700 text-gray-300 text-sm rounded-full font-medium">
                  {product.category}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3 mt-4">
                <Link
                  to={`/product/${product.id}`}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-medium transition-colors text-center"
                >
                  Details
                </Link>
                <button
                  onClick={() => addToCart(product)}
                  className="bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium transition-colors"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
