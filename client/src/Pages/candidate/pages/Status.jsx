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
    <div className='items-center h-full w-full overflow-hidden overflow-y-hidden bg-yellow-300'>
      <div className='flex w-full h-full mx-auto mt-3 bg-orange-500'>

        <div className='border-r w-1/2 h-full bg-slate-400'>
          <div className='h-1/5'>
            <h1 className='text-2xl opacity-45'>Status</h1>
          </div>
          <div className='pt-12 h-4/5'>
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

        <div className=' w-1/2 h-2/12 overflow-hidden bg-red-200'>
          <div>
            <h1 className='text-2xl opacity-45 h-2/5'>Announcements</h1>
          </div>
          <div className='overflow-y-auto bg-green-600 h-3/5'>
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
