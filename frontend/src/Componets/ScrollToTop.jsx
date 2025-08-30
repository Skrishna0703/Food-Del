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
          onClick={() => {
          if (isAtTop) {
      // scroll down to bottom if at top
      window.scrollTo({ 
        top: document.documentElement.scrollHeight, 
        behavior: "smooth" 
      });
    } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }}
      style={{
        position: "fixed",
        bottom: `${buttonBottom}px`, // dynamically adjusted
        right: "20px",
        padding: "10px",
        borderRadius: "50%",
        background: "#ea6208ff",
        color: "#fff",
        fontSize: "20px",
        cursor: "pointer",
        transition: "bottom 0.3s ease", // smooth lift above footer
        zIndex: 1000,
      }}
    >
      {isAtTop ? "↓" : "↑"}
    </button>
  );
};

export default ScrollToTop;
