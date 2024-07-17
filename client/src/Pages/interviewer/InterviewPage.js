import React, { useState, useEffect, useContext } from 'react';
import '../interviewer/custom.css';
import InterviewNav from '../../Components/interviewercomp/InterviewNav';
import Description from '../../Components/interviewercomp/InterviewerDes';
import InterviewItem from '../../Components/interviewercomp/InterviewItem';
import axios from 'axios';
import { UserContext } from '../../Context/UserContext';
import AdminChatBotBottom from '../../Components/admincomp/AdminChatBotBottom';


export default function InterviewPage() {
  const name = 'Interview';
  const [interviews, setInterviews] = useState([]);
  const { user } = useContext(UserContext);

  const selectedDateSchedules = interviews.filter(schedule =>
    schedule.assign === user._id
  );

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
        <div id='background' className="z-0 mx-8 mt-24 w-80 h-80vh rounded-3xl">
            <div id='container' className='px-8 mt-8'>
            {selectedDateSchedules
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
         {/* Move AdminChatBotBottom here and wrap it in a positioned div */}
      <div className="absolute bottom-0 right-0 z-50">
        <AdminChatBotBottom/>
      </div>
    </div>
  )
}