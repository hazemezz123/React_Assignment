import { useParams, Link } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import { useEffect, useState } from "react";

const ProductDetails = () => {
  const { id } = useParams();
  const { products } = useProducts();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        if (products.length > 0) {
          const foundProduct = products.find((p) => p.id === parseInt(id));
          setProduct(foundProduct);
          setLoading(false);
        } else {
          // Fetch the individual product if products aren't loaded
          const response = await fetch(
            `https://fakestoreapi.com/products/${id}`
          );
          const data = await response.json();
          setProduct(data);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id, products]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-indigo-600"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-center p-4">
        <h1 className="text-3xl font-bold mb-4 text-white">
          Product Not Found
        </h1>
        <p className="text-gray-300 mb-6">
          The product you're looking for doesn't exist or has been removed.
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
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center text-indigo-400 hover:text-indigo-300 mb-8 transition-colors"
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

        <div className="bg-gray-800 rounded-xl shadow-xl overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2 relative flex items-center justify-center p-8">
              <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-gray-900 opacity-90"></div>
              <img
                src={product.image}
                alt={product.title}
                className="max-h-96 object-contain relative z-10"
              />
            </div>

            <div className="md:w-1/2 p-8">
              <div className="uppercase tracking-wide text-sm text-indigo-400 font-semibold">
                {product.category}
              </div>
              <h1 className="mt-2 text-3xl font-bold text-white">
                {product.title}
              </h1>

              <div className="mt-4">
                <span className="text-3xl font-bold text-indigo-400">
                  ${product.price.toFixed(2)}
                </span>
                {product.rating && (
                  <div className="mt-2 flex items-center">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`h-5 w-5 ${
                            i < Math.round(product.rating.rate)
                              ? "text-yellow-500"
                              : "text-gray-500"
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="ml-2 text-gray-300">
                      {product.rating.rate} out of 5 ({product.rating.count}{" "}
                      reviews)
                    </span>
                  </div>
                )}
              </div>

              <div className="mt-6 border-t border-gray-700 pt-6">
                <h2 className="text-xl font-bold text-white mb-4">
                  Description
                </h2>
                <p className="text-gray-300 leading-relaxed">
                  {product.description}
                </p>
              </div>

              <div className="mt-8 space-y-4">
                <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 rounded-lg font-medium transition-colors">
                  Add to Cart
                </button>
                <button className="w-full bg-transparent border border-indigo-600 text-indigo-400 hover:bg-indigo-800 py-3 px-6 rounded-lg font-medium transition-colors">
                  Add to Wishlist
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
