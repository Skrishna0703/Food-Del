import React from 'react';
import './CustomerReviews.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { assets } from '../../assets/assets';

const reviews = [
  {
    name: "Jane Doe",
    role: "CEO",
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus elementum magna ut duis pulvinar tincidunt vivamus adipiscing quam.",
    rating: 4,
    image: assets.user1,
  },
  {
    name: "John Smith",
    role: "Manager",
    comment:
      "Great experience! The interface is smooth and intuitive. Will definitely recommend.",
    rating: 5,
    image: assets.user2,
  },
  {
    name: "Ananya Verma",
    role: "Designer",
    comment:
      "Affordable and fast. I loved the quick service and responsive support team.",
    rating: 4,
    image: assets.user3,
  },
];

const CustomerReviews = () => {
  return (
    <div className="testimonial-section" id="customer-reviews">
      <h2>Testimonials</h2>

      <Swiper
        modules={[Navigation, Pagination, A11y]}
        spaceBetween={30}
        slidesPerView={1}
        loop
        centeredSlides
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
    </div>
  );
};

export default CustomerReviews;
