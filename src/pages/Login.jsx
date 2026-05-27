import React, { useState } from 'react';

export default function Login({ onLogin }) {
  const [view, setView] = useState('login'); // 'login' or 'forgot'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [resetSent, setResetSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (view === 'login') {
      if (email && password) onLogin({ email });
    } else {
      setResetSent(true);
      setTimeout(() => {
        setResetSent(false);
        setView('login');
      }, 3000);
    }
  };

  if (view === 'forgot') {
    return (
      <div style={containerStyle}>
        <div style={cardStyle}>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <div style={logoStyle}>🔒</div>
            <h1 style={titleStyle}>Reset Password</h1>
            <p style={subtitleStyle}>Enter your email to receive a password reset link</p>
          </div>

          {resetSent ? (
            <div style={{ textAlign: "center", color: "#69ff47", padding: "20px", background: "#69ff4710", borderRadius: 8, border: "1px solid #69ff4730" }}>
              ✅ Reset link sent to your email!
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: 24 }}>
                <label style={labelStyle}>Email Address</label>
                <input
                  type="email" required value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com" style={inputStyle}
                />
              </div>
              <button type="submit" style={buttonStyle}>SEND RESET LINK</button>
              <div onClick={() => setView('login')} style={{ textAlign: "center", marginTop: 20, color: "#555", fontSize: 13, cursor: "pointer" }}>
                ← Back to Login
              </div>
            </form>
          )}
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={logoStyle}>⚡</div>
          <h1 style={titleStyle}>Welcome to JobPilot <span style={{ color: "#00e5ff" }}>AI</span></h1>
          <p style={subtitleStyle}>Log in to access your automated job application engine</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 20 }}>
            <label style={labelStyle}>Email Address</label>
            <input
              type="email" required value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com" style={inputStyle}
            />
          </div>
          
          <div style={{ marginBottom: 10 }}>
            <label style={labelStyle}>Password</label>
            <input
              type="password" required value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••" style={inputStyle}
            />
          </div>

          <div 
            onClick={() => setView('forgot')}
            style={{ textAlign: "right", marginBottom: 24, color: "#00e5ff", fontSize: 12, cursor: "pointer", fontWeight: 600 }}
          >
            Forgot Password?
          </div>

          <button type="submit" style={buttonStyle}>
            LOG IN TO DASHBOARD →
          </button>
        </form>
      </div>
    </div>
  );
}

const containerStyle = {
  minHeight: "100vh", background: "#070710", display: "flex",
  alignItems: "center", justifyContent: "center",
  fontFamily: "'Sora', 'DM Sans', 'Segoe UI', sans-serif"
};

const cardStyle = {
  background: "#0d0d1a", padding: "40px", borderRadius: "16px",
  border: "1px solid #1e1e3a", width: "100%", maxWidth: "400px",
  boxShadow: "0 0 40px rgba(0, 229, 255, 0.05)"
};

const logoStyle = {
  width: 48, height: 48, margin: "0 auto 16px", borderRadius: 12,
  background: "linear-gradient(135deg, #00e5ff, #0066aa)",
  display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24
};

const titleStyle = { fontSize: 24, fontWeight: 900, color: "#eee", margin: 0, letterSpacing: -0.5 };
const subtitleStyle = { fontSize: 13, color: "#888", marginTop: 8 };
const labelStyle = { fontSize: 11, color: "#555", letterSpacing: 1, textTransform: "uppercase", fontWeight: 700, display: "block", marginBottom: 8 };
const inputStyle = { width: "100%", background: "#0a0a18", border: "1px solid #1e1e3a", borderRadius: 8, padding: "12px 16px", color: "#ddd", fontSize: 14, outline: "none", boxSizing: "border-box" };
const buttonStyle = { width: "100%", background: "linear-gradient(135deg, #00e5ff, #0088aa)", border: "none", borderRadius: 10, padding: "14px", color: "#000", fontWeight: 900, fontSize: 14, cursor: "pointer", letterSpacing: 1, transition: "opacity 0.2s" };
