import React from 'react';

const map = {
  "Auto-Applied": { bg: "#69ff4720", color: "#69ff47", border: "#69ff4740" },
  "Shortlisted": { bg: "#00e5ff20", color: "#00e5ff", border: "#00e5ff40" },
  "Pending Review": { bg: "#ffd16620", color: "#ffd166", border: "#ffd16640" },
};

export default function StatusBadge({ status }) {
  const s = map[status] || map["Pending Review"];
  return (
    <span style={{
      fontSize: 10, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase",
      background: s.bg, color: s.color, border: `1px solid ${s.border}`,
      borderRadius: 4, padding: "2px 8px", fontFamily: "monospace"
    }}>{status}</span>
  );
}
