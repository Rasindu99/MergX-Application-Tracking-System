import React, { useState , useEffect} from 'react'
import PopupViewjob from './PopupViewjob';
import {toast} from 'react-hot-toast';
import axios from 'axios';

export default function ViewJobButton() {
    const [showModalview, setShowModalview] = useState(false);

    //access
    const [viewJob, setViewJob] = useState(false);

  useEffect(() => {
    // Fetch the current state of create_user_account from the backend
    const fetchviewJob = async () => {
      try {
        const response = await axios.get('/access/interviewscheduleget');
        setViewJob(response.data.interview_scheduling);
      } catch (error) {
        console.error('Error fetching create user account state:', error);
      }
    };

    fetchviewJob();
  }, []);
   

    const handleViewJob = () => {
      if (!viewJob) {
        toast.error('Admin blocked temporarily');
        return;
      }
        setShowModalview(true);
    }
    const handleModalClose = async () => {
        setShowModalview(false);
    }

  return (
    <div>
      <button 
        onClick={() => handleViewJob()}
      className='h-[60px] bg-orange-500 rounded-xl w-[200px] text-2xl hover:bg-orange-700'>View Jobs</button>
    <div>
        <PopupViewjob
            visible = {showModalview}
            onClose = {handleModalClose}

        />
    </div>
    </div>
  )
}
