// src/components/SearchQP.js
import React, { useState } from "react";
import "../styles/SearchQP.css"; // Adjust the path if needed

const SearchQP = () => {
  const [formData, setFormData] = useState({
    University: "",
    year: "",
    semester: "",
    department: "",
    subject: "",
  });

  // State to store the PDF blob URL for preview/download
  const [pdfUrl, setPdfUrl] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSearch = async (e) => {
    e.preventDefault();
    const { University, year, semester, department, subject } = formData;
    if (!University || !year || !semester || !department || !subject) {
      alert("Please fill all fields");
      return;
    }
    try {
      const queryParams = new URLSearchParams({
        university: University,
        year,
        semester,
        department,
        subject,
      }).toString();

      const response = await fetch(
        `http://localhost:5001/api/QPs/download?${queryParams}`,
        { method: "GET" }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch question paper");
      }

      // Get the PDF as a blob and create an object URL for preview
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      setPdfUrl(url);
    } catch (error) {
      console.error("Error fetching question paper:", error);
      alert("Failed to fetch question paper. Please try again.");
    }
  };

  // Function to trigger download of the PDF
  const handleDownload = () => {
    if (!pdfUrl) return;
    const a = document.createElement("a");
    a.href = pdfUrl;
    a.download = `${formData.subject}_QuestionPaper.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="searchqp-container">
      <h1>Search Question Paper</h1>
      <form onSubmit={handleSearch}>
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

        <button type="submit">Search</button>
      </form>

      {/* Display the preview and download button if a PDF URL is available */}
      {pdfUrl && (
        <div className="pdf-preview">
          <h2>Question Paper Preview</h2>
          <embed
            src={pdfUrl}
            type="application/pdf"
            width="100%"
            height="600px"
          />
          <button onClick={handleDownload}>Download</button>
        </div>
      )}
    </div>
  );
};

export default SearchQP;
