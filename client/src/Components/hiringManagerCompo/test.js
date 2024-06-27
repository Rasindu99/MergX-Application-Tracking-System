import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ApplicationList() {
  const [applications, setApplications] = useState([]);

  const getApplications = async () => {
    try {
      const response = await axios.get("http://localhost:8000/cv/getapplications");
      console.log("Response data:", response.data);

      // Ensure response data is an array
      if (Array.isArray(response.data.applications)) {
        setApplications(response.data.applications); // Update the state with the fetched data
    
        // Use response.data directly to map jobIds
        const jobIds = response.data.applications.map(application => application.job_id);
        console.log("Job IDs:", jobIds);
      } else {
        console.error("Expected an array but got:", typeof response.data);
      }
    } catch (error) {
      console.error("Error fetching applications:", error);
    }
  };

  useEffect(() => {
    getApplications();
  }, []);

  useEffect(() => {
    console.log("Updated applications state:", applications);
  }, [applications]);

  return (
    <div>
      <h1>Job Applications</h1>
      <ul>
        {applications.map((application, index) => (
          <li key={index}>
            {application.user_name} ({application.user_email})
            <button onClick={() => console.log(application.job_id)}>Show Job ID</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ApplicationList;
