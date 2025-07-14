// src/ScrollToTop.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to the top of the window whenever the pathname changes
    window.scrollTo(0, 0);
  }, [pathname]); // Depend on pathname to re-run effect on route change

  return null; // This component doesn't render anything itself
}

export default ScrollToTop;
