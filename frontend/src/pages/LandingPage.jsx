import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <section className="hero-section">
        <div className="hero-content">
          <h1>Transform Your Space with AI-Powered Design</h1>
          <p>Upload a photo of your room and visualize new furniture in it instantly</p>
          <Link to="/visualize" className="button">Start Designing</Link>
        </div>
      </section>

      <section className="section">
        <h2>How It Works</h2>
        <div className="steps-grid">
          <div className="step-card">
            <img 
              src="https://furnifit.blob.core.windows.net/public/Screenshot 2025-02-23 at 11.44.50 AM.png" 
              alt="Upload Room" 
              className="step-image"
            />
            <h3>1. Upload Your Room</h3>
            <p>Take a photo of your room or upload an existing one</p>
          </div>
          <div className="step-card">
            <img 
              src="https://furnifit.blob.core.windows.net/public/Screenshot 2025-02-23 at 11.44.50 AM.png" 
              alt="Select Furniture" 
              className="step-image"
            />
            <h3>2. Choose Furniture</h3>
            <p>Browse our catalog and select furniture pieces</p>
          </div>
          <div className="step-card">
            <img 
              src="https://furnifit.blob.core.windows.net/public/Screenshot 2025-02-23 at 11.44.50 AM.png" 
              alt="Place Furniture" 
              className="step-image"
            />
            <h3>3. Place & Preview</h3>
            <p>Mark where you want the furniture and see it in your room</p>
          </div>
        </div>
      </section>

      <section className="section">
        <h2>Ready to Transform Your Space?</h2>
        <div className="cta-container">
          <Link to="/visualize" className="button">Get Started Now</Link>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
