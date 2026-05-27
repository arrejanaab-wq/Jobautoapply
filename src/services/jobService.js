const RAPID_API_KEY = import.meta.env.VITE_RAPID_API_KEY;
const RAPID_API_HOST = 'jsearch.p.rapidapi.com';

/**
 * Fetches real-time jobs from JSearch API
 * @param {string} query - The search query (e.g., "React Developer in Bangalore")
 * @param {number} page - Page number for pagination
 */
export const fetchRealJobs = async (query = "React Developer in India", page = 1) => {
  if (!RAPID_API_KEY) {
    console.error("VITE_RAPID_API_KEY is missing in .env file");
    return [];
  }

  const url = `https://${RAPID_API_HOST}/search?query=${encodeURIComponent(query)}&page=${page}&num_pages=1`;

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': RAPID_API_KEY,
      'X-RapidAPI-Host': RAPID_API_HOST
    }
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    
    if (result.status === "OK") {
      return result.data.map(job => ({
        id: job.job_id,
        title: job.job_title,
        company: job.employer_name,
        location: job.job_city ? `${job.job_city}, ${job.job_country}` : job.job_country,
        match: Math.floor(Math.random() * 15) + 80, // Simulation of matching algorithm
        platform: job.job_publisher,
        status: "New",
        time: job.job_posted_at_datetime_utc ? new Date(job.job_posted_at_datetime_utc).toLocaleDateString() : "Recently",
        salary: job.job_min_salary ? `₹${job.job_min_salary}–${job.job_max_salary} ${job.job_salary_currency}` : "Not disclosed",
        tags: job.job_highlights?.Qualifications?.slice(0, 3) || ["Remote", "Full-time"],
        description: job.job_description,
        applyLink: job.job_apply_link
      }));
    }
    return [];
  } catch (error) {
    console.error("Error fetching jobs from JSearch:", error);
    return [];
  }
};
