import React, { useState, useEffect } from 'react';
import InterviewNav from '../../Components/interviewercomp/InterviewNav';
import Description from '../../Components/interviewercomp/InterviewerDes';
import ViewJobButton from '../../Components/interviewercomp/ViewJobButton';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';
import ScheduledInterviews from '../../Components/interviewercomp/ScheduledInterviews';
import { FaPlus } from "react-icons/fa6";

export default function Scheduling() {

  const name = 'Interview Scheduling'; 
  const [date, setDate] = useState(new Date());

  const formattedDate = date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: '2-digit'
  });

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
    <>
      <div className='flex'>
          <div>
            <InterviewNav/>
          </div>
          <div>
            <Description name={name} />
          </div>

          <div id='background' className="w-80 h-80vh rounded-3xl z-0 mt-24 mx-8 grid grid-cols-3">
            <div className='flex flex-col items-start py-10 px-5 col-span-1'>
              <div className='pl-5'>
                 <ViewJobButton/>
              </div>
              <div className='mt-14 pl-5'>
                <p className='text-2xl text-white text-left mb-8 text-opacity-50'>Calender</p>
                <Calendar
                  onChange={setDate}
                  value={date}
                />
              </div>
            </div>
            <div className='px-5 col-span-2 py-10'>
              <div>
                <p className='text-3xl'>{formattedDate}</p>
                <div className='mt-10 overflow-y-auto max-h-[450px]'>
                {interviews.map((interview, index) => (
                      <ScheduledInterviews
                        key={index}
                        interviewTitle={interview.name}
                        interviewDate={interview.date}
                        interviewTime={interview.time}
                      />
                    ))}
                </div>
                <button className='h-[50px] bg-orange-500 rounded-xl w-[200px] text-2xl hover:bg-orange-700 mt-14'>
                  Schedule +
                </button>
              </div>
            </div>
          </div>

      </div>

    </>
  );
}