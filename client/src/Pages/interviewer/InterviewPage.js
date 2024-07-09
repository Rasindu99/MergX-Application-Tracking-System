import React, { useState, useEffect } from 'react';
import '../interviewer/custom.css';
import InterviewNav from '../../Components/interviewercomp/InterviewNav';
import Description from '../../Components/interviewercomp/InterviewerDes';
import InterviewItem from '../../Components/interviewercomp/InterviewItem';
import axios from 'axios';

export default function InterviewPage() {
  const name = 'Interview';
  const [interviews, setInterviews] = useState([]);

  useEffect(() => {
    const fetchInterviewSchedules = async () => {
      try {
        const response = await axios.get('http://localhost:8000/schedule/getinterviewschedule'); 
        setInterviews(response.data);
      } catch (error) {
        console.error('Error fetching interviews:', error);
      }
    };

    fetchInterviewSchedules();
  }, []);

  return (
    <div>
        <div className='flex'>
        <div>
          <InterviewNav/>
        </div>
        <div>
            <Description name={name} />
        </div>
        <div id='background' className="w-80 h-80vh rounded-3xl z-0 mt-24 mx-8">
            <div id='container' className='mt-8 px-8'>
            {interviews
              .sort((a, b) => {
                const dateA = new Date(a.date);
                const dateB = new Date(b.date);

                // Compare the dates first
                if (dateA < dateB) return -1;
                if (dateA > dateB) return 1;

                // If dates are the same, compare the start times
                const timeA = new Date(`1970-01-01T${a.start_time}Z`);
                const timeB = new Date(`1970-01-01T${b.start_time}Z`);
                return timeA - timeB;
              })
              .map((interview, index) => (
                <InterviewItem
                  key={index}
                  title={interview.subject}
                  date={new Date(interview.date).toLocaleDateString()}
                  time={interview.start_time}
                  meeting={interview.link}
                  password={interview.password}
                />
              ))}
            </div>
        </div>
        </div>
    </div>
  )
}