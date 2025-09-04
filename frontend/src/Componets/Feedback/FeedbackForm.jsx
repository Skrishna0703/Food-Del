import React, { useState } from "react";
import "./FeedbackForm.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Feedback() {
  const [rating, setRating] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    if (submitting) return; // prevent duplicate submits
    setSubmitting(true);
    toast.info("Sending feedback...");
    const formData = new FormData(event.target);
    formData.append("access_key", "ab531b62-ec52-4408-bd63-63db23fee063");
    formData.append("rating", rating);
    formData.append("avatar", formData.get("avatar")); // add avatar selection

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (data.success) {
        toast.success("✅ Feedback Submitted Successfully!");
        event.target.reset();
        setRating(0);
      } else {
        toast.error(data.message || "❌ Something went wrong.");
      }
    } catch (error) {
      toast.error("❌ Submission failed. Try again.");
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleStarKeyDown = (e, star) => {
    if (e.key === "Enter" || e.key === " " || e.key === "Spacebar") {
      e.preventDefault();
      setRating(star);
    }
  };

  return (
    <div className="feedback-container">
      <h2>Feedback Form</h2>
      <form onSubmit={onSubmit} className="feedback-form">
        <div className="feedback-form-group">
          <label htmlFor="name">Full Name:</label>
          <input id="name" type="text" name="name" required />
        </div>
        <div className="feedback-form-group">
          <label htmlFor="role">Role / Domain:</label>
          <input id="role" type="text" name="role" required />
        </div>
        <div className="feedback-form-group">
          <label htmlFor="phone">Phone Number:</label>
          <input
            id="phone"
            type="tel"
            name="phone"
            pattern="[0-9]{10}"
            required
            aria-describedby="phoneHelp"
          />
          <small id="phoneHelp">Enter 10 digit number</small>
        </div>
        <div className="feedback-form-group">
          <label htmlFor="message">Feedback:</label>
          <textarea id="message" name="message" rows="4" required></textarea>
        </div>
        <div className="feedback-form-group">
          <label>Rating:</label>
          <div className="star-rating" role="radiogroup" aria-label="Rating">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                tabIndex={0}
                role="radio"
                aria-checked={rating === star}
                onClick={() => setRating(star)}
                onKeyDown={(e) => handleStarKeyDown(e, star)}
                style={{ color: star <= rating ? "#ffc107" : "#ccc" }}
                aria-label={`${star} star${star > 1 ? "s" : ""}`}
              >
                ★
              </span>
            ))}
          </div>
        </div>
        <div className="feedback-form-group">
          <label htmlFor="avatar">Choose Avatar:</label>
          <select id="avatar" name="avatar" required>
            <option value="male">👨 Male</option>
            <option value="female">👩 Female</option>
            <option value="neutral">👤 Neutral</option>
          </select>
        </div>
        <button type="submit" className="feedback-button" disabled={submitting}>
          {submitting ? "Submitting..." : "Submit Feedback"}
        </button>
      </form>
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
}
