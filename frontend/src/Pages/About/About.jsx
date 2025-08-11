import React from "react";
import "./About.css";
import { assets } from "../../assets/assets.js";
import { motion } from "framer-motion";
import { 
  Clock, Star, RefreshCw, CreditCard, Smartphone, Gift,
  Users, UtensilsCrossed, MapPin, Award, Truck, Heart
} from "lucide-react";

const About = () => {
  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const scaleIn = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.5 } }
  };

  const slideInLeft = {
    hidden: { x: -50, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.6 } }
  };

  const slideInRight = {
    hidden: { x: 50, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.6 } }
  };
  const handleExploreMenu = () => {
    // Navigate to menu section or page
    const menuSection = document.getElementById('food-display');
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDownloadApp = () => {
    // Handle app download logic
    console.log("Redirecting to app download...");
  };

  return (
    <div className="about-page" id="about-us">
      {/* Hero Section */}
      <motion.div 
        className="about-hero"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        <div className="about-hero-content">
          <motion.div 
            className="tomato-logo"
            variants={scaleIn}
          >
            <img src={assets.logo} alt="Tomato Logo" className="hero-logo" />
          </motion.div>
          <motion.h2 
            className="about-heading"
            variants={fadeInUp}
          >
            Who We Are
          </motion.h2>
          <motion.p 
            className="about-subtitle"
            variants={fadeInUp}
          >
            Delivering fresh, fast, and flavorful meals right to your doorstep
          </motion.p>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="about-content">
        {/* Our Story Section */}
        <motion.section 
          className="story-section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="container">
            <motion.h3 variants={fadeInUp}>
              <UtensilsCrossed className="section-icon" />
              Our Story
            </motion.h3>
            <div className="story-grid">
              <motion.div className="story-text" variants={slideInLeft}>
                <p>
                  Founded in 2020 with a simple mission: to make delicious, quality food 
                  accessible to everyone. What started as a small local delivery service has 
                  grown into a community favorite, serving thousands of happy customers across 
                  the city.
                </p>
                <p>
                  We believe that great food brings people together. Every dish we deliver 
                  is prepared with love, using only the freshest ingredients from trusted 
                  local suppliers.
                </p>
              </motion.div>
              <motion.div className="story-image" variants={slideInRight}>
                <div className="image-placeholder">
                  <Heart className="story-heart-icon" size={64} />
                  <p>Our Journey Began</p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Mission Section */}
        <motion.section 
          className="mission-section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="container">
            <motion.h3 variants={fadeInUp}>
              <Award className="section-icon" />
              Our Mission
            </motion.h3>
            <motion.div className="mission-card" variants={scaleIn}>
              <p>
                To provide fresh, fast, and flavorful meals that bring joy to every customer, 
                while supporting local communities and maintaining the highest standards of 
                quality and service.
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* Core Values Section */}
        <motion.section 
          className="values-section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="container">
            <motion.h3 variants={fadeInUp}>
              <Star className="section-icon" />
              Core Values
            </motion.h3>
            <motion.div className="values-grid" variants={staggerContainer}>
              <motion.div className="value-card" variants={scaleIn}>
                <div className="value-icon">
                  <UtensilsCrossed size={48} />
                </div>
                <h4>Quality</h4>
                <p>Fresh ingredients and expertly prepared dishes every time</p>
              </motion.div>
              <motion.div className="value-card" variants={scaleIn}>
                <div className="value-icon">
                  <Truck size={48} />
                </div>
                <h4>Speed</h4>
                <p>Fast delivery without compromising on food quality</p>
              </motion.div>
              <motion.div className="value-card" variants={scaleIn}>
                <div className="value-icon">
                  <CreditCard size={48} />
                </div>
                <h4>Affordability</h4>
                <p>Great food at prices that won't break the bank</p>
              </motion.div>
              <motion.div className="value-card" variants={scaleIn}>
                <div className="value-icon">
                  <Heart size={48} />
                </div>
                <h4>Customer Happiness</h4>
                <p>Your satisfaction is our top priority</p>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        {/* Why Choose Us Section */}
        <motion.section 
          className="why-choose-section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="container">
            <motion.h3 variants={fadeInUp}>
              <Gift className="section-icon" />
              Why Choose Tomato?
            </motion.h3>
            <motion.div className="features-grid" variants={staggerContainer}>
              <motion.div className="feature-item" variants={fadeInUp}>
                <Clock className="feature-icon" size={40} />
                <div>
                  <h4>30-Minute Delivery</h4>
                  <p>Hot food, delivered fast to your door</p>
                </div>
              </motion.div>
              <motion.div className="feature-item" variants={fadeInUp}>
                <Star className="feature-icon" size={40} />
                <div>
                  <h4>5-Star Quality</h4>
                  <p>Rated excellent by thousands of customers</p>
                </div>
              </motion.div>
              <motion.div className="feature-item" variants={fadeInUp}>
                <RefreshCw className="feature-icon" size={40} />
                <div>
                  <h4>Easy Reordering</h4>
                  <p>One-click to order your favorites again</p>
                </div>
              </motion.div>
              <motion.div className="feature-item" variants={fadeInUp}>
                <CreditCard className="feature-icon" size={40} />
                <div>
                  <h4>Secure Payments</h4>
                  <p>Safe and secure payment options</p>
                </div>
              </motion.div>
              <motion.div className="feature-item" variants={fadeInUp}>
                <Smartphone className="feature-icon" size={40} />
                <div>
                  <h4>Mobile App</h4>
                  <p>Order on-the-go with our mobile app</p>
                </div>
              </motion.div>
              <motion.div className="feature-item" variants={fadeInUp}>
                <Gift className="feature-icon" size={40} />
                <div>
                  <h4>Daily Offers</h4>
                  <p>Exciting deals and discounts every day</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        {/* Call to Action Section */}
        <motion.section 
          className="cta-section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="container">
            <motion.div className="cta-content" variants={fadeInUp}>
              <h3>Ready to Order?</h3>
              <p>Join thousands of satisfied customers and experience the Tomato difference</p>
              <div className="cta-buttons">
                <motion.button 
                  className="btn-primary" 
                  onClick={handleExploreMenu}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <UtensilsCrossed size={20} />
                  Explore Menu
                </motion.button>
                <motion.button 
                  className="btn-secondary" 
                  onClick={handleDownloadApp}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Smartphone size={20} />
                  Download App
                </motion.button>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Stats Section */}
        <motion.section 
          className="stats-section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="container">
            <motion.div className="stats-grid" variants={staggerContainer}>
              <motion.div className="stat-item" variants={scaleIn}>
                <div className="stat-icon">
                  <Users size={32} />
                </div>
                <div className="stat-number">50K+</div>
                <div className="stat-label">Happy Customers</div>
              </motion.div>
              <motion.div className="stat-item" variants={scaleIn}>
                <div className="stat-icon">
                  <UtensilsCrossed size={32} />
                </div>
                <div className="stat-number">100+</div>
                <div className="stat-label">Menu Items</div>
              </motion.div>
              <motion.div className="stat-item" variants={scaleIn}>
                <div className="stat-icon">
                  <MapPin size={32} />
                </div>
                <div className="stat-number">15</div>
                <div className="stat-label">Cities Served</div>
              </motion.div>
              <motion.div className="stat-item" variants={scaleIn}>
                <div className="stat-icon">
                  <Star size={32} />
                </div>
                <div className="stat-number">4.8⭐</div>
                <div className="stat-label">Average Rating</div>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default About;