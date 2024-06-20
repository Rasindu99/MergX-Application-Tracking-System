import React from 'react';
import { FaRegCalendarAlt } from 'react-icons/fa';

const InterviewBar = ({ interviewTitle, interviewDate, interviewTime }) => {
  return (
    <div className='interview-bar flex items-center justify-between px-8'>
      <FaRegCalendarAlt size={30} className="text-white" />
      <p className='max-w-64 min-w-64 text-left'>{interviewTitle}</p>
      <p className='max-w-40 min-w-40 text-left'>Date - {interviewDate}</p>
      <p className='max-w-40 min-w-40 text-left'>Time - {interviewTime}</p>
    </div>
  );
};

export default InterviewBar;