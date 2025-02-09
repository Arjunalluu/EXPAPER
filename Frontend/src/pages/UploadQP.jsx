// src/components/UploadQP.js
import React, { useState } from "react";
import "../styles/UploadQP.css"; // Adjust the path if needed

const UploadQP = () => {
  const [formData, setFormData] = useState({
    University: "",
    year: "",
    semester: "",
    department: "",
    subject: "",
  });
  const [file, setFile] = useState(null);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.University ||
      !formData.year ||
      !formData.semester ||
      !formData.department ||
      !formData.subject ||
      !file
    ) {
      alert("Please fill in all fields and select a file");
      return;
    }
    try {
      const data = new FormData();
      data.append("University", formData.University);
      data.append("year", formData.year);
      data.append("semester", formData.semester);
      data.append("department", formData.department);
      data.append("subject", formData.subject);
      data.append("file", file);

      const response = await fetch("https://expaper.onrender.com/api/QPs/upload", {
        method: "POST",
        // No Authorization header is needed now.
        body: data,
      });

      if (!response.ok) {
        throw new Error("Failed to upload question paper");
      }

      const result = await response.json();
      alert("Question paper uploaded successfully!");
      setFormData({
        University: "",
        year: "",
        semester: "",
        department: "",
        subject: "",
      });
      setFile(null);
    } catch (error) {
      console.error("Error uploading question paper:", error);
      alert("Failed to upload question paper. Please try again.");
    }
  };

  return (
    <div className="uploadqp-container">
      <h1>Upload Question Paper</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="University">University</label>
        <input
          type="text"
          name="University"
          id="University"
          value={formData.University}
          onChange={handleChange}
        />

        <label htmlFor="year">Year</label>
        <input
          type="text"
          name="year"
          id="year"
          value={formData.year}
          onChange={handleChange}
        />

        <label htmlFor="semester">Semester</label>
        <input
          type="text"
          name="semester"
          id="semester"
          value={formData.semester}
          onChange={handleChange}
        />

        <label htmlFor="department">Department</label>
        <input
          type="text"
          name="department"
          id="department"
          value={formData.department}
          onChange={handleChange}
        />

        <label htmlFor="subject">Subject</label>
        <input
          type="text"
          name="subject"
          id="subject"
          value={formData.subject}
          onChange={handleChange}
        />

        <label htmlFor="file">Select PDF file</label>
        <input
          type="file"
          name="file"
          id="file"
          accept="application/pdf"
          onChange={handleFileChange}
        />

        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default UploadQP;
