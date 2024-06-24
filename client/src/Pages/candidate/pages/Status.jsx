// Status.js
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../Context/UserContext';
import axios from 'axios';
import StatusView from '../../../Components/candidateComp/StatusView';
import AnnouncementView from '../../../Components/candidateComp/AnnouncementView';
import SingleAnouncement from '../../../Components/candidateComp/Status_Page/SingleAnouncement';
import SingleStatus from '../../../Components/candidateComp/Status_Page/SingleStatus';
import { useInterviewContext } from '../../../Context/InterviewContext';

export default function Status() {
  const { user } = useContext(UserContext);
  
  const [announcementData, setAnnouncementData] = useState([]);
  const [showStatus, setShowStatus] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [showAnnouncement, setShowAnnouncement] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [ read, setRead] = useState(false);

  const { localStatusData, setLocalStatusData } = useInterviewContext();

  const fetchData = async () => {
    try {
      const [statusResponse, announcementResponse] = await Promise.all([
        axios.get('/status/getstatus'),
        axios.get('/announcement/getannouncement')
      ]);

      setLocalStatusData(statusResponse.data);
      setAnnouncementData(announcementResponse.data);

      window.localStorage.setItem('statusData', JSON.stringify(localStatusData));

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [localStatusData]);

  const handleViewStatus = (status) => {
    setSelectedStatus(status);
    setShowStatus(true);
    setRead(true);
  };

  const handleViewAnnouncement = (announcements) => {
    setSelectedAnnouncement(announcements);
    setShowAnnouncement(true);
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
          </div>
          <div className='pt-12'>
            <table className='mx-auto'>
              <tbody>
                {localStatusData.slice().reverse().map((status, index) => {
                  return (
                    <SingleStatus
                      status={status}
                      index={index}
                      handleViewStatus={handleViewStatus}
                    />
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
            <table className='mx-auto'>
              <tbody>
                {announcementData.slice().reverse().map((announcement, index) => {
                  return (
                    <SingleAnouncement
                      announcement={announcement}
                      index={index}
                      handleViewAnnouncement={handleViewAnnouncement}
                    />
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div>
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
          anouncement={selectedAnnouncement}
        />
      </div>
    </div>
  )
}
