import { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  // Initialize user state from localStorage
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Update localStorage when user changes
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("user", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("user");
    }
  }, [currentUser]);

  // Register a new user
  const register = async (email, password, name) => {
    setLoading(true);
    setError(null);

    try {
      // In a real app, you would make an API call here
      // For this demo, we'll simulate successful registration

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Check if user already exists in localStorage
      const users = JSON.parse(localStorage.getItem("users") || "[]");

      if (users.some((user) => user.email === email)) {
        throw new Error("User with this email already exists");
      }

      // Create new user
      const newUser = {
        id: Date.now().toString(),
        email,
        name,
        // In a real app, NEVER store plain passwords
        // This is just for demo purposes
        password,
      };

      // Add to users collection
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));

      // Auto login after registration
      setCurrentUser({
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
      });

      return newUser;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Login user
  const login = async (email, password) => {
    setLoading(true);
    setError(null);

    try {
      // In a real app, you would make an API call here
      // For this demo, we'll check localStorage

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Get users from localStorage
      const users = JSON.parse(localStorage.getItem("users") || "[]");

      // Find matching user
      const user = users.find(
        (user) => user.email === email && user.password === password
      );

      if (!user) {
        throw new Error("Invalid email or password");
      }

      // Set current user (without password)
      setCurrentUser({
        id: user.id,
        email: user.email,
        name: user.name,
      });

      return user;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Logout user
  const logout = () => {
    setCurrentUser(null);
    // In a real app, you might need to make an API call to invalidate tokens
  };

  // Check if user is authenticated
  const isAuthenticated = () => {
    return !!currentUser;
  };

  const value = {
    currentUser,
    loading,
    error,
    register,
    login,
    logout,
    isAuthenticated,
    setError, // Expose for clearing errors
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
