import React, { useEffect, useState } from 'react'
import { useInterviewContext } from '../../../Context/InterviewContext'

const Card2 = () => {


  const {localReadAnnouncementData, localAnouncementData} = useInterviewContext();
  const [filteredAnnouncementCount, setFilteredAnnouncementCount] = useState(0);

  useEffect(() => {
     const filteredInterviews = localAnouncementData.filter((interview) => 
      !localReadAnnouncementData.includes(interview._id));

      setFilteredAnnouncementCount(filteredInterviews.length);
  },[localReadAnnouncementData, localAnouncementData])


  return (
    
      <div className='flex box-border flex-col flex-items-stretch bg-gradient-to-b from-neutral-400 to-neutral-900 rounded-3xl shadow-[0_3px_10px_rgb(0,0,0,0.2)]  card'>
        <span className='text-white text-lg font-semibold mt-2'>New <br/>Announcements</span>
        <span className='bg-gradient-to-b from-orange-400 to-amber-800 bg-clip-text text-transparent text-8xl font-bold'>{filteredAnnouncementCount}</span>
      </div>
  )
}

export default Card2