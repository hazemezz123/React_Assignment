import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const ProductContext = createContext();

export const useProducts = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getAllProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get("https://fakestoreapi.com/products");
      setProducts(response.data);
      setLoading(false);
    } catch {
      setError("Failed to fetch products. Please try again later.");
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  const value = {
    products,
    loading,
    error,
    getAllProducts,
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};
