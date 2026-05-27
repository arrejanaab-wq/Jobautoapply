import React, { useState, useRef } from 'react';
import { useJobs } from '../context/JobContext';

export default function ProfileTab() {
  const { profileData, updateProfile } = useJobs();
  const fileRef = useRef();
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(!!profileData.resumeFile);

  const handleFile = (file) => {
    if (!file) return;
    setUploading(true);
    setUploaded(false);
    
    // Simulate AI Parsing
    setTimeout(() => {
      setUploading(false);
      setUploaded(true);
      
      // Update profile with "parsed" data based on the file name or just a sample
      updateProfile({ 
        resumeFile: file.name,
        name: "Vishal Singh", // Mock extraction
        role: "Senior React Developer", // Mock extraction
        skills: "React, Node.js, TypeScript, AWS, Tailwind CSS", // Mock extraction
        locations: "Remote, Bangalore"
      });
    }, 3000);
  };

  const fields = [
    { label: "Full Name", key: "name", placeholder: "Vishal Singh" },
    { label: "Current Role", key: "role", placeholder: "Fleet Tech / ELD Compliance" },
    { label: "Target Job Titles", key: "targetRoles", placeholder: "ELD Specialist, Fleet Manager, Logistics Tech..." },
    { label: "Skills (comma separated)", key: "skills", placeholder: "ELD, Fleet Management, SaaS, GPS Telematics..." },
    { label: "Preferred Locations", key: "locations", placeholder: "Bangalore, Remote, Mumbai..." },
    { label: "Expected CTC (LPA)", key: "salary", placeholder: "10–15 LPA" },
  ];

  return (
    <div style={{ maxWidth: 720 }}>
      <div style={{ fontSize: 11, color: "#555", letterSpacing: 2, fontWeight: 700, marginBottom: 20, textTransform: "uppercase" }}>Your Profile — Powers All Auto-Applications</div>

      {/* Resume Upload */}
      <div
        onDragOver={e => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={e => { e.preventDefault(); setDragging(false); handleFile(e.dataTransfer.files[0]); }}
        onClick={() => fileRef.current.click()}
        style={{
          border: `2px dashed ${dragging ? "#00e5ff" : uploaded ? "#69ff47" : "#2a2a4a"}`,
          borderRadius: 14, padding: "30px 20px", textAlign: "center",
          background: dragging ? "#00e5ff08" : uploaded ? "#69ff4708" : "#0a0a18",
          cursor: "pointer", marginBottom: 24, transition: "all 0.3s"
        }}>
        <input ref={fileRef} type="file" accept=".pdf,.docx" style={{ display: "none" }} onChange={e => handleFile(e.target.files[0])} />
        {uploading ? (
          <div>
            <div style={{ fontSize: 28, marginBottom: 8 }}>⏳</div>
            <div style={{ color: "#00e5ff", fontSize: 14 }}>Parsing your resume with AI…</div>
            <div style={{ fontSize: 11, color: "#555", marginTop: 4 }}>Extracting skills, experience, keywords</div>
          </div>
        ) : uploaded ? (
          <div>
            <div style={{ fontSize: 28, marginBottom: 8 }}>✅</div>
            <div style={{ color: "#69ff47", fontSize: 14, fontWeight: 700 }}>{profileData.resumeFile || "Resume"} — Profile Synced!</div>
            <div style={{ fontSize: 11, color: "#555", marginTop: 4 }}>AI has extracted your profile. Drop a new file to update.</div>
          </div>
        ) : (
          <div>
            <div style={{ fontSize: 36, marginBottom: 8 }}>📄</div>
            <div style={{ color: "#888", fontSize: 14 }}>Drop your Resume / CV here</div>
            <div style={{ fontSize: 11, color: "#444", marginTop: 4 }}>PDF or DOCX · AI will parse everything automatically</div>
          </div>
        )}
      </div>

      {/* Profile Fields */}
      {fields.map(field => (
        <div key={field.key} style={{ marginBottom: 14 }}>
          <label style={{ fontSize: 11, color: "#555", letterSpacing: 1, textTransform: "uppercase", fontWeight: 700, display: "block", marginBottom: 6 }}>{field.label}</label>
          <input
            value={profileData[field.key] || ""}
            onChange={e => updateProfile({ [field.key]: e.target.value })}
            placeholder={field.placeholder}
            style={{
              width: "100%", background: "#0d0d1a", border: "1px solid #1e1e3a",
              borderRadius: 8, padding: "10px 14px", color: "#ddd", fontSize: 13,
              outline: "none", boxSizing: "border-box", fontFamily: "inherit"
            }}
          />
        </div>
      ))}

      <button style={{
        marginTop: 10, background: "linear-gradient(135deg, #00e5ff, #0088aa)",
        border: "none", borderRadius: 10, padding: "13px 32px",
        color: "#000", fontWeight: 900, fontSize: 14, cursor: "pointer", letterSpacing: 1
      }}>SAVE & ACTIVATE AUTO-APPLY →</button>
    </div>
  );
}
