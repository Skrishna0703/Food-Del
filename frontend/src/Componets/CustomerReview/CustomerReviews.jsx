import React from 'react';
import './CustomerReviews.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Link } from 'react-router-dom';

// Cartoon avatar URLs
const femaleAvatar = 'https://cdn-icons-png.flaticon.com/512/4140/4140047.png';   // Cartoon girl
const maleAvatar = 'https://cdn-icons-png.flaticon.com/512/4140/4140037.png'; // Cartoon boy

const reviews = [
  {
    name: "Swati Pepati",
    role: "Marketing Manager",
    gender: "female",
    comment: "The site looks awesome Login, creating account, seeing options and adding to cart, payment and all the processes are easy to use",
    rating: 5,
  },
  {
    name: "Ansh Mahajan",
    role: "MERN Stack Developer",
    gender: "male",
    comment: " Great App ! Smooth performance and Works Perfectly. Well Done",
    rating: 4,
  },
  {
    name: "Arti Giram",
    role: "Full-Stack Developer",
    gender: "female",
    comment: "The UI of Tomato is responsive and visually appealing. I love how clean the design is, and the food listing feels smooth and interactive.",
    rating: 4,
  },
  {
    name: "Paranv Nalawade",
    role: "Freelancer",
    gender: "male",
    comment: "Highly impressive UI UX & Responsive Design . Recommended!",
    rating: 5,
  },
  {
    name: "Pranav Patil",
    role: "Content Creator",
    gender: "male",
    comment: "The site feels smooth and perfectly optimized for mobile. Everything works great on my phone!",
    rating: 3,
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
          <SwiperSlide key={index} style={{width: '320px'}}>
            <div className="review-card">
              <span className="quote-icon">❝</span>

              <img src={review.gender === "male" ? maleAvatar : femaleAvatar} alt={review.name} className="review-img" />
              <p className='review-comment'>{review.comment}</p>
              <div className="review-rating">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i}>{i < review.rating ? "★" : "☆"}</span>
                ))}
              </div>
              <h3>{review.name}</h3>
              <p className="review-role">{review.role}</p>
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
