import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { useState } from "react";

const CartPage = () => {
  const { cart, removeFromCart, updateCartQuantity, cartTotal, clearCart } =
    useCart();
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  const handleCheckout = () => {
    // Simulate a checkout process
    clearCart();
    setCheckoutSuccess(true);
    // In a real app, you would send the order to a backend here
  };

  if (checkoutSuccess) {
    return (
      <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto bg-gray-800 rounded-xl shadow-xl p-8">
          <div className="text-center">
            <svg
              className="w-20 h-20 text-green-500 mx-auto mb-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h2 className="text-3xl font-bold text-white mb-4">
              Order Successful!
            </h2>
            <p className="text-gray-300 mb-8">
              Thank you for your purchase. Your order has been placed
              successfully.
            </p>
            <Link
              to="/"
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors inline-block"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto bg-gray-800 rounded-xl shadow-xl p-8">
          <div className="text-center">
            <svg
              className="w-20 h-20 text-gray-500 mx-auto mb-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            <h2 className="text-3xl font-bold text-white mb-4">
              Your Cart is Empty
            </h2>
            <p className="text-gray-300 mb-8">
              Looks like you haven't added any products to your cart yet.
            </p>
            <Link
              to="/"
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors inline-block"
            >
              Start Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-white">Your Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden">
              <div className="p-6">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col sm:flex-row items-start sm:items-center py-6 border-b border-gray-700"
                  >
                    <div className="sm:w-24 h-24 flex-shrink-0 bg-gray-700 rounded-lg p-2 mb-4 sm:mb-0 relative">
                      <div className="absolute inset-0 bg-gradient-to-b from-gray-700 to-gray-800 opacity-90 rounded-lg"></div>
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-contain relative z-10"
                      />
                    </div>
                    <div className="sm:ml-6 flex-1">
                      <div className="flex flex-col sm:flex-row sm:justify-between">
                        <Link
                          to={`/product/${item.id}`}
                          className="text-lg font-medium text-white hover:text-indigo-400 mb-2 sm:mb-0"
                        >
                          {item.title}
                        </Link>
                        <span className="text-indigo-400 font-bold">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                      <div className="text-gray-400 mb-4 text-sm">
                        {item.category}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center border border-gray-600 rounded-lg">
                          <button
                            onClick={() =>
                              updateCartQuantity(item.id, item.quantity - 1)
                            }
                            className="px-3 py-1 text-white hover:bg-gray-700"
                          >
                            -
                          </button>
                          <span className="px-3 py-1 text-white">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateCartQuantity(item.id, item.quantity + 1)
                            }
                            className="px-3 py-1 text-white hover:bg-gray-700"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-400 hover:text-red-500"
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
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <div className="bg-gray-800 rounded-xl shadow-lg p-6 sticky top-6">
              <h2 className="text-xl font-bold text-white mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-300">
                  <span>Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Tax</span>
                  <span>${(cartTotal * 0.1).toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-700 pt-4 flex justify-between text-white font-bold">
                  <span>Total</span>
                  <span>${(cartTotal + cartTotal * 0.1).toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 rounded-lg font-medium transition-colors"
              >
                Checkout
              </button>

              <div className="mt-6">
                <Link
                  to="/"
                  className="text-indigo-400 hover:text-indigo-300 flex items-center justify-center"
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
