import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop component that resets scroll position on route changes.
 */
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to the top of the page instantly
    window.scrollTo(0, 0);
  }, [pathname]); // Triggered every time the path changes

  return null; // This component doesn't render anything UI-wise
}

export default ScrollToTop;