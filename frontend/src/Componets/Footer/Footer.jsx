import React, { useState } from "react";
import "./Footer.css";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import axios from "axios";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();

    if (!email) {
      setMessage("Please enter your email address");
      return;
    }

    setIsSubmitting(true);
    setMessage("");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/newsletter/subscribe",
        { email }
      );
      setMessage(
        response.data.message || "Successfully subscribed to newsletter!"
      );
      setEmail("");
    } catch (error) {
      setMessage(
        error.response?.data?.error ||
          "Subscription failed. Please try again later."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.logo} alt="Tomato logo" />
          <p>
            Tomato is your one-stop destination for fast, fresh, and flavorful
            meals. We're committed to delivering your favorite dishes from
            top-rated kitchens right to your doorstep—hot and on time!
          </p>
          <div className="footer-social-icons">
            <a
              href="https://github.com/Skrishna0703/Food-Del"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={assets.github_icon} alt="GitHub" />
            </a>
            <img src={assets.facebook_icon} alt="Facebook" />
            <a
              href="https://x.com/SkrishnaSutar73"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={assets.twitter_icon} alt="Twitter" />
            </a>
            <a
              href="https://www.linkedin.com/in/shrikrishna-sutar-3b601524b/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={assets.linkedin_icon} alt="LinkedIn" />
            </a>
          </div>
        </div>

        <div className="footer-content-mid">
          <h2>COMPANY</h2>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About Us</Link>
            </li>
            <li>
              <Link to="/order">Delivery</Link>
            </li>
            <li>
              <Link to="/privacy">Privacy Policy</Link>
            </li>
          </ul>
        </div>

        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+91 9921939559</li>
            <li>shrikrishnasutar0703@gmail.com</li>
          </ul>
        </div>

        {/* Newsletter Section */}
        <div className="footer-newsletter">
          <h2>NEWSLETTER</h2>
          <p>Subscribe to get updates on new offers and meals</p>
          <form onSubmit={handleSubscribe} className="newsletter-form">
            <input
              type="email"
              placeholder="Your Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSubmitting}
            />
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Subscribing..." : "Subscribe"}
            </button>
          </form>
          {message && <div className="newsletter-message">{message}</div>}
        </div>
      </div>

      <hr />

      <p className="footer-copyright">
        &copy; 2025 Tomato.com — All Rights Reserved.
      </p>
    </div>
  );
};

export default Footer;
