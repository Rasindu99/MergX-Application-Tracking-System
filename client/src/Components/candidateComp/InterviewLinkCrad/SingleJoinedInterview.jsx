import {React, useState, useEffect} from 'react'
import { FaLaptopFile } from "react-icons/fa6";
import { GrFormView } from "react-icons/gr";
import ProgressTimeline from '../../hiringManagerCompo/ProgressTimeline'
import { IoMdClose } from "react-icons/io";


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
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 backdrop-filter backdrop-blur-sm">
          <div className="bg-[#19191A] p-6 rounded-lg shadow-lg h-fit w-[700px] border-orange-700 border-[1px]">
            <button
              className="absolute px-4 py-2 text-white bg-gray-700 rounded-md top-4 right-4 hover:bg-gray-600 size-12"
              onClick={onToggleVisibility}
            >
              <IoMdClose className="text-white hover:text-red-700" />
            </button>
            <ProgressTimeline applicationExists={filteredEvaluations} />

          </div>
        </div>
      )}
    </div>
  )
}

export default SingleJoinedInterview
