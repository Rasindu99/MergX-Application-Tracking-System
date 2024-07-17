import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useInterviewContext } from '../../../Context/InterviewContext'

const Card = (props) => {

  const [interviews, setInterviews] = useState([]);

  const fetchInterviewData = () => {
    axios.get('/invitation/sentinvitation')
      .then(response => {
        setInterviews(response.data);
      })
      .catch(error => {
        console.error('Error fetching Interviews /LandingPage -:', error);
      });
  };

  useEffect(() => {
    fetchInterviewData();
  }, []);

  const [filteredInterviewsCount, setFilteredInterviewsCount] = useState(0);
  const deletedInterviews = window.localStorage.getItem('deletedInterviews');
  const readInterviews = window.localStorage.getItem('readInterviews')


  useEffect(() => {
    const filteredInterviews = interviews
      .filter((interview) => !deletedInterviews.includes(interview._id))
      .filter((interview) => !readInterviews.includes(interview._id));

      setFilteredInterviewsCount(filteredInterviews.length);
  },[interviews, deletedInterviews, readInterviews])

  return (
    <div className="[perspective:2000px]">
    <div 
       style={{ width: props.w ? `${props.w}px` : '200px', height: props.h ? `${props.h}px` : '200px' }}
       className={`hover:[transform:rotateY(15deg)_rotateX(5deg)] rounded-[15px] [box-shadow:0_10px_20px_rgba(0,_0,_0,_0.3),_0_6px_6px_rgba(0,_0,_0,_0.23)] [transition:transform_0.3s_ease-in-out] [transform:rotateY(0deg)] bg-[linear-gradient(to_top,_#100c08_0%,_#2B2B2B_100%)] 320px:rounded-[5px] 500px:rounded-[15px] sm:rounded-[30px] flex justify-center items-center`}
     >

       <div className="txt mx-auto my-0 text-center">
         <p className='text-lg text-white text-center font-bold'>New Interview<br/>Invitation</p>
         <h1 className='text-6xl text-[#EA7122] mt-3 text-center font-bold '>{filteredInterviewsCount}</h1>
       </div>
     </div>
   </div>
  )
}

export default Card
