// src/components/SARegister.jsx
import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "../styles/SARegister.css";
import "react-toastify/dist/ReactToastify.css";

const SARegister = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    const data = { email, password };

    try {
      const response = await axios.post(
        "https://expaper.onrender.com/api/auth/SAregister",
        data
      );
      const result = response.data;
      if (response.status === 201 || response.status === 200) {
        toast.success(result.message || "SuperAdmin registered successfully!");
        // Optionally, navigate to a login or dashboard page here
      } else {
        toast.error(result.message || "Registration failed.");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Registration failed. Please try again."
      );
    }
  };

  return (
    <div className="sa-register-container">
      <h2>SuperAdmin Register</h2>
      <form onSubmit={handleRegister}>
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Register</button>
      </form>
      {message && <p className="message">{message}</p>}
      <ToastContainer />
    </div>
  );
};

export default SARegister;
