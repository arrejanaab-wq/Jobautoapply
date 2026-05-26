export const TABS = ["Dashboard", "My Profile", "Job Feed", "Applications", "Settings"];

export const MOCK_JOBS = [
  { id: 1, title: "ELD Compliance Specialist", company: "FleetEdge India", location: "Bangalore", match: 96, platform: "LinkedIn", status: "Auto-Applied", time: "2 min ago", salary: "₹8–12 LPA", tags: ["ELD", "Fleet", "Compliance"] },
  { id: 2, title: "Fleet Management SaaS – Product Lead", company: "Tranzact Technologies", location: "Mumbai", match: 91, platform: "Naukri", status: "Auto-Applied", time: "15 min ago", salary: "₹12–18 LPA", tags: ["Fleet", "SaaS", "Product"] },
  { id: 3, title: "Logistics Tech – Business Analyst", company: "Rivigo", location: "Gurugram", match: 88, platform: "Indeed", status: "Shortlisted", time: "1 hr ago", salary: "₹7–10 LPA", tags: ["Logistics", "Analytics"] },
  { id: 4, title: "ELD Product Manager", company: "Minda Corporation", location: "Pune", match: 85, platform: "Company Portal", status: "Auto-Applied", time: "3 hr ago", salary: "₹10–15 LPA", tags: ["ELD", "IoT", "B2B"] },
  { id: 5, title: "Fleet Ops – Compliance Manager", company: "BlackBuck", location: "Hyderabad", match: 82, platform: "Shine", status: "Pending Review", time: "5 hr ago", salary: "₹9–13 LPA", tags: ["Fleet", "Operations"] },
  { id: 6, title: "Telematics Solutions Architect", company: "Locus.sh", location: "Remote", match: 79, platform: "AngelList", status: "Shortlisted", time: "1 day ago", salary: "₹14–20 LPA", tags: ["Telematics", "SaaS"] },
];

export const PLATFORMS = [
  { name: "LinkedIn", icon: "💼", connected: true, jobs: 142 },
  { name: "Naukri", icon: "🔍", connected: true, jobs: 89 },
  { name: "Indeed", icon: "🌐", connected: true, jobs: 67 },
  { name: "Shine", icon: "✨", connected: false, jobs: 0 },
  { name: "AngelList", icon: "🚀", connected: true, jobs: 34 },
  { name: "Company Portals", icon: "🏢", connected: true, jobs: 23 },
];

export const STATS = [
  { label: "Jobs Matched", value: "247", delta: "+18 today", color: "#00e5ff" },
  { label: "Auto-Applied", value: "43", delta: "+6 today", color: "#69ff47" },
  { label: "Shortlisted", value: "12", delta: "+2 today", color: "#ff6b6b" },
  { label: "Match Score", value: "91%", delta: "Avg this week", color: "#ffd166" },
];
