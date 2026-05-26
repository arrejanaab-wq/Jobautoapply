import React, { useState, useEffect } from 'react';
import { useJobs } from '../context/JobContext';
import MatchBar from '../components/MatchBar';
import StatusBadge from '../components/StatusBadge';

export default function Dashboard({ setActiveTab }) {
  const { jobs, stats, platforms } = useJobs();
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setPulse(p => !p), 2000);
    return () => clearInterval(t);
  }, []);

  return (
    <div>
      {/* Stats Row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 28 }}>
        {stats.map(s => (
          <div key={s.label} style={{
            background: "linear-gradient(135deg, #0d0d1a 0%, #13132b 100%)",
            border: `1px solid ${s.color}22`,
            borderRadius: 12, padding: "18px 20px",
            boxShadow: `0 0 20px ${s.color}10`
          }}>
            <div style={{ fontSize: 28, fontWeight: 900, color: s.color, fontFamily: "monospace", lineHeight: 1 }}>{s.value}</div>
            <div style={{ fontSize: 11, color: "#666", marginTop: 4, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase" }}>{s.label}</div>
            <div style={{ fontSize: 11, color: s.color, marginTop: 6, opacity: 0.8 }}>{s.delta}</div>
          </div>
        ))}
      </div>

      {/* Live Feed + Platforms */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 20 }}>
        {/* Job Feed */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
            <div style={{
              width: 8, height: 8, borderRadius: "50%", background: "#69ff47",
              boxShadow: pulse ? "0 0 12px #69ff47" : "0 0 4px #69ff47",
              transition: "box-shadow 0.5s"
            }} />
            <span style={{ fontSize: 11, color: "#69ff47", fontFamily: "monospace", letterSpacing: 2, fontWeight: 700 }}>LIVE JOB MATCHES</span>
          </div>
          {jobs.slice(0, 4).map(job => (
            <div key={job.id} style={{
              background: "#0d0d1a", border: "1px solid #1e1e3a", borderRadius: 10,
              padding: "14px 16px", marginBottom: 10, transition: "border-color 0.2s",
              cursor: "pointer"
            }}
              onMouseEnter={e => e.currentTarget.style.borderColor = "#00e5ff44"}
              onMouseLeave={e => e.currentTarget.style.borderColor = "#1e1e3a"}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <div style={{ fontWeight: 700, color: "#eee", fontSize: 14 }}>{job.title}</div>
                  <div style={{ fontSize: 12, color: "#888", marginTop: 2 }}>{job.company} · {job.location}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <StatusBadge status={job.status} />
                  <div style={{ fontSize: 10, color: "#555", marginTop: 4, fontFamily: "monospace" }}>{job.time}</div>
                </div>
              </div>
              <div style={{ marginTop: 10 }}>
                <MatchBar score={job.match} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 10 }}>
                <div style={{ display: "flex", gap: 6 }}>
                  {job.tags.map(t => (
                    <span key={t} style={{ fontSize: 10, background: "#1a1a2e", color: "#888", border: "1px solid #2a2a4a", borderRadius: 4, padding: "2px 7px" }}>{t}</span>
                  ))}
                </div>
                <div style={{ fontSize: 11, color: "#ffd166", fontWeight: 700 }}>{job.salary}</div>
              </div>
            </div>
          ))}
          <button
            onClick={() => setActiveTab("Job Feed")}
            style={{
              width: "100%", background: "transparent", border: "1px dashed #1e1e3a",
              borderRadius: 10, padding: "10px", color: "#555", fontSize: 12,
              cursor: "pointer", letterSpacing: 1
            }}>
            VIEW ALL {jobs.length} MATCHES →
          </button>
        </div>

        {/* Platforms */}
        <div>
          <div style={{ fontSize: 11, color: "#555", letterSpacing: 2, fontWeight: 700, marginBottom: 14, textTransform: "uppercase" }}>Connected Platforms</div>
          {platforms.map(p => (
            <div key={p.name} style={{
              background: "#0d0d1a", border: `1px solid ${p.connected ? "#1e1e3a" : "#2a1a1a"}`,
              borderRadius: 10, padding: "11px 14px", marginBottom: 8,
              display: "flex", alignItems: "center", justifyContent: "space-between"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 18 }}>{p.icon}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: p.connected ? "#ddd" : "#555" }}>{p.name}</div>
                  {p.connected && <div style={{ fontSize: 10, color: "#444", fontFamily: "monospace" }}>{p.jobs} active jobs</div>}
                </div>
              </div>
              <div style={{
                width: 8, height: 8, borderRadius: "50%",
                background: p.connected ? "#69ff47" : "#333",
                boxShadow: p.connected ? "0 0 6px #69ff47" : "none"
              }} />
            </div>
          ))}
          <button style={{
            width: "100%", background: "linear-gradient(135deg, #00e5ff15, #00e5ff05)",
            border: "1px solid #00e5ff30", borderRadius: 10, padding: "10px",
            color: "#00e5ff", fontSize: 12, cursor: "pointer", fontWeight: 700, letterSpacing: 1
          }}>+ ADD PLATFORM</button>
        </div>
      </div>
    </div>
  );
}
