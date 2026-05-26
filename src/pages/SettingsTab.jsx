import React from 'react';
import { useJobs } from '../context/JobContext';

export default function SettingsTab() {
  const { settings, updateSettings } = useJobs();

  const Toggle = ({ val, onToggle }) => (
    <div onClick={onToggle} style={{
      width: 44, height: 24, borderRadius: 12,
      background: val ? "#69ff47" : "#1a1a2e",
      cursor: "pointer", position: "relative", transition: "background 0.3s",
      border: `1px solid ${val ? "#69ff47" : "#2a2a4a"}`
    }}>
      <div style={{
        width: 18, height: 18, borderRadius: "50%", background: "#fff",
        position: "absolute", top: 2, left: val ? 22 : 2, transition: "left 0.3s"
      }} />
    </div>
  );

  return (
    <div style={{ maxWidth: 560 }}>
      {[
        { label: "Auto-Apply to matched jobs", desc: "Automatically submit applications for jobs above your match threshold", key: "autoApply" },
        { label: "Email Notifications", desc: "Get notified when applied or shortlisted", key: "notify" },
      ].map(row => (
        <div key={row.label} style={{ background: "#0d0d1a", border: "1px solid #1e1e3a", borderRadius: 12, padding: "18px 20px", marginBottom: 12, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontWeight: 700, color: "#ddd", fontSize: 14 }}>{row.label}</div>
            <div style={{ fontSize: 12, color: "#555", marginTop: 3 }}>{row.desc}</div>
          </div>
          <Toggle val={settings[row.key]} onToggle={() => updateSettings({ [row.key]: !settings[row.key] })} />
        </div>
      ))}

      <div style={{ background: "#0d0d1a", border: "1px solid #1e1e3a", borderRadius: 12, padding: "18px 20px", marginBottom: 12 }}>
        <div style={{ fontWeight: 700, color: "#ddd", fontSize: 14, marginBottom: 4 }}>Minimum Match Score to Auto-Apply</div>
        <div style={{ fontSize: 12, color: "#555", marginBottom: 14 }}>Only apply to jobs above this threshold</div>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <input type="range" min={50} max={99} value={settings.minMatch} onChange={e => updateSettings({ minMatch: +e.target.value })}
            style={{ flex: 1, accentColor: "#00e5ff" }} />
          <span style={{ fontSize: 20, fontWeight: 900, color: "#00e5ff", fontFamily: "monospace", minWidth: 42 }}>{settings.minMatch}%</span>
        </div>
      </div>

      <div style={{ background: "#0d0d1a", border: "1px solid #1e1e3a", borderRadius: 12, padding: "18px 20px" }}>
        <div style={{ fontWeight: 700, color: "#ddd", fontSize: 14, marginBottom: 12 }}>Blacklisted Companies</div>
        <input placeholder="Add company name to exclude..." style={{
          width: "100%", background: "#0a0a18", border: "1px solid #1e1e3a",
          borderRadius: 8, padding: "9px 12px", color: "#888", fontSize: 13,
          outline: "none", boxSizing: "border-box"
        }} />
      </div>
    </div>
  );
}
