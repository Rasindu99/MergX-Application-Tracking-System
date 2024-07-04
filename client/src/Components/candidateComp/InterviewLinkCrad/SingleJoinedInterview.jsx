import {React, useState, useEffect} from 'react'
import { FaLaptopFile } from "react-icons/fa6";
import { GrFormView } from "react-icons/gr";
import ProgressTimeline from '../../hiringManagerCompo/ProgressTimeline'


const SingleJoinedInterview = ({application, startedEvaluations, isVisible, onToggleVisibility}) => {

  const [filteredEvaluations, setFilteredEvaluations] = useState();

  useEffect(() => {

    const applicationExists = startedEvaluations.filter(evaluation => evaluation.job_id === application.job_id) ;
    setFilteredEvaluations(applicationExists);
    console.log(applicationExists);
   
  }, [startedEvaluations, application.job_id]);

  return (
    <div className='border-opacity-30 bg-gradient-to-b from-[#2B2B2B] to-[#272727]'>
      <div className='flex items-center justify-between mx-2'>
        <div>
          <h1><FaLaptopFile className='size-[30px]' /></h1>
        </div>
        <div className='w-[300px]'>
          <h3>{application.interviewSchedule?.jobtitle || 'N/A'}</h3>
        </div>
        <div>
          <button onClick={onToggleVisibility}><GrFormView className='size-[40px]' /></button>
        </div>
      </div>
      {isVisible && (
        <div className="bg-neutral-700 rounded-2xl m-1">
          <ProgressTimeline applicationExists={filteredEvaluations}/>
        </div>
      )}
    </div>
  )
}

export default SingleJoinedInterview
