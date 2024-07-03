// Status.js
import React, { useEffect, useState, useContext, useRef } from 'react';
import axios from 'axios';
import StatusView from '../../../Components/candidateComp/StatusView';
import AnnouncementView from '../../../Components/candidateComp/AnnouncementView';
import SingleAnouncement from '../../../Components/candidateComp/Status_Page/SingleAnouncement';
import SingleStatus from '../../../Components/candidateComp/Status_Page/SingleStatus';
import { useInterviewContext } from '../../../Context/InterviewContext';
import { UserContext } from '../../../Context/UserContext';
import useListenStatus from '../../../hooks/useListenStatus';



export default function Status() {
  
  const { user } = useContext(UserContext);
  const [showStatus, setShowStatus] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [showAnnouncement, setShowAnnouncement] = useState(true);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
 

  const { 
    localStatusData, 
    setLocalStatusData, 
    localAnouncementData, 
    setLocalAnouncementData 
  } = useInterviewContext();

  const [readStatuses, setReadStatuses] = useState(() => {
    const storedReadStatuses = window.localStorage.getItem('readStatuses');
    try {
      return storedReadStatuses ? JSON.parse(storedReadStatuses) : [];
    } catch {
      return [];
    }
  });

  const [ readAnnouncements, setReadAnnouncements ] = useState(() => {
    const storedReadAnnouncements = window.localStorage.getItem('readAnnouncements');
    try {
      return storedReadAnnouncements ? JSON.parse(storedReadAnnouncements) : [];
    } catch {
      return [];
    }
  });

  useListenStatus();

  

  const fetchData = async () => {
    try {
      const [statusResponse, announcementResponse] = await Promise.all([
        axios.get('/status/getstatus'),
        axios.get('/announcement/getannouncement')
      ]);

      setLocalStatusData(statusResponse.data);
      setLocalAnouncementData(announcementResponse.data);

      window.localStorage.setItem('statusData', JSON.stringify(statusResponse.data));
      window.localStorage.setItem('announcementData', JSON.stringify(announcementResponse.data));

    } catch (error) {
      console.error('Error fetching data :', error);
    }
  };


  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    
    window.localStorage.setItem('readStatuses', JSON.stringify(readStatuses));
    console.log('localStorage updated with new ReadStatuses', readStatuses);

    window.localStorage.setItem('readAnnouncements', JSON.stringify(readAnnouncements));
    console.log('localStorage updated with new ReadAnnouncements', readAnnouncements);
  }, [ readStatuses, readAnnouncements]);

 

  const handleModalstatusClose = () => {
    setShowStatus(false);
    setShowAnnouncement(false);
  };

  const sortItems = (items, readItems) => {
    return items.slice().sort((a, b) => {
      if (readItems.includes(a._id) && !readItems.includes(b._id)) {
        return -1;
      }
      if (!readItems.includes(a._id) && readItems.includes(b._id)) {
        return 1;
      }
      return 0;
    });
  };

  const sortedStatuses = sortItems(localStatusData, readStatuses);
  const sortedAnnouncements = sortItems(localAnouncementData, readAnnouncements);

  return (
    <div className='items-center h-full w-full overflow-hidden overflow-y-hidden '>
      <div className='flex w-full h-full mx-auto '>

        <div className='border-r- w-1/2 h-full border-neutral-700 bg-gradient-to-b from-[#2c2c2c] to-[#181818]'>
          <div className='flex items-center justify-center h-1/6 '>
            <h1 className='text-2xl font-bold text-neutral-200'>Status</h1>
          </div>
          <div className='overflow-y-auto h-5/6 rounded-lg'>
            <div className="mx-auto  w-4/5 overflow-hidden rounded-lg">
              {sortedStatuses.reverse().map((status, index) => (
                <SingleStatus
                  key={index}
                  status={status}
                  index={index}
                  setShowStatus={setShowStatus}
                  setSelectedStatus={setSelectedStatus}
                  setReadStatuses={setReadStatuses}
                  readStatuses={readStatuses}
                />
              ))}
            </div>
          </div>
        </div>

        <div className='w-1/2 h-full'>
          <div className='flex items-center justify-center h-1/6 bg-neutral-800'>
            <h1 className='text-2xl font-bold text-neutral-200'>Announcements</h1>
          </div>
          <div className='overflow-y-auto h-4/6'>
            <div className='mx-auto w-4/5 '>
              {sortedAnnouncements.reverse().map((announcement, index) => (
                <SingleAnouncement
                  key={index}
                  announcement={announcement}
                  index={index}
                  setShowAnnouncement={setShowAnnouncement}
                  setReadAnnouncements={setReadAnnouncements}
                  readAnnouncements={readAnnouncements}
                  setSelectedAnnouncement={setSelectedAnnouncement}
                />
              ))}
            </div>
          </div>
</div>

      </div>
     
      <div >
        <StatusView
          visible={showStatus}
          onClose={handleModalstatusClose}
          status={selectedStatus}
        />
      </div>
      <div>
        <AnnouncementView
          visible={showAnnouncement}
          onClose={handleModalstatusClose}
          announcements={selectedAnnouncement}
        />
      </div>
    </div>
  )
}
