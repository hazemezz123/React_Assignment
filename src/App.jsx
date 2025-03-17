import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ProductProvider } from "./context/ProductContext";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import ProductDetails from "./components/ProductDetails";
import CartPage from "./components/CartPage";
import WishlistPage from "./components/WishlistPage";
import Footer from "./components/Footer";
import NotFound from "./components/NotFound";

function App() {
  return (
    <ProductProvider>
      <CartProvider>
        <Router>
          <div className="flex flex-col min-h-screen bg-gray-900">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<ProductList />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/wishlist" element={<WishlistPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </ProductProvider>
  );
}

export default App;
