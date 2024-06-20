import React from 'react';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

const ScheduledInterviews = ({ interviewTitle, interviewDate, interviewTime }) => {
  return (

    <div className='scheduled-interview-bar flex items-center justify-center gap-5 px-0'>
      <FaRegCalendarAlt size={30} className="text-white" />
      <p className='max-w-64 min-w-64 text-left'>{interviewTitle}</p>
      <p className='max-w-52 min-w-52 text-left'>Time - {interviewTime}</p>
      <FaEdit size={26} className='cursor-pointer hover:text-orange-500' />
      <MdDeleteOutline size={30} className='cursor-pointer hover:text-orange-500'/>
    </div>

  )
}

export default ScheduledInterviews;

