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

  const [selectedJob, setSelectedJob] = useState(null);

  // Live Discovery Engine (Simulates finding new jobs on the web)
  useEffect(() => {
    const interval = setInterval(() => {
      const newJob = {
        id: Date.now(),
        title: ["Full Stack Engineer", "React Developer", "Logistics Tech Lead", "AI Solutions Architect", "Fleet Operations Analyst"][Math.floor(Math.random() * 5)],
        company: ["Uber Freight", "Delhivery", "Zomato", "Tesla", "Amazon Logistics"][Math.floor(Math.random() * 5)],
        location: "Remote / Hybrid",
        match: Math.floor(Math.random() * 20) + 75,
        platform: ["LinkedIn", "Naukri", "Indeed", "Company Portal"][Math.floor(Math.random() * 4)],
        status: "New",
        time: "Just now",
        salary: `₹${Math.floor(Math.random() * 10) + 10}–${Math.floor(Math.random() * 10) + 20} LPA`,
        tags: ["New", "Live", "AI-Matched"]
      };

      setJobs(prev => [newJob, ...prev].slice(0, 50)); // Keep last 50 jobs
      
      setStats(prevStats => prevStats.map(s => 
        s.label === "Jobs Matched" ? { ...s, value: (parseInt(s.value) + 1).toString(), delta: "+1 just now" } : s
      ));
    }, 30000); // Discover a new job every 30 seconds

    return () => clearInterval(interval);
  }, []);

  // Simulation Engine (Auto-Apply)
  useEffect(() => {
    if (!settings.autoApply) return;

    const interval = setInterval(() => {
      setJobs(prevJobs => {
        const jobToApply = prevJobs.find(j => {
          const isNotApplied = j.status !== "Auto-Applied";
          const meetsScore = j.match >= settings.minMatch;
          
          const profileSkills = (profileData.skills || "").toLowerCase();
          const profileRole = (profileData.role || "").toLowerCase();
          
          const hasSkillMatch = j.tags.some(tag => profileSkills.includes(tag.toLowerCase()));
          const hasRoleMatch = j.title.toLowerCase().includes(profileRole) || profileRole.includes(j.title.toLowerCase());
          
          return isNotApplied && meetsScore && (hasSkillMatch || hasRoleMatch);
        });

        if (!jobToApply) return prevJobs;

        return prevJobs.map(j => 
          j.id === jobToApply.id ? { ...j, status: "Auto-Applied", time: "Just now" } : j
        );
      });
    }, 5000); 

    return () => clearInterval(interval);
  }, [settings.autoApply, settings.minMatch, profileData]);

  // Sync stats when jobs change
  useEffect(() => {
    const autoAppliedCount = jobs.filter(j => j.status === "Auto-Applied").length;
    const shortlistedCount = jobs.filter(j => j.status === "Shortlisted").length;
    
    setStats(prevStats => prevStats.map(s => {
      if (s.label === "Auto-Applied") {
        return { ...s, value: (43 + autoAppliedCount).toString() }; // Start from base 43
      }
      if (s.label === "Shortlisted") {
        return { ...s, value: (12 + shortlistedCount).toString() }; // Start from base 12
      }
      return s;
    }));
  }, [jobs]);

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
    selectedJob,
    setSelectedJob,
    updateProfile,
    updateSettings
  };

  return <JobContext.Provider value={value}>{children}</JobContext.Provider>;
};
