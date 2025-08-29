import React, { useState } from "react";
import "./FeedbackForm.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Feedback() {
  const [rating, setRating] = useState(0);
  const [preview, setPreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    if (submitting) return; // prevent duplicate submits
    setSubmitting(true);
    toast.info("Sending feedback...");
    const formData = new FormData(event.target);
    formData.append("access_key", "ab531b62-ec52-4408-bd63-63db23fee063");
    formData.append("rating", rating);

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
        setPreview(null);
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

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const isImage = file.type.startsWith("image/");
      const isSizeValid = file.size <= 5 * 1024 * 1024; // 5MB
      if (!isImage) {
        toast.error("❌ Only images are allowed.");
        e.target.value = null;
        setPreview(null);
        return;
      }
      if (!isSizeValid) {
        toast.error("❌ Image must be <= 5MB.");
        e.target.value = null;
        setPreview(null);
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
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
          <label htmlFor="photo">Upload Photo (optional):</label>
          <input
            id="photo"
            name="photo"
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
          />
        </div>
        {preview && (
          <div className="photo-preview">
            <img alt="Photo preview" src={preview} />
          </div>
        )}
        <button type="submit" className="feedback-button" disabled={submitting}>
          {submitting ? "Submitting..." : "Submit Feedback"}
        </button>
      </form>
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
}

