import React, { useState } from 'react';
import { useJobs } from '../context/JobContext';
import MatchBar from '../components/MatchBar';
import StatusBadge from '../components/StatusBadge';

export default function JobFeedTab({ filter: initialFilter = "All" }) {
  const { jobs } = useJobs();
  const [filter, setFilter] = useState(initialFilter);
  const filters = ["All", "Auto-Applied", "Shortlisted", "Pending Review"];
  const filtered = filter === "All" ? jobs : jobs.filter(j => j.status === filter);

  return (
    <div>
      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        {filters.map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{
            background: filter === f ? "#00e5ff" : "transparent",
            border: `1px solid ${filter === f ? "#00e5ff" : "#1e1e3a"}`,
            borderRadius: 20, padding: "6px 16px", color: filter === f ? "#000" : "#666",
            fontSize: 12, cursor: "pointer", fontWeight: filter === f ? 700 : 400, transition: "all 0.2s"
          }}>{f}</button>
        ))}
      </div>
      {filtered.map(job => (
        <div key={job.id} style={{
          background: "#0d0d1a", border: "1px solid #1e1e3a", borderRadius: 12,
          padding: "18px 20px", marginBottom: 12
        }}>
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
            <button style={{ background: "#69ff4715", border: "1px solid #69ff4730", borderRadius: 8, padding: "7px 18px", color: "#69ff47", fontSize: 12, cursor: "pointer", fontWeight: 700 }}>View Application</button>
            <button style={{ background: "transparent", border: "1px solid #1e1e3a", borderRadius: 8, padding: "7px 18px", color: "#555", fontSize: 12, cursor: "pointer" }}>Skip</button>
          </div>
        </div>
      ))}
    </div>
  );
}
