import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// This component will scroll the window to the top whenever the route changes
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth", // For smooth scrolling effect
    });
  }, [pathname]);

  return null; // This component doesn't render anything
}

export default ScrollToTop;
