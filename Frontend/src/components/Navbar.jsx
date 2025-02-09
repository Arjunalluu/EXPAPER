// src/components/Navbar.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  // Check if the user is authenticated by checking for the auth token in localStorage
  const isAuthenticated = () => {
    return localStorage.getItem("authToken") !== null;
  };

  // Get the user role in lowercase (if any)
  const userRole = localStorage.getItem("userRole")?.toLowerCase();

  // Determine the home link based on authentication status and role
  const homeLink = isAuthenticated()
    ? userRole === "admin"
      ? "/AdminDash"
      : userRole === "superadmin"
      ? "/SADash"
      : "/"
    : "/";

  // Handle user logout: clear localStorage and navigate to the login page
  const handleLogout = async () => {
    try {
      // Optionally, call your backend to invalidate the session
      await fetch("http://localhost:5001/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      // Clear authentication details from localStorage
      localStorage.removeItem("authToken");
      localStorage.removeItem("userRole");

      // Navigate to the login page
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div className="navbar">
      {/* Home link based on role */}
      <Link to={homeLink}>
        <h1>ExPaper</h1>
      </Link>
      <nav>
        <Link to={homeLink}>Home</Link>
        <Link to="/search">Search</Link>
        {/* Render the Upload link only if the user is authenticated */}
        {isAuthenticated() && <Link to="/upload">Upload</Link>}
        {isAuthenticated() ? (
          <li className="btn-logout">
            <button onClick={handleLogout}>Logout</button>
          </li>
        ) : (
          <>
            <li className="btn-login">
              <Link to="/login">Login</Link>
            </li>
          </>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
