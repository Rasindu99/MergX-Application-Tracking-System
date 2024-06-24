import React from 'react';
import moment from 'moment';
import { GrFormView } from "react-icons/gr";

const SingleAnouncement = ({announcement, index, handleViewAnnouncement}) => {

  const statusTime = moment(announcement.time, 'HH:mm:ss'); // Parse the time string using moment

  if (!statusTime.isValid()) {
    console.error('Invalid time format:', announcement.time);
    return null; // Skip rendering if the time format is invalid
  }

  const timeAgo = statusTime.fromNow();
  const formattedTimeAgo = timeAgo.includes('seconds') ? timeAgo.replace('seconds', 'secs') : timeAgo;

  return (
    <tr key={index} className="border-b border-gray-500 h-[100px] bg-gradient-to-b from-[#2B2B2B] to-[#333333] " >
      <td className='w-[50px]'></td>
      <td className='w-[450px] text-left'>
        <h1 className='text-2xl truncate'>{announcement.title?.slice(0, 20)}</h1>
        <p className=' opacity-30'>{announcement.announce.slice(0, 35)}.....</p>
        <p className='text-sm text-gray-400'>{announcement.user_fname} {announcement.user_lname}</p>
        <div className='text-sm text-gray-400'>
          {formattedTimeAgo}
        </div>
      </td>
      <td>
        <div className="mr-4">
          <button onClick={() => { handleViewAnnouncement(announcement) }}>
            <GrFormView className="size-[50px]  hover:opacity-40" />
          </button>
        </div>
      </td>
    </tr>
  )
}

export default SingleAnouncement
