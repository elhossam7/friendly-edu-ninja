import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <h1>Welcome to EduManager</h1>
      <p>Transform your institution's management with our all-in-one platform.</p>
      <button onClick={() => navigate("/login")} className="btn">Start Trial</button>
      <button onClick={() => navigate("/login")} className="btn">Get Started</button>
    </div>
  );
};

export default HomePage;