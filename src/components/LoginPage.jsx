import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const { login, loading, error, setError } = useAuth();
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const [clearMessage, setClearMessage] = useState("");

  // Clear any errors when component mounts or unmounts
  useState(() => {
    setError(null);
    return () => setError(null);
  }, [setError]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login(email, password);
      navigate("/"); // Redirect to home page after successful login
    } catch (error) {
      // Error is handled in the AuthContext
      console.error("Login failed:", error.message);
    }
  };

  const handleClearStorage = () => {
    localStorage.clear();
    setClearMessage("Local storage cleared successfully!");
    setTimeout(() => setClearMessage(""), 3000);
  };

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

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 py-12 ${
        isDarkMode ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      <motion.div
        className={`max-w-md w-full ${
          isDarkMode ? "bg-gray-800" : "bg-white"
        } rounded-xl shadow-lg overflow-hidden`}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="px-6 py-8 sm:px-10">
          <motion.div variants={itemVariants}>
            <h2
              className={`text-3xl font-extrabold text-center ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Sign in to your account
            </h2>
          </motion.div>

          <motion.div variants={itemVariants} className="mt-2 text-center">
            <p
              className={`text-sm ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Or{" "}
              <Link
                to="/register"
                className="font-medium text-indigo-500 hover:text-indigo-400"
              >
                create a new account
              </Link>
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="mt-8">
            {error && (
              <div
                className="mb-4 p-3 rounded-md bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-300 text-sm"
                role="alert"
              >
                {error}
              </div>
            )}

            {clearMessage && (
              <div
                className="mb-4 p-3 rounded-md bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-300 text-sm"
                role="alert"
              >
                {clearMessage}
              </div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className={`block text-sm font-medium ${
                    isDarkMode ? "text-gray-200" : "text-gray-700"
                  }`}
                >
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`appearance-none block w-full px-3 py-2 border ${
                      isDarkMode
                        ? "border-gray-600 bg-gray-700 text-white focus:border-indigo-500"
                        : "border-gray-300 bg-white text-gray-900 focus:border-indigo-500"
                    } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 sm:text-sm`}
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className={`block text-sm font-medium ${
                    isDarkMode ? "text-gray-200" : "text-gray-700"
                  }`}
                >
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`appearance-none block w-full px-3 py-2 border ${
                      isDarkMode
                        ? "border-gray-600 bg-gray-700 text-white focus:border-indigo-500"
                        : "border-gray-300 bg-white text-gray-900 focus:border-indigo-500"
                    } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 sm:text-sm`}
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember-me"
                    className={`ml-2 block text-sm ${
                      isDarkMode ? "text-gray-300" : "text-gray-900"
                    }`}
                  >
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a
                    href="#"
                    className="font-medium text-indigo-500 hover:text-indigo-400"
                  >
                    Forgot your password?
                  </a>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                    loading ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {loading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Signing in...
                    </>
                  ) : (
                    "Sign in"
                  )}
                </button>
              </div>
            </form>
          </motion.div>

          <motion.div variants={itemVariants} className="mt-6">
            <button
              onClick={handleClearStorage}
              className={`w-full flex justify-center py-2 px-4 border ${
                isDarkMode
                  ? "border-gray-700 text-gray-300 hover:bg-gray-700"
                  : "border-gray-300 text-gray-700 hover:bg-gray-100"
              } rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
              type="button"
            >
              Clear Local Storage
            </button>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className={`mt-6 relative ${
              isDarkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            <div
              className="absolute inset-0 flex items-center"
              aria-hidden="true"
            >
              <div
                className={`w-full border-t ${
                  isDarkMode ? "border-gray-700" : "border-gray-300"
                }`}
              ></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span
                className={`px-2 ${isDarkMode ? "bg-gray-800" : "bg-white"}`}
              >
                Or continue with
              </span>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mt-6 grid grid-cols-3 gap-3"
          >
            <div>
              <a
                href="#"
                className={`w-full inline-flex justify-center py-2 px-4 border ${
                  isDarkMode
                    ? "border-gray-700 bg-gray-700 hover:bg-gray-600"
                    : "border-gray-300 bg-white hover:bg-gray-50"
                } rounded-md shadow-sm ${
                  isDarkMode ? "text-gray-300" : "text-gray-500"
                } text-sm font-medium`}
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
            <div>
              <a
                href="#"
                className={`w-full inline-flex justify-center py-2 px-4 border ${
                  isDarkMode
                    ? "border-gray-700 bg-gray-700 hover:bg-gray-600"
                    : "border-gray-300 bg-white hover:bg-gray-50"
                } rounded-md shadow-sm ${
                  isDarkMode ? "text-gray-300" : "text-gray-500"
                } text-sm font-medium`}
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
            </div>
            <div>
              <a
                href="#"
                className={`w-full inline-flex justify-center py-2 px-4 border ${
                  isDarkMode
                    ? "border-gray-700 bg-gray-700 hover:bg-gray-600"
                    : "border-gray-300 bg-white hover:bg-gray-50"
                } rounded-md shadow-sm ${
                  isDarkMode ? "text-gray-300" : "text-gray-500"
                } text-sm font-medium`}
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.463 2 11.97c0 4.404 2.865 8.14 6.839 9.458.5.092.682-.216.682-.48 0-.236-.008-.864-.013-1.695-2.782.602-3.369-1.337-3.369-1.337-.454-1.151-1.11-1.458-1.11-1.458-.908-.618.069-.606.069-.606 1.003.07 1.531 1.027 1.531 1.027.892 1.524 2.341 1.084 2.91.828.092-.643.35-1.083.636-1.332-2.22-.251-4.555-1.107-4.555-4.927 0-1.088.39-1.979 1.029-2.675-.103-.252-.446-1.266.098-2.638 0 0 .84-.268 2.75 1.022A9.607 9.607 0 0112 6.82c.85.004 1.705.114 2.504.336 1.909-1.29 2.747-1.022 2.747-1.022.546 1.372.202 2.386.1 2.638.64.696 1.028 1.587 1.028 2.675 0 3.83-2.339 4.673-4.566 4.92.359.307.678.915.678 1.846 0 1.332-.012 2.407-.012 2.734 0 .267.18.577.688.48 3.97-1.32 6.833-5.054 6.833-9.458C22 6.463 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
