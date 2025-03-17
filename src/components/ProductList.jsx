import { useProducts } from "../context/ProductContext";

const ProductList = () => {
  const { products, loading, error } = useProducts();

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Our Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div className="h-48 bg-gray-200 flex items-center justify-center p-4">
              <img
                src={product.image}
                alt={product.title}
                className="h-full object-contain"
              />
            </div>
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-2 line-clamp-2 h-14">
                {product.title}
              </h2>
              <p className="text-gray-700 mb-2 line-clamp-3 h-18">
                {product.description}
              </p>
              <div className="flex justify-between items-center mt-4">
                <span className="text-xl font-bold">
                  ${product.price.toFixed(2)}
                </span>
                <span className="px-2 py-1 bg-gray-200 text-gray-800 text-sm rounded-full">
                  {product.category}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
