import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../Context/UserContext';
import InterviewNav from '../../Components/interviewercomp/InterviewNav'
import './custom.css';
import Header from '../../Components/interviewercomp/InterviewerHeader';
import Card from '../../Components/interviewercomp/Card';
import InterviewBar from '../../Components/interviewercomp/InterviewBar';
import axios from 'axios';


export default function Interviewerdash() {

  const { user } = useContext(UserContext);
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
          <Header/>
        </div>
        <div id='background' className="w-80 h-80vh rounded-3xl z-0 mt-24 mx-8">
          <div className='flex items-center justify-around mt-5'>
            <Card title="Applications" value="10" />
            <Card title="Candidates" value="10" />
            <Card title="Upcomming" value="10" />
            <Card title="Unread" value="02" />
          </div>
          <div>
            <div className='ml-8 mt-16'>
              <p className='text-left ml-8 mt-8 text-xl'>Today's Interviews</p>
            </div>
            <div id='bar-container' className='mt-5 max-h-80 overflow-y-auto'>
            {interviews.map((interview, index) => (
                  <InterviewBar
                    key={index}
                    interviewTitle={interview.name}
                    interviewDate={interview.date}
                    interviewTime={interview.time}
                  />
                ))}
            </div>
          </div>
        </div>
        </div>
    </div>
  )
}

