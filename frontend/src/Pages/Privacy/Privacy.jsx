// Privacy.jsx
import React, { useState, useEffect } from "react";
import "./Privacy.css";

const Privacy = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    // Get theme from localStorage or default to light
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);

    // Listen for theme changes
    const handleStorageChange = () => {
      const newTheme = localStorage.getItem("theme") || "light";
      setTheme(newTheme);
    };

    window.addEventListener("storage", handleStorageChange);

    // Also check for changes periodically since storage event doesn't always fire
    // in the same window/tab
    const interval = setInterval(() => {
      const currentTheme = localStorage.getItem("theme") || "light";
      if (currentTheme !== theme) {
        setTheme(currentTheme);
      }
    }, 1000);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
  }, [theme]);

  return (
    <div className={`privacy-page ${theme}`}>
      <div className="privacy-container">
        <h1>Privacy Policy</h1>

        <div className="privacy-content">
          <p className="intro">
            We respect your privacy and are committed to protecting your
            personal data. This privacy policy explains how we handle data in
            this application.
          </p>

          <section className="privacy-section">
            <h3>Information We Collect</h3>
            <ul>
              <li>
                Account information you provide (name, email address, contact
                details)
              </li>
              <li>Order details and delivery address information</li>
              <li>
                Usage data and analytics about how you interact with our
                application
              </li>
              <li>
                Device information and browser type for compatibility purposes
              </li>
            </ul>
          </section>

          <section className="privacy-section">
            <h3>How We Use Information</h3>
            <ul>
              <li>To process orders and provide customer support</li>
              <li>To improve app performance and user experience</li>
              <li>To communicate important updates about our services</li>
              <li>
                To personalize your experience and provide relevant content
              </li>
            </ul>
          </section>

          <section className="privacy-section">
            <h3>Data Security</h3>
            <p>
              We implement appropriate technical and organizational measures to
              protect your personal data against unauthorized access,
              alteration, disclosure, or destruction.
            </p>
          </section>

          <section className="privacy-section">
            <h3>Your Rights</h3>
            <p>
              You have the right to access, correct, or delete your personal
              data. You can also object to the processing of your data or
              request data portability.
            </p>
          </section>

          <section className="privacy-section">
            <h3>Contact Us</h3>
            <p>
              For privacy questions or concerns, please contact our Data
              Protection Officer at
              <a href="mailto:support@example.com">support@example.com</a>.
            </p>
          </section>

          <div className="privacy-footer">
            <p>Last updated: {new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
