// src/components/Login.jsx
import React, { useState } from 'react';
import "../styles/Login.css";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(''); // Role selected from the dropdown
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    const data = { email, password };

    let url = '';
    const roleLower = role.toLowerCase();

    // Validate role selection
    if (roleLower !== 'admin' && roleLower !== 'superadmin') {
      setMessage("Please select a valid role: Admin or SuperAdmin");
      return;
    }

    // Determine the URL based on role selection
    if (roleLower === "superadmin") {
      url = "http://localhost:5001/api/auth/SAlogin";
    } else if (roleLower === "admin") {
      // Change this endpoint if your admin login URL is different.
      url = "http://localhost:5001/api/auth/Alogin";
    }

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (response.ok) {
        const token = result.token;
        // Save token and role in localStorage
        localStorage.setItem("authToken", token);
        localStorage.setItem("userRole", roleLower);
        setMessage('Login successful');

        // Redirect based on the role selected (instead of decoding the token)
        if (roleLower === "admin") {
          window.location.href = "/AdminDash";
        } else if (roleLower === "superadmin") {
          window.location.href = "/SADash";
        }
      } else {
        setMessage(result.message);
      }
    } catch (error) {
      setMessage('Error: ' + error.message);
    }
  };

  return (
    <div className="sa-login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
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
        <select value={role} onChange={(e) => setRole(e.target.value)} required>
          <option value="">Select Role</option>
          <option value="Admin">Admin</option>
          <option value="SuperAdmin">SuperAdmin</option>
        </select>
        <button type="submit">Login</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default Login;
