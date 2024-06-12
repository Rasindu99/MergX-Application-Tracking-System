import React, { useState } from 'react'
import PopupViewjob from './PopupViewjob';

export default function ViewJobButton() {
    const [showModalview, setShowModalview] = useState(false);

    const handleViewJob = () => {
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
