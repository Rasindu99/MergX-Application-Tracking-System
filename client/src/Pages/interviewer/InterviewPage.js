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
    
    const fetchInterviews = async () => {
      try {
        const response = await axios.get('http://localhost:8000/interview');
        setInterviews(response.data); 
      } catch (error) {
        console.error('Error fetching interviews:', error);
      }
    };

    fetchInterviews(); 
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
            {interviews.map((interview, index) => (
                <InterviewItem
                  key={index}
                  title = {interview.name}
                  date = {interview.date}
                  time = {interview.time}
                  meeting = {interview.link}
                  password= {interview.password}
                />
              ))}
            </div>
        </div>
        </div>
    </div>
  )
}