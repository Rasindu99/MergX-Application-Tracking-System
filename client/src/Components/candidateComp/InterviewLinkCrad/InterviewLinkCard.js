import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../Context/UserContext';
import axios from 'axios';

export default function InterviewLinkCard() {
    const { user } = useContext(UserContext);
    const [approvedJobs, setApprovedJobs] = useState([]);

    const getApproveApplications = async () => {
        try {
            const response = await axios.get('/cv/getapprovedapplication');
            setApprovedJobs(response.data);
        } catch (error) {
            console.error('cant get approved application :', error);
        }
    };

    useEffect(() => {
        getApproveApplications();
    }, []);

    return (
        <div>
            <h1>Interview Links</h1>
            <h2>Welcome, {user.fname}</h2>
            {approvedJobs.length > 0 ? (
                approvedJobs
                    .filter(application => user._id === application.user_id)
                    .map(application => (
                        <div key={application._id} className='border'>
                            <h3>Application for: {application.interviewSchedule?.jobtitle || 'N/A'}</h3>
                            <p>Email: {application.user_email}</p>
                            <p>Interview Link: {application.interviewSchedule?.link || 'Not available'}</p>
                            <p>Password: {application.interviewSchedule?.password || 'Not available'}</p>
                            <p>Date: {application.interviewSchedule?.date || 'Not scheduled'}</p>
                            <p>Time: {application.interviewSchedule?.start_time} - {application.interviewSchedule?.end_time}</p>
                        </div>
                    ))
            ) : (
                <h3>No approved applications found</h3>
            )}
        </div>
    );
}