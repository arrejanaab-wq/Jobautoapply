import React from 'react';

export default function MatchBar({ score }) {
  const color = score >= 90 ? "#69ff47" : score >= 80 ? "#ffd166" : "#ff9f43";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div style={{ flex: 1, height: 4, background: "#1a1a2e", borderRadius: 2, overflow: "hidden" }}>
        <div style={{ width: `${score}%`, height: "100%", background: color, borderRadius: 2, transition: "width 1s ease" }} />
      </div>
      <span style={{ fontSize: 12, fontWeight: 700, color, fontFamily: "monospace", minWidth: 34 }}>{score}%</span>
    </div>
  );
}
