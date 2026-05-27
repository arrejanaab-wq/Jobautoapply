import React, { useState } from 'react';
import { JobProvider, useJobs } from './context/JobContext';
import { TABS } from './data/mockData';
import Dashboard from './pages/Dashboard';
import ProfileTab from './pages/ProfileTab';
import JobFeedTab from './pages/JobFeedTab';
import SettingsTab from './pages/SettingsTab';
import Login from './pages/Login';

import JobDetailsModal from './components/JobDetailsModal';

function AppContent() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState("Dashboard");
  const { profileData } = useJobs();

  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "#070710",
      color: "#ddd",
      fontFamily: "'Sora', 'DM Sans', 'Segoe UI', sans-serif",
    }}>
      <JobDetailsModal />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;900&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: #0a0a18; } ::-webkit-scrollbar-thumb { background: #1e1e3a; border-radius: 2px; }
        input::placeholder { color: #333; }
        @keyframes scan { 0%,100%{opacity:0.4} 50%{opacity:1} }
      `}</style>

      {/* Header */}
      <div style={{ background: "#0a0a18", borderBottom: "1px solid #1a1a30", padding: "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 60 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: "linear-gradient(135deg, #00e5ff, #0066aa)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>⚡</div>
          <span style={{ fontWeight: 900, fontSize: 17, letterSpacing: -0.5 }}>JobPilot <span style={{ color: "#00e5ff" }}>AI</span></span>
          <span style={{ fontSize: 10, background: "#00e5ff20", color: "#00e5ff", border: "1px solid #00e5ff30", borderRadius: 4, padding: "2px 7px", marginLeft: 4, fontWeight: 700, letterSpacing: 1 }}>BETA</span>
        </div>
        <nav style={{ display: "flex", gap: 4 }}>
          {TABS.map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{
              background: activeTab === tab ? "#00e5ff12" : "transparent",
              border: "none", borderRadius: 8, padding: "7px 16px",
              color: activeTab === tab ? "#00e5ff" : "#555",
              fontSize: 13, fontWeight: activeTab === tab ? 700 : 400,
              cursor: "pointer", transition: "all 0.2s",
              borderBottom: activeTab === tab ? "2px solid #00e5ff" : "2px solid transparent"
            }}>{tab}</button>
          ))}
        </nav>
        <div style={{ display: "flex", alignItems: "center", gap: 15 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#69ff47", boxShadow: "0 0 8px #69ff47", animation: "scan 2s infinite" }} />
            <span style={{ fontSize: 11, color: "#69ff47", fontFamily: "monospace", fontWeight: 700 }}>RUNNING</span>
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg, #1a1a3a, #2a2a5a)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, border: "1px solid #2a2a4a" }}>
              {profileData.name ? profileData.name[0] : 'V'}
            </div>
          </div>
          <button 
            onClick={() => setIsLoggedIn(false)}
            style={{
              background: "transparent", border: "1px solid #2a2a4a", borderRadius: 6,
              padding: "4px 10px", color: "#555", fontSize: 11, cursor: "pointer",
              transition: "all 0.2s"
            }}
            onMouseEnter={e => e.currentTarget.style.color = "#ff6b6b"}
            onMouseLeave={e => e.currentTarget.style.color = "#555"}
          >LOGOUT</button>
        </div>
      </div>

      {/* Main */}
      <div style={{ padding: "28px 32px", maxWidth: 1100, margin: "0 auto" }}>
        {/* Page Title */}
        <div style={{ marginBottom: 24 }}>
          <h1 style={{ fontSize: 22, fontWeight: 900, color: "#eee", margin: 0, letterSpacing: -0.5 }}>{activeTab}</h1>
          <div style={{ fontSize: 12, color: "#444", marginTop: 4 }}>
            {activeTab === "Dashboard" && "Real-time job matching & auto-apply engine"}
            {activeTab === "My Profile" && "Your profile powers all auto-applications — keep it updated"}
            {activeTab === "Job Feed" && "All matched jobs, ranked by compatibility with your profile"}
            {activeTab === "Applications" && "Track every application submitted on your behalf"}
            {activeTab === "Settings" && "Control your automation rules & preferences"}
          </div>
        </div>

        {activeTab === "Dashboard" && <Dashboard setActiveTab={setActiveTab} />}
        {activeTab === "My Profile" && <ProfileTab />}
        {activeTab === "Job Feed" && <JobFeedTab />}
        {activeTab === "Applications" && <JobFeedTab filter="Auto-Applied" />}
        {activeTab === "Settings" && <SettingsTab />}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <JobProvider>
      <AppContent />
    </JobProvider>
  );
}
