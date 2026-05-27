import React, { useState } from 'react';
import { useJobs } from '../context/JobContext';
import MatchBar from '../components/MatchBar';
import StatusBadge from '../components/StatusBadge';

export default function JobFeedTab({ filter: initialFilter = "All" }) {
  const { jobs, loading, fetchRealJobs, setJobs, setLoading, profileData, setSelectedJob } = useJobs();
  const [filter, setFilter] = useState(initialFilter);
  const [searchQuery, setSearchQuery] = useState(profileData.role);
  const [searchLocation, setSearchLocation] = useState(profileData.locations);

  const filters = ["All", "Auto-Applied", "Shortlisted", "Pending Review"];
  const filtered = filter === "All" ? jobs : jobs.filter(j => j.status === filter);

  const handleSearch = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    const query = `${searchQuery} in ${searchLocation}`;
    const realJobs = await fetchRealJobs(query);
    if (realJobs.length > 0) {
      setJobs(realJobs);
    }
    setLoading(false);
  };

  return (
    <div>
      {/* Search Bar */}
      <form onSubmit={handleSearch} style={{
        display: "flex", gap: 10, marginBottom: 20, background: "#0d0d1a",
        padding: "15px", borderRadius: 12, border: "1px solid #1e1e3a"
      }}>
        <input 
          type="text" 
          placeholder="Job Title (e.g. React Developer)" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            flex: 2, background: "#1a1a2e", border: "1px solid #2a2a4a",
            borderRadius: 8, padding: "10px 15px", color: "#eee", fontSize: 13
          }}
        />
        <input 
          type="text" 
          placeholder="Location (e.g. Remote)" 
          value={searchLocation}
          onChange={(e) => setSearchLocation(e.target.value)}
          style={{
            flex: 1, background: "#1a1a2e", border: "1px solid #2a2a4a",
            borderRadius: 8, padding: "10px 15px", color: "#eee", fontSize: 13
          }}
        />
        <button 
          type="submit"
          disabled={loading}
          style={{
            background: "#00e5ff", border: "none", borderRadius: 8,
            padding: "10px 20px", color: "#000", fontWeight: 700,
            cursor: "pointer", opacity: loading ? 0.5 : 1
          }}>
          {loading ? "SEARCHING..." : "SEARCH"}
        </button>
      </form>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div style={{ display: "flex", gap: 8 }}>
          {filters.map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{
              background: filter === f ? "#00e5ff" : "transparent",
              border: `1px solid ${filter === f ? "#00e5ff" : "#1e1e3a"}`,
              borderRadius: 20, padding: "6px 16px", color: filter === f ? "#000" : "#666",
              fontSize: 12, cursor: "pointer", fontWeight: filter === f ? 700 : 400, transition: "all 0.2s"
            }}>{f}</button>
          ))}
        </div>
        <button 
          onClick={refreshJobs}
          disabled={loading}
          style={{
            background: "transparent", border: "1px solid #1e1e3a", borderRadius: 8,
            padding: "6px 12px", color: "#00e5ff", fontSize: 11, cursor: "pointer",
            opacity: loading ? 0.5 : 1
          }}>
          {loading ? "FETCHING..." : "🔄 REFRESH"}
        </button>
      </div>

      {loading && (
        <div style={{ textAlign: "center", padding: "40px", color: "#00e5ff", fontFamily: "monospace", letterSpacing: 2 }}>
          SCANNING FOR REAL-TIME JOBS...
        </div>
      )}

      {!loading && filtered.length === 0 && (
        <div style={{ textAlign: "center", padding: "40px", color: "#555" }}>
          No jobs found for this filter.
        </div>
      )}

      {!loading && filtered.map(job => (
        <div key={job.id} 
          onClick={() => setSelectedJob(job)}
          style={{
            background: "#0d0d1a", border: "1px solid #1e1e3a", borderRadius: 12,
            padding: "18px 20px", marginBottom: 12, cursor: "pointer"
          }}
          onMouseEnter={e => e.currentTarget.style.borderColor = "#00e5ff44"}
          onMouseLeave={e => e.currentTarget.style.borderColor = "#1e1e3a"}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <div style={{ fontWeight: 800, color: "#eee", fontSize: 15 }}>{job.title}</div>
              <div style={{ fontSize: 12, color: "#777", marginTop: 3 }}>{job.company} · {job.location}</div>
              <div style={{ fontSize: 11, color: "#555", marginTop: 2, fontFamily: "monospace" }}>via {job.platform} · {job.time}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <StatusBadge status={job.status} />
              <div style={{ fontSize: 13, color: "#ffd166", fontWeight: 700, marginTop: 8 }}>{job.salary}</div>
            </div>
          </div>
          <div style={{ marginTop: 12 }}>
            <MatchBar score={job.match} />
          </div>
          <div style={{ display: "flex", gap: 6, marginTop: 10, flexWrap: "wrap" }}>
            {job.tags.map(t => (
              <span key={t} style={{ fontSize: 11, background: "#1a1a2e", color: "#888", border: "1px solid #2a2a4a", borderRadius: 4, padding: "2px 8px" }}>{t}</span>
            ))}
          </div>
          <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
            <button 
              onClick={(e) => { e.stopPropagation(); setSelectedJob(job); }}
              style={{ background: "#69ff4715", border: "1px solid #69ff4730", borderRadius: 8, padding: "7px 18px", color: "#69ff47", fontSize: 12, cursor: "pointer", fontWeight: 700 }}>
              {job.status === "Auto-Applied" ? "View Application" : "Quick Apply"}
            </button>
            <button 
              onClick={(e) => e.stopPropagation()}
              style={{ background: "transparent", border: "1px solid #1e1e3a", borderRadius: 8, padding: "7px 18px", color: "#555", fontSize: 12, cursor: "pointer" }}>Skip</button>
          </div>
        </div>
      ))}
    </div>
  );
}
