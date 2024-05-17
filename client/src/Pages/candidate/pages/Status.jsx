// Status.js
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../Context/UserContext';
import axios from 'axios';
import moment from 'moment';
import { GrFormView } from "react-icons/gr";
import StatusView from '../../../Components/candidateComp/StatusView';
import AnnouncementView from '../../../Components/candidateComp/AnnouncementView';

export default function Status() {
  const { user } = useContext(UserContext);
  const [statusData, setStatusData] = useState([]);
  const [announcementData, setAnnouncementData] = useState([]);
  const [showStatus, setShowStatus] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [showAnnouncement, setShowAnnouncement] = useState(false);
  const [selectedAnnouncement,setSelectedAnnouncement] = useState(null);

  useEffect(() => {
    getStatus();
    getAnnouncement();
  }, []);

  const handleViewStatus = (status) => {
    setSelectedStatus(status);
    setShowStatus(true);
  };
  
  const handleViewAnnouncement = (announcements) =>{
    setSelectedAnnouncement(announcements);
    setShowAnnouncement(true);
  }

  const getStatus = async () => {
    try {
      const response = await axios.get('/status/getstatus');
      setStatusData(response.data); // Assuming the response contains an array of status data
    } catch (error) {
      console.error('Error fetching status:', error);
    }
  };

  const getAnnouncement = async () => {
    try {
      const response = await axios.get('/announcement/getannouncement');
      setAnnouncementData(response.data); // Assuming the response contains an array of status data
    } catch (error) {
      console.error('Error fetching Announcement:', error);
    }
  }

  const handleModalstatusClose = () => {
    setShowStatus(false);
    setShowAnnouncement(false);
  };

  return (
    <div className='items-center'>
      <div className='pb-8'>
        <h1 className='text-3xl'>Statuses & Announcements</h1>
      </div>
      
      <div className='flex w-[1400px] h-[700px] mx-auto mt-6'>
        <div className='border-r w-[700px] border-orange-500'>
        <div>
                <h1 className='text-2xl opacity-45'>Status</h1>
            <div className='flex justify-center pt-2 '>
                    <hr className='w-[200px] justify-center opacity-25'></hr> 
            </div>
            
            </div>
          <div className='pt-12'>
            <table className='mx-auto'>
              <tbody>
                {statusData.slice().reverse().map((status, index) => {
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
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div className=' w-[700px]'>
        <div>
                <h1 className='text-2xl opacity-45'>Announcements</h1>
            <div className='flex justify-center pt-2 '>
                    <hr className='w-[200px] justify-center opacity-25'></hr> 
            </div>
            
            </div>
          <div className='pt-12'>
            <table  className='mx-auto'>
              <tbody>
                {announcementData.slice().reverse().map((announcements, index) => {
                  const statusTime = moment(announcements.time, 'HH:mm:ss'); // Parse the time string using moment

                  if (!statusTime.isValid()) {
                    console.error('Invalid time format:', announcements.time);
                    return null; // Skip rendering if the time format is invalid
                  }

                  const timeAgo = statusTime.fromNow();
                  const formattedTimeAgo = timeAgo.includes('seconds') ? timeAgo.replace('seconds', 'secs') : timeAgo;

                  return (
                    <tr key={index} className="border-b border-gray-500 h-[100px] bg-gradient-to-b from-[#2B2B2B] to-[#333333] " >
                      <td className='w-[50px]'></td>
                      <td className='w-[450px] text-left'>
                        <h1 className='text-2xl truncate'>{announcements.title?.slice(0, 20)}</h1>
                        <p className=' opacity-30'>{announcements.announce.slice(0, 35)}.....</p>
                        <p className='text-sm text-gray-400'>{announcements.user_fname} {announcements.user_lname}</p>
                        <div className='text-sm text-gray-400'>
                          {formattedTimeAgo}
                        </div>
                      </td>
                      <td>
                        <div className="mr-4">
                          <button onClick={()=>{handleViewAnnouncement(announcements)}}>
                            <GrFormView className="size-[50px]  hover:opacity-40"  />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div>
        <StatusView visible={showStatus} onClose={handleModalstatusClose} status={selectedStatus} />
      </div>
      <div>
        <AnnouncementView visible={showAnnouncement} onClose={handleModalstatusClose} announcements={selectedAnnouncement}/>
      </div>
    </div>
  )
}
