// src/pages/Home.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

const Home = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");
  const role = localStorage.getItem("userRole");

  useEffect(() => {
    if (token && role) {
      if (role === "SuperAdmin") {
        navigate("/SADash");
      } else if (role === "Admin") {
        navigate("/AdminDash");
      }
      // Optionally, handle additional roles here if needed.
    }
  }, [token, role, navigate]);

  return (
    <div className="home-container">
      <h1>Welcome To ExPaper</h1>
      <button onClick={() => navigate("/search")}>
        <h2>Search Question Papers</h2>
      </button>
    </div>
  );
};

export default Home;
