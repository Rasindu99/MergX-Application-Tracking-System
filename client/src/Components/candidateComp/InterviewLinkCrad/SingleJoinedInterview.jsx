import React, { useState, useEffect } from 'react';
import { FaLaptopFile } from "react-icons/fa6";
import { GrFormView } from "react-icons/gr";
import ProgressTimeline from '../../hiringManagerCompo/ProgressTimeline';
import { IoMdClose } from "react-icons/io";

const SingleJoinedInterview = ({ application, startedEvaluations, isVisible, onToggleVisibility, user }) => {

  const [filteredEvaluations, setFilteredEvaluations] = useState();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setTimeout(() => setShow(true), 50); // Delay to allow for transition
    } else {
      setShow(false);
    }
  }, [isVisible]);

  const handleOnClose = () => {
    setShow(false);
    setTimeout(() => onToggleVisibility(), 200); // Match this duration with the CSS transition duration
  }

  useEffect(() => {
    const applicationExists = startedEvaluations.filter(evaluation => evaluation.job_id === application.job_id);
    setFilteredEvaluations(applicationExists);
    console.log("Joined -",applicationExists);
  }, [startedEvaluations, application.job_id]);

  return (
    <div className='border-opacity-30 bg-gradient-to-b from-[#2B2B2B] to-[#272727] hover:from-[#464646] hover:to-[#333333]  cursor-pointer rounded-lg mb-[2px]'>
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
        <div className={`fixed inset-0 flex items-center justify-center  bg-black bg-opacity-30 backdrop-filter backdrop-blur-sm transition-opacity duration-500 ${show ? 'opacity-100' : 'opacity-0'}`}>
          <div className={`bg-[#19191A] flex justify-start flex-col p-6 rounded-lg shadow-lg h-fit w-[700px] border-neutral-700 border transition-transform duration-500 ${show ? 'transform scale-100' : 'transform scale-95'}`}>

            <div className='flex justify-between items-center w-full bg-gradient-to-r from-[#3f3f3f] to-[#272727] h-[10%] p-2 rounded mb-5'>
              <div className=' w-auto  flex justify-around'>
                <div className='mr-5'>
                  <img src={user.image} alt='user' className='h-[50px] w-[50px] rounded-full overflow-hidden border-orange-500 border-[3px]' />
                </div>
                <div className='my-auto text-start'>
                  <h1>{user.fname} {user.lname}</h1>
                  <p className='text-sm text text-gray-400 font-bold'>{user.role}</p>
                </div>
              </div>
            </div>

            <div className='flex flex-col justify-around bg-neutral-800 p-3 rounded-lg h-[600px] overflow-y-auto box-border'>
              <h1 className='text-lg text text-gray-400 bg-[#3f3f3f] mb-3'>Tracking History</h1>
              <ProgressTimeline applicationExists={filteredEvaluations} />
              <div className=' bg-[#3f3f3f] h-auto p-2 '><h1>Interviewer Feedback</h1></div>
            </div>
          </div>

          <button
            className="group flex justify-center items-center text-white bg-orange-500 text-center rounded-md hover:bg-orange-600 size-10 absolute right-4 top-4"
            onClick={handleOnClose}
          >
            <IoMdClose className="text-white group-hover:text-black text-xl" />
          </button>
        </div>
      )}
    </div>
  );
}

export default SingleJoinedInterview;
