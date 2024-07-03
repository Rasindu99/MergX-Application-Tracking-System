import { useEffect } from 'react';
import { useSocketContext } from '../Context/SocketContext';
import { useInterviewContext } from '../Context/InterviewContext';

const useListenStatus = () => {
  const { socket } = useSocketContext();
  const { setLocalStatusData, setLocalAnouncementData } = useInterviewContext();

  useEffect(() => {

    const handleStatusUpdate = (newStatus) => {
      console.log('Socket - Status Updated -', newStatus);
      setLocalStatusData((preData) => [newStatus, ...preData]);
    };

    const handleStatusDelete = (deletedStatusId) => {
      console.log('Socket - Status deleted -', deletedStatusId);
      setLocalStatusData((prevData) => prevData.filter(status => status._id !== deletedStatusId));
    };

    const handleAnnouncementDelete = (deletedAnnouncementId) => {
      console.log('Socket - Announcement deleted-', deletedAnnouncementId);
      setLocalAnouncementData((prevData) => prevData.filter(announcement => announcement._id !== deletedAnnouncementId));
    };

    const handleAnnouncementUpdate = (newAnnouncement) => {
      console.log('Socket - Announcement updated -', newAnnouncement);
      setLocalAnouncementData((preData) => [newAnnouncement, ...preData]);
    };
    

     // Listen for status updates from socket
    if (socket) {
      socket.on('status_update', handleStatusUpdate);
    }

     // Listen for status deletions from socket
     socket?.on('status_deleted', handleStatusDelete);
    
     // Listen for Announcement updates from socket
     socket?.on('anouncement_update', handleAnnouncementUpdate);

     // Listen for Announcement delete from socket
     socket?.on('anouncement_delete', handleAnnouncementDelete);

    return () => {
      if (socket) {
        socket.off('status_update'); // Remove status_update Event Listener
        socket.off('status_deleted');
        socket.off('anouncement_update');
        socket.off('anouncement_delete');
      }
    };
  }, [socket, setLocalStatusData, setLocalAnouncementData]); // Only re-run the effect if socket or setLocalStatusData changes
};

export default useListenStatus;





