import React, { useState, useEffect } from 'react';

export default function NotificationTray({ notifications, removeNotification }) {
  return (
    <div style={{
      position: 'fixed',
      bottom: 24,
      right: 24,
      zIndex: 2000,
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }}>
      {notifications.map(n => (
        <div key={n.id} style={{
          background: n.type === 'success' ? '#69ff4715' : '#00e5ff15',
          border: `1px solid ${n.type === 'success' ? '#69ff4730' : '#00e5ff30'}`,
          padding: '12px 20px',
          borderRadius: 10,
          color: n.type === 'success' ? '#69ff47' : '#00e5ff',
          fontSize: 13,
          fontWeight: 600,
          boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
          backdropFilter: 'blur(10px)',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          animation: 'slideIn 0.3s ease-out'
        }}>
          <span>{n.type === 'success' ? '✅' : '🔔'}</span>
          {n.message}
          <button 
            onClick={() => removeNotification(n.id)}
            style={{ background: 'transparent', border: 'none', color: '#555', cursor: 'pointer', marginLeft: 10 }}>×</button>
        </div>
      ))}
      <style>{`
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
