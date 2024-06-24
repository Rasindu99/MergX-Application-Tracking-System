import React from 'react';
import moment from 'moment';
import { GrFormView } from "react-icons/gr";

const SingleStatus = ({status, index, handleViewStatus}) => {

  const statusTime = moment(status.time, 'HH:mm:ss'); // Parse the time string using moment

  if (!statusTime.isValid()) {
    console.error('Invalid time format:', status.time);
    return null; // Skip rendering if the time format is invalid
  }

  const timeAgo = statusTime.fromNow();
  const formattedTimeAgo = timeAgo.includes('seconds') ? timeAgo.replace('seconds', 'secs') : timeAgo;

  return (
    <tr key={index} className="border-b border-gray-500 h-[100px] bg-gradient-to-b from-[#2B2B2B] to-[#333333] ">
      <td>
        <div className="h-[75px] w-[75px] rounded-full overflow-hidden ml-8">
          <img src={status.image} alt='status' className='object-cover w-full h-full' />
        </div>
      </td>
      <td className='w-[50px]'></td>
      <td className='w-[350px] text-left'>
        {status.description}
        <div className='text-sm text-gray-400'>
          {status.user_fname} {status.user_lname}
        </div>
        <div className='text-sm text-gray-400'>
          {formattedTimeAgo}
        </div>
      </td>
      <td>
        <div className="mr-4">
          <button onClick={() => handleViewStatus(status)}>
            <GrFormView className="size-[50px]  hover:opacity-40" />
          </button>
        </div>
      </td>
    </tr>
  )
}

export default SingleStatus
