import {React, useContext} from 'react'
import { IoIosLink } from "react-icons/io";
import { UserContext } from '../../../Context/UserContext';


const UpCommingInt = ({approvedJobs, formatDate, handleJoinInterview}) => {

  const { user } = useContext(UserContext);

  return (
    <div className='bg-gradient-to-b from-[#2B2B2B] to-[#2B2B2B] rounded-lg w-2/4 h-4/5 mr-2'>
      <div className='flex justify-center '>
        <div>
          <h1 className='text-2xl text-orange-500'>Up Coming</h1>
          <div className='w-[400px] '>
            <hr className='opacity-50 text-[2px]'></hr>
          </div>
        </div>
      </div>
      <div className=' rounded-xl mx-5 h-4/5 overflow-y-auto'>
        <div className=''>
          {approvedJobs.length > 0 ? (
            approvedJobs
              .filter(application => user._id === application.user_id)
              .map(application => (
                <div key={application._id} className='bg-gradient-to-b from-[#2B2B2B] to-[#272727] '>
                  <div className='flex items-center justify-between mx-12'>
                    <div>
                      <h1><IoIosLink className='size-[100px]' /></h1>
                    </div>
                    <div>
                      <h3>{application.interviewSchedule?.jobtitle || 'N/A'}</h3>
                      <p>Date: {formatDate(application.interviewSchedule?.date)}</p>
                      <p>Time: {application.interviewSchedule?.start_time} - {application.interviewSchedule?.end_time}</p>
                    </div>
                    <div>
                      <button onClick={() => handleJoinInterview(application)} className='bg-orange-500 h-14 w-[150px] rounded-lg'>Join Interview</button>
                    </div>
                  </div>
                </div>
              ))
          ) : (
            <h3>empty</h3>
          )}
        </div>

      </div>
    </div>
  )
}

export default UpCommingInt
