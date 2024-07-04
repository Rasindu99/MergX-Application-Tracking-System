import React, { useEffect, useState } from 'react'
import { useInterviewContext } from '../../../Context/InterviewContext'

const Card = () => {

  const {
    interviews,
    deletedInterviews,
    readInterviews
  } = useInterviewContext();

  const [filteredInterviewsCount, setFilteredInterviewsCount] = useState(0);

  useEffect(() => {
    const filteredInterviews = interviews
      .filter((interview) => !deletedInterviews.includes(interview._id))
      .filter((interview) => !readInterviews.includes(interview._id));

      setFilteredInterviewsCount(filteredInterviews.length);
  },[interviews, deletedInterviews, readInterviews])

  return (
    
      <div className='flex box-border flex-col flex-items-stretch bg-gradient-to-b from-neutral-400 to-neutral-900 rounded-3xl shadow-[0_3px_10px_rgb(0,0,0,0.2)]  card'>
        <span className='text-white text-lg font-semibold mt-2'>New Interview <br/>Invitations</span>
        <span className='bg-gradient-to-b from-orange-400 to-amber-800 bg-clip-text text-transparent text-8xl font-bold'>{filteredInterviewsCount}</span>
      </div>
  )
}

export default Card
