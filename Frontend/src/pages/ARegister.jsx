// src/components/Aregister.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "../styles/ARegister.css";
import "react-toastify/dist/ReactToastify.css";

const Aregister = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    phoneNo: "",
    email: "",
    password: "",
    collage: "",
    University: "",
    department: "",
    Address: "",   
    gender: "",   
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("https://expaper.onrender.com/api/auth/Aregister", formData);
      const result = response.data;
      if (response.status === 201) {
        toast.success(result.message || "Admin registered successfully!");
        // Optionally navigate to login or dashboard
        navigate("/login");
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
    <div className="admin-register-container">
      <h2>Admin Register</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          name="firstname"
          placeholder="First Name"
          value={formData.firstname}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="lastname"
          placeholder="Last Name"
          value={formData.lastname}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="phoneNo"
          placeholder="Phone Number"
          value={formData.phoneNo}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="collage"
          placeholder="Collage"
          value={formData.collage}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="University"
          placeholder="University"
          value={formData.University}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="department"
          placeholder="Department"
          value={formData.department}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="Address"
          placeholder="Address"
          value={formData.Address}
          onChange={handleChange}
          required
        />
        <select name="gender" value={formData.gender} onChange={handleChange} required>
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        <button type="submit">Register</button>
      </form>
      {message && <p className="message">{message}</p>}
      <ToastContainer />
    </div>
  );
};

export default Aregister;
