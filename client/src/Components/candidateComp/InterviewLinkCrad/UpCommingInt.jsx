import {React, useContext} from 'react'
import { IoIosLink } from "react-icons/io";
import { UserContext } from '../../../Context/UserContext';


const UpCommingInt = ({approvedJobs, formatDate, handleJoinInterview, loading}) => {

  const { user } = useContext(UserContext);
  console.log('Approved JOb',approvedJobs);

  return (
    <div className='bg-gradient-to-b from-[#2b2b2b] to-[#2c2c2c] rounded-l-3xl w-full h-full mr-2 '>
      <div className='flex justify-center '>
        <div className='mt-2'>
          <h1 className='text-2xl text-neutral-200'>Up Coming Interviews</h1>
          <div className='w-[300px] '>
            <hr className='opacity-30 text-[2px] mt-1'></hr>
          </div>
        </div>
      </div>
      <div className=' rounded-xl mx-5 mt-5 h-4/5 overflow-y-auto'>
        <div className=''>
          {!loading ? (
            approvedJobs.length > 0 ? (
              approvedJobs
                .filter(application => user._id === application.user_id)
                .map(application => (
                  <div key={application._id} className='bg-gradient-to-b from-[#333333] to-[#252525] rounded-lg hover:from-[#464646] hover:to-[#333333] cursor-pointer mb-[3px] p-2'>
                    <div className='flex items-center justify-between mx-12'>
                      <div>
                        <h1><IoIosLink className='size-[80px]' /></h1>
                      </div>
                      <div>
                        <h3>{application.interviewSchedule?.jobtitle || 'N/A'}</h3>
                        <p>Date: {formatDate(application.interviewSchedule?.date)}</p>
                        <p>Time: {application.interviewSchedule?.start_time} - {application.interviewSchedule?.end_time}</p>
                      </div>
                      <div>
                        <button onClick={() => handleJoinInterview(application)} className='bg-orange-500 h-14 w-[150px] rounded-lg font-semibold hover:bg-orange-600'>OPEN LINK</button>
                      </div>
                    </div>
                  </div>
                ))
            ) : (
              <h1>No aveilable Interviews</h1>
            )
          ) : (
            <div className="loader h-[100px] w-full absolute top-[40%] left-[45%]">
              <div className="dot-spinner">
                <div className="dot-spinner__dot"></div>
                <div className="dot-spinner__dot"></div>
                <div className="dot-spinner__dot"></div>
                <div className="dot-spinner__dot"></div>
                <div className="dot-spinner__dot"></div>
                <div className="dot-spinner__dot"></div>
                <div className="dot-spinner__dot"></div>
                <div className="dot-spinner__dot"></div>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  )
}

export default UpCommingInt
