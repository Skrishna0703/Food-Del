import React from 'react';
import './Review.css';

const reviews = [
  { name: 'Ananya Sharma', rating: 5, comment: 'Delicious food and quick delivery. Highly recommended!', image: 'https://randomuser.me/api/portraits/women/65.jpg' },
  { name: 'Raj Malhotra', rating: 4, comment: 'Loved the variety and taste. Will order again!', image: 'https://randomuser.me/api/portraits/men/43.jpg' },
  { name: 'Sneha Patel', rating: 5, comment: 'The app is super easy to use and the food is fresh!', image: 'https://randomuser.me/api/portraits/women/44.jpg' },
  { name: 'Aman Verma', rating: 5, comment: 'Great service and amazing quality food.', image: 'https://randomuser.me/api/portraits/men/51.jpg' },
  { name: 'Priya Desai', rating: 4, comment: 'Impressed with packaging and taste.', image: 'https://randomuser.me/api/portraits/women/32.jpg' },
  { name: 'Kunal Shah', rating: 5, comment: 'Easy to order, fast delivery. Superb!', image: 'https://randomuser.me/api/portraits/men/76.jpg' },
  { name: 'Meera Joshi', rating: 4, comment: 'Tasty meals and user-friendly interface.', image: 'https://randomuser.me/api/portraits/women/53.jpg' },
  { name: 'Nikhil Rao', rating: 5, comment: 'Healthy options and good pricing.', image: 'https://randomuser.me/api/portraits/men/66.jpg' },
  { name: 'Divya Kapoor', rating: 5, comment: 'Never disappointed with the quality.', image: 'https://randomuser.me/api/portraits/women/27.jpg' },
  { name: 'Rohit Mehra', rating: 4, comment: 'Good portion sizes and fresh food.', image: 'https://randomuser.me/api/portraits/men/36.jpg' },
  { name: 'Simran Kaur', rating: 5, comment: 'Best food delivery app I have used!', image: 'https://randomuser.me/api/portraits/women/22.jpg' },
  { name: 'Aditya Bansal', rating: 4, comment: 'Love the customization options.', image: 'https://randomuser.me/api/portraits/men/19.jpg' },
  { name: 'Tanya Reddy', rating: 5, comment: 'Food always arrives hot and tasty.', image: 'https://randomuser.me/api/portraits/women/78.jpg' },
  { name: 'Vikram Iyer', rating: 4, comment: 'Very prompt service and courteous delivery staff.', image: 'https://randomuser.me/api/portraits/men/85.jpg' },
  { name: 'Riya Sen', rating: 5, comment: 'Top-notch experience every time.', image: 'https://randomuser.me/api/portraits/women/10.jpg' }
];

const Reviews = () => {
  return (
    <div className="reviews-section" id="customer-reviews">
      <h2>What Our Customers Say</h2>
      <div className="reviews-container">
        {reviews.map((review, index) => (
          <div className="review-card" key={index}>
            <img src={review.image} alt={review.name} className="review-avatar" />
            <h3>{review.name}</h3>
            <p className="review-comment">“{review.comment}”</p>
            <div className="review-rating">
              {'⭐'.repeat(review.rating)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
