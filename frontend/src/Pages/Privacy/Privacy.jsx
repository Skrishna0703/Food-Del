import React from "react";
import "./Privacy.css";

const Privacy = () => {
  return (
    <div className="privacy-page">
      <h1>Privacy Policy</h1>
      <p>
        We respect your privacy. This demo policy explains how we handle data in
        this application.
      </p>
      <h3>Information We Collect</h3>
      <p>
        - Account info you provide (name, email)
        <br />- Order details and delivery address
      </p>
      <h3>How We Use Information</h3>
      <p>
        - To process orders and provide customer support
        <br />- To improve app performance and features
      </p>
      <h3>Contact</h3>
      <p>
        For privacy questions, contact us at support@example.com.
      </p>
    </div>
  );
};

export default Privacy;


