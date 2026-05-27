import React from 'react';
import { useJobs } from '../context/JobContext';
import StatusBadge from './StatusBadge';
import MatchBar from './MatchBar';

export default function JobDetailsModal() {
  const { selectedJob, setSelectedJob } = useJobs();

  if (!selectedJob) return null;

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center',
      justifyContent: 'center', zIndex: 1000, padding: 20,
      backdropFilter: 'blur(5px)'
    }} onClick={() => setSelectedJob(null)}>
      <div style={{
        background: '#0d0d1a', border: '1px solid #1e1e3a',
        borderRadius: 20, width: '100%', maxWidth: 600, padding: 32,
        position: 'relative', boxShadow: '0 0 50px rgba(0, 229, 255, 0.1)'
      }} onClick={e => e.stopPropagation()}>
        <button 
          onClick={() => setSelectedJob(null)}
          style={{
            position: 'absolute', top: 20, right: 20, background: 'transparent',
            border: 'none', color: '#555', fontSize: 24, cursor: 'pointer'
          }}
        >×</button>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
          <div>
            <h2 style={{ fontSize: 22, fontWeight: 900, color: '#eee', margin: 0 }}>{selectedJob.title}</h2>
            <div style={{ fontSize: 14, color: '#00e5ff', marginTop: 4, fontWeight: 600 }}>{selectedJob.company}</div>
            <div style={{ fontSize: 12, color: '#888', marginTop: 2 }}>{selectedJob.location} · via {selectedJob.platform}</div>
          </div>
          <StatusBadge status={selectedJob.status} />
        </div>

        <div style={{ background: '#070710', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <div style={{ fontSize: 11, color: '#555', textTransform: 'uppercase', letterSpacing: 1, fontWeight: 700, marginBottom: 10 }}>Match Analysis</div>
          <MatchBar score={selectedJob.match} />
          <div style={{ fontSize: 12, color: '#888', marginTop: 12, lineHeight: 1.5 }}>
            This job matches your profile skills (<b>{selectedJob.tags.join(', ')}</b>) and role preferences.
          </div>
        </div>

        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 11, color: '#555', textTransform: 'uppercase', letterSpacing: 1, fontWeight: 700, marginBottom: 12 }}>Job Highlights</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {selectedJob.tags.map(t => (
              <span key={t} style={{ fontSize: 11, background: '#1a1a2e', color: '#ddd', border: '1px solid #2a2a4a', borderRadius: 6, padding: '4px 12px' }}>{t}</span>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', gap: 12 }}>
          <button style={{
            flex: 1, background: 'linear-gradient(135deg, #00e5ff, #0088aa)',
            border: 'none', borderRadius: 10, padding: '14px',
            color: '#000', fontWeight: 900, fontSize: 14, cursor: 'pointer'
          }}>
            {selectedJob.status === "Auto-Applied" ? "VIEW APPLICATION" : "APPLY NOW"}
          </button>
          <button style={{
            flex: 1, background: 'transparent', border: '1px solid #1e1e3a',
            borderRadius: 10, padding: '14px', color: '#eee', fontWeight: 700, cursor: 'pointer'
          }}>SAVE FOR LATER</button>
        </div>
      </div>
    </div>
  );
}
