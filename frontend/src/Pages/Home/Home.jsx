import React, { useState } from 'react';
import './Home.css';
import Header from '../../Components/Header/Header.jsx';
import ExploreMenu from '../../Components/ExploreMenu/ExploreMenu.jsx';
import FoodDisplay from '../../Components/FoodDisplay/FoodDisplay.jsx';
import AppDownload from '../../Components/AppDownload/AppDownload.jsx';
import CustomerReviews from '../../Components/CustomerReview/CustomerReviews.jsx'
import Feedback from '../../Components/Feedback/FeedbackForm.jsx';

export const Home = () => {
  const [category, setCategory] = useState("All");

  return (
    <div>
      <Header />
      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisplay category={category} />
      <CustomerReviews  />
      <Feedback/>
      <AppDownload />
    </div>
  );
};

export default Home;
