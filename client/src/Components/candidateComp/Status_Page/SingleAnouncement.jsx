import React from 'react';
import moment from 'moment';
import { GrFormView } from "react-icons/gr";

const SingleAnouncement = ({announcement, index, setShowAnnouncement, setReadAnnouncements, readAnnouncements, setSelectedAnnouncement}) => {

  const statusTime = moment(announcement.time, 'HH:mm:ss'); // Parse the time string using moment

  if (!statusTime.isValid()) {
    console.error('Invalid time format:', announcement.time);
    return null; // Skip rendering if the time format is invalid
  }

  const timeAgo = statusTime.fromNow();
  const formattedTimeAgo = timeAgo.includes('seconds') ? timeAgo.replace('seconds', 'secs') : timeAgo;

  const isRead = readAnnouncements.includes(announcement._id);
  const gradientClass = isRead ? 'from-neutral-700 to-neutral-800' : 'from-zinc-400 to-zinc-700';

  const handleViewAnnouncement = (announcement) => {
    setSelectedAnnouncement(announcement);
    setShowAnnouncement(true);
    if (!isRead) {
      setReadAnnouncements([...readAnnouncements, announcement._id]);
    }
  };

  return (
    <div className='bg-neutral-400 rounded-3xl'>
      <div key={index} className={`flex items-center justify-between rounded-2xl pb-2 mt-3 border-none shadow-none  h-[100px] bg-gradient-to-b ${gradientClass} hover:opacity-90 `}>
        <div className="w-[50px]"></div>
        <div className="w-[450px] text-left">
          <h1 className="text-xl mt-1">{announcement.title?.slice(0, 20)}</h1>
          <p className="opacity-30">{announcement.announce.slice(0, 35)}.....</p>
          <p className="text-sm text-gray-400">{announcement.user_fname} {announcement.user_lname}</p>
          <div className="text-sm text-gray-400">{formattedTimeAgo}</div>
        </div>
        <div className="mr-4">
          <button onClick={() => { handleViewAnnouncement(announcement) }}>
            <GrFormView className="size-[50px] hover:opacity-40" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default SingleAnouncement
