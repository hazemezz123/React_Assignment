import { Link } from "react-router-dom";
import { scrollToTop } from "../utils/scrollUtils";

/**
 * Custom Link component that scrolls to top when clicked
 * Has the same props as React Router's Link component
 */
const ScrollLink = ({ children, to, className, onClick, ...props }) => {
  const handleClick = (e) => {
    // Call the original onClick if provided
    if (onClick) {
      onClick(e);
    }

    // Scroll to top
    scrollToTop();
  };

  return (
    <Link to={to} className={className} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
};

export default ScrollLink;
