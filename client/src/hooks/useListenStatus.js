import { useEffect } from 'react';
import { useSocketContext } from '../Context/SocketContext';
import { useInterviewContext } from '../Context/InterviewContext';

const useListenStatus = () => {
  const { socket } = useSocketContext();
  const { setLocalStatusData } = useInterviewContext();

  useEffect(() => {
    
    const handleStatusUpdate = (newStatus) => {
      console.log('Socket Working -', newStatus);
      setLocalStatusData((preData) => [newStatus, ...preData]);
    };

    const handleStatusDelete = (deletedStatusId) => {
      console.log('Socket Working -', deletedStatusId);
      setLocalStatusData((prevData) => prevData.filter(status => status._id !== deletedStatusId));
    };

    if (socket) {
      socket.on('status_update', handleStatusUpdate);
    }

     // Listen for status deletions from socket
     socket?.on('status_deleted', handleStatusDelete);

    return () => {
      if (socket) {
        socket.off('status_update'); // Remove status_update Event Listener
        socket.off('status_deleted');
      }
    };
  }, [socket, setLocalStatusData]); // Only re-run the effect if socket or setLocalStatusData changes
};

export default useListenStatus;





