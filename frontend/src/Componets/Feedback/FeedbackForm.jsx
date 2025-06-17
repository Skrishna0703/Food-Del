import React, { useState } from "react";
import "./FeedbackForm.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Feedback() {
  const [rating, setRating] = useState(0);
  const [preview, setPreview] = useState(null);

  const onSubmit = async (event) => {
    event.preventDefault();
    toast.info("Sending feedback...");
    const formData = new FormData(event.target);

    formData.append("access_key", "ab531b62-ec52-4408-bd63-63db23fee063");
    formData.append("rating", rating);

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      toast.success("✅ Feedback Submitted Successfully!");
      event.target.reset();
      setRating(0);
      setPreview(null);
    } else {
      console.error("Error:", data);
      toast.error(data.message || "❌ Something went wrong.");
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  return (
    <div className="feedback-container">
      <h2>Feedback Form</h2>
      <form onSubmit={onSubmit} className="feedback-form">
        <div className="feedback-form-group">
          <label>Full Name:</label>
          <input type="text" name="name" required />
        </div>

        <div className="feedback-form-group">
          <label>Role / Domain:</label>
          <input type="text" name="role" required />
        </div>

        <div className="feedback-form-group">
          <label>Phone Number:</label>
          <input type="tel" name="phone" pattern="[0-9]{10}" required />
        </div>

        <div className="feedback-form-group">
          <label>Feedback:</label>
          <textarea name="message" rows="4" required></textarea>
        </div>

        <div className="feedback-form-group">
          <label>Rating:</label>
          <div className="star-rating">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                onClick={() => setRating(star)}
                style={{ color: star <= rating ? "#ffc107" : "#ccc" }}
              >
                ★
              </span>
            ))}
          </div>
        </div>

      

        <button type="submit" className="feedback-button">
          Submit Feedback
        </button>
      </form>

      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
}
