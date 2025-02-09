import React from 'react';
import "../styles/AdminDash.css";
const AdminDash = () => {
  const handleUploadQP = () => {
    navigate("/upload"); // Change this route if needed
  };
  return (
    <div className="admin-dashboard">
      <h1>Welcome to Admin Dashboard</h1>
      <div className="dashboard-buttons">
      <button onClick={handleUploadQP}>Upload Question Paper</button>
      </div>
      </div>
  );
};

export default AdminDash;
