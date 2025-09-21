import React from 'react';
import './Review.css';

// Cartoon avatar URLs
const femaleAvatar = 'https://cdn-icons-png.flaticon.com/512/4140/4140047.png';   // Cartoon boy
const maleAvatar = 'https://cdn-icons-png.flaticon.com/512/4140/4140037.png'; // Cartoon girl

const reviews = [
  {
    name: "Swati Pepati",
    role: "Marketing Manager",
    gender: "female",
    comment: "The site looks awesome. Login, creating account, seeing options and adding to cart, payment and all the processes are easy to use.",
    rating: 5,
  },
  {
    name: "Ansh Mahajan",
    role: "MERN Stack Developer",
    gender: "male",
    comment: "Great App! Smooth performance and works perfectly. Well done!",
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
    comment: "Highly impressive UI/UX & responsive design. Recommended!",
    rating: 5,
  },
    {
    name: "Aditi Kuhar",
    role: "Web Developer",
    gender: "female",
    comment: "Your food website looks fantastic! The frontend is super eye-catching — the visuals are vibrant, the layout is clean, and everything feels really engaging. Great job on making it so appealing and user-friendly!",
    rating: 5,
  },
  {
    name: "Pranav Patil",
    role: "Content Creator",
    gender: "male",
    comment: "The site feels smooth and perfectly optimized for mobile. Everything works great on my phone!",
    rating: 3,
  },
  {
    name: "Vishakha Mane",
    role: "Software Engginer",
    gender: "female",
    comment: "Tomato makes ordering food so convenient. Love the clean UI and quick delivery. Super easy to use , I found all my favorite food in just a few clicks.",
    rating: 4,
  },
  {
    name: "Omkar Tagade",
    role: "Backend Developer",
    gender: "male",
    comment: "Super easy to use and looks great! Ordering food is quick and smooth—really impressed with how well it works on mobile too.",
    rating: 5,
  },
    {
    name: "Siddhi Kengar",
    role: "Business analyst",
    gender: "female",
    comment: "Really impressed with Tomato!  Everything feels smooth, modern, and easy to use. Loved the overall experience.",
    rating: 5,
  },
];

const Reviews = () => {
  return (
    <div className="reviews-section" id="customer-reviews">
      <h2>What Our Customers Say</h2>
      <div className="reviews-container">
        {reviews.map((review, index) => (
          <div className="review-card" key={index}>
            <img
              src={review.gender === 'male' ? maleAvatar : femaleAvatar}
              alt={review.name}
              className="review-avatar"
            />
            <h3>{review.name}</h3>
            <p className="review-role">{review.role}</p>
            <p className="review-comment">“{review.comment}”</p>
            <div className="review-rating">{'⭐'.repeat(review.rating)}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
