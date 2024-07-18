import React, { useState, useEffect } from 'react';
import { TiGroup } from 'react-icons/ti';
import { toast } from 'react-hot-toast';
import axios from 'axios';

const InterviewItem = ({ title, date, time, meeting, password }) => {
  const [joinInterview, setJoinInterview] = useState(false);

  useEffect(() => {
    // Fetch the current state of join_interview from the backend
    const fetchJoinInterviewState = async () => {
      try {
        const response = await axios.get('/access/joininterviewget');
        setJoinInterview(response.data.join_interview);
      } catch (error) {
        console.error('Error fetching join interview state:', error);
      }
    };

    fetchJoinInterviewState();
  }, []);

  const handleJoinInterview = (e) => {
    if (!joinInterview) {
      e.preventDefault();
      toast.error('Admin blocked temporarily');
    }
  };

  return (
    <div id='interview-item' className='flex items-center justify-between px-8 py-4'>
      <div>
        <TiGroup size={100} style={{ color: 'rgba(255, 255, 255, 0.25)' }} />
      </div>
      <div className='-translate-x-10 max-w-60 min-w-60'>
        <h1 className='text-xl font-medium'>{title}</h1>
      </div>
      <div className='text-left -translate-x-6 opacity-50 max-w-64 min-w-64'>
        <p>Date - {date}</p>
        <p>Time - {time}</p>
        <p>Link - <a href={meeting} target="_blank" rel="noopener noreferrer">Meeting Link</a></p>
        <p>Password - {password}</p>
      </div>
      <div>
        <a href={meeting} target="_blank" rel="noopener noreferrer" onClick={handleJoinInterview}>
          <button className='w-60 h-14 bg-[#EA7122] text-lg rounded-3xl'>
            Join Interview
          </button>
        </a>
      </div>
    </div>
  );
};

export default InterviewItem;