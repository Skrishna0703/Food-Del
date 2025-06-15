import React from 'react';
import './CustomerReviews.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Link } from 'react-router-dom';

const reviews = [
  {
    name: "Aarav Mehta",
    role: "Marketing Manager",
    comment: "Amazing food and super fast delivery. Never been disappointed!",
    rating: 5,
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Neha Kapoor",
    role: "UI/UX Designer",
    comment: "The app is intuitive and the food options are great!",
    rating: 4,
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Rahul Singh",
    role: "Tech Lead",
    comment: "Love the convenience and the quality. My go-to food app!",
    rating: 5,
    image: "https://randomuser.me/api/portraits/men/76.jpg",
  },
  {
    name: "Pooja Sharma",
    role: "Freelancer",
    comment: "Highly impressed with the service and taste. Recommended!",
    rating: 5,
    image: "https://randomuser.me/api/portraits/women/66.jpg",
  },
  {
    name: "Ishan Verma",
    role: "Content Creator",
    comment: "Fresh meals, great UI, and on-time delivery. 10/10!",
    rating: 5,
    image: "https://randomuser.me/api/portraits/men/85.jpg",
  }
];

const CustomerReviews = () => {
  return (
    <div className="testimonial-section" id="customer-reviews">
      <h2>What Our Customers Say</h2>

      <Swiper
        modules={[Navigation, Pagination, A11y, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        loop
        centeredSlides
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          768: { slidesPerView: 3 },
        }}
      >
        {reviews.map((review, index) => (
          <SwiperSlide key={index}>
            <div className="testimonial-card">
              <span className="quote-icon">❝</span>
              <img src={review.image} alt={review.name} className="review-img" />
              <p>{review.comment}</p>
              <div className="stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i}>{i < review.rating ? "★" : "☆"}</span>
                ))}
              </div>
              <h3>{review.name}</h3>
              <p className="role">{review.role}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="more-reviews-btn-container">
        <Link to="/review" className="more-reviews-btn">More Reviews</Link>
      </div>
    </div>
  );
};

export default CustomerReviews;
