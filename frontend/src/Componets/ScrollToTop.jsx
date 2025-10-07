import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  const [isAtTop, setIsAtTop] = useState(true);
  const [buttonBottom, setButtonBottom] = useState(20); // dynamic bottom value

  useEffect(() => {
    // Always go to top on route change
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsAtTop(true);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      // Arrow toggle
      if (window.scrollY === 0) {
        setIsAtTop(true);
      } else {
        setIsAtTop(false);
      }

      // Footer detection
      const footer = document.querySelector("footer");
      if (footer) {
        const footerRect = footer.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        if (footerRect.top < windowHeight) {
          // Footer is visible → move button up
          const overlap = windowHeight - footerRect.top;
          setButtonBottom(overlap + 20); 
        } else {
          // Normal state
          setButtonBottom(20);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

      return (
       <button
  type="button"
  className="scrollToggle"
  onClick={() => {
    if (isAtTop) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }}
  aria-label={isAtTop ? "Scroll to bottom" : "Scroll to top"}
  title={isAtTop ? "Scroll to bottom" : "Scroll to top"}
  style={{
    // keep your dynamic lift above footer + safe-area padding
    bottom: `calc(${buttonBottom}px + env(safe-area-inset-bottom, 0px))`,
  }}
>
  {isAtTop ? (
    // Down chevron
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  ) : (
    // Up chevron
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M18 15l-6-6-6 6" />
    </svg>
  )}
</button>
  );
};

export default ScrollToTop;
