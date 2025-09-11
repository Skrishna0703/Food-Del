import React, { useState, useEffect } from 'react';
import axios from "axios";
import './Home.css';
import Header from '../../Componets/Header/Header.jsx';
import ExploreMenu from '../../Componets/ExploreMenu/ExploreMenu.jsx';
import FoodDisplay from '../../Componets/FoodDisplay/FoodDisplay.jsx';
import FoodRecommendations from '../../Componets/FoodRecommendations/FoodRecommendations.jsx';
import AppDownload from '../../Componets/AppDownload/AppDownload.jsx';
import CustomerReviews from '../../Componets/CustomerReview/CustomerReviews.jsx';
import Feedback from '../../Componets/Feedback/FeedbackForm.jsx';

export const Home = () => {
  const [category, setCategory] = useState("All");

  // ✅ User state
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      axios.get(`${import.meta.env.VITE_API_URL}/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(res => {
        setUser(res.data.user);
        localStorage.setItem("user", JSON.stringify(res.data.user)); // ✅ Keep in sync
      })
      .catch(err => console.error("Error fetching user:", err));
    }
  }, []);

  return (
    <div>
      <div id="top"></div> {/* Add this line */}
      <Header />

      {/* ✅ Show user info if logged in */}
      {user && (
        <div className="user-info">
          <h2>Welcome, {user.name}</h2>
          <p>{user.email}</p>
          {user.photoURL && <img src={user.photoURL} alt="profile" />}
        </div>
      )}

      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisplay category={category} />
      <FoodRecommendations category={category} />
      <CustomerReviews />
      <Feedback />
      <AppDownload />
    </div>
  );
};

export default Home;
