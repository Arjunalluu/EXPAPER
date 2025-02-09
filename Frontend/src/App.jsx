// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SARegister from "./pages/SARegister";
import SearchQP from "./pages/SearchQP";
import UploadQP from "./pages/UploadQP";
import ARegister from "./pages/ARegister";
import SADash from "./pages/SADash";
import AdminDash from "./pages/AdminDash";
import "./styles/App.css";

function App() {
  return (
    <Router>
      {/* Animated background that occupies the screen */}
      <div className="background-anim"></div>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/SAregister" element={<SARegister />} />
          <Route path="/search" element={<SearchQP />} />
          <Route path="/upload" element={<UploadQP />} />
          <Route path="/Aregister" element={<ARegister />} />
          <Route path="/SADash" element={<SADash />} />
          <Route path="/AdminDash" element={<AdminDash />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
