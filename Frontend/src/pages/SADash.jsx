// src/components/SADash.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/SADash.css";

const SADash = () => {
  const navigate = useNavigate();

  // Handler to navigate to the admin registration page
  const handleCreateAdmin = () => {
    navigate("/Aregister"); // Change this route if your admin registration page route is different
  };

  // Handler to navigate to the upload question paper page
  const handleUploadQP = () => {
    navigate("/upload"); // Change this route if needed
  };

  return (
    <div className="sa-dashboard">
      <h1>Welcome to SuperAdmin Dashboard</h1>
      <div className="dashboard-buttons">
        <button onClick={handleCreateAdmin}>Create Admin</button>
        <button onClick={handleUploadQP}>Upload Question Paper</button>
      </div>
    </div>
  );
};

export default SADash;
