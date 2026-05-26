import React, { createContext, useContext, useState, useEffect } from 'react';
import { MOCK_JOBS, PLATFORMS, STATS } from '../data/mockData';

const JobContext = createContext();

export const useJobs = () => {
  const context = useContext(JobContext);
  if (!context) {
    throw new Error('useJobs must be used within a JobProvider');
  }
  return context;
};

export const JobProvider = ({ children }) => {
  const [jobs, setJobs] = useState(MOCK_JOBS);
  const [platforms] = useState(PLATFORMS);
  const [stats, setStats] = useState(STATS);
  const [profileData, setProfileData] = useState({
    name: "Vishal",
    role: "Fleet Tech / ELD Compliance",
    skills: "ELD, Fleet Management, SaaS, Logistics",
    locations: "Bangalore, Remote",
    salary: "10–15 LPA",
    resumeFile: null
  });
  const [settings, setSettings] = useState({
    autoApply: true,
    minMatch: 80,
    notify: true,
    blacklist: []
  });

  // Simulation Engine
  useEffect(() => {
    if (!settings.autoApply) return;

    const interval = setInterval(() => {
      setJobs(prevJobs => {
        // Find a job that hasn't been auto-applied yet and meets the threshold
        const jobToApply = prevJobs.find(j => 
          j.status !== "Auto-Applied" && 
          j.match >= settings.minMatch &&
          (j.status === "Pending Review" || j.status === "Shortlisted" || j.status === undefined)
        );

        if (jobToApply) {
          // Update the job status
          const updatedJobs = prevJobs.map(j => 
            j.id === jobToApply.id ? { ...j, status: "Auto-Applied", time: "Just now" } : j
          );

          // Update stats
          setStats(prevStats => prevStats.map(s => 
            s.label === "Auto-Applied" ? { ...s, value: (parseInt(s.value) + 1).toString(), delta: "+1 just now" } : s
          ));

          return updatedJobs;
        }
        return prevJobs;
      });
    }, 10000); // Run every 10 seconds

    return () => clearInterval(interval);
  }, [settings.autoApply, settings.minMatch]);

  const updateProfile = (newData) => {
    setProfileData(prev => ({ ...prev, ...newData }));
  };

  const updateSettings = (newSettings) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const value = {
    jobs,
    platforms,
    stats,
    profileData,
    settings,
    updateProfile,
    updateSettings
  };

  return <JobContext.Provider value={value}>{children}</JobContext.Provider>;
};
