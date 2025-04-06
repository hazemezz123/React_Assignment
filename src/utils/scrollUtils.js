/**
 * Scrolls the window to the top with a smooth animation
 */
export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
};

/**
 * Creates a click handler that navigates to the specified path
 * and scrolls to the top of the page
 *
 * @param {Function} navigate - React Router's navigate function
 * @param {string} path - Path to navigate to
 * @returns {Function} Click handler function
 */
export const navigateAndScrollToTop = (navigate, path) => {
  return () => {
    navigate(path);
    scrollToTop();
  };
};
