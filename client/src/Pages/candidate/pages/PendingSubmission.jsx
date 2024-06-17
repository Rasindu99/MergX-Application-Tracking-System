import React from 'react'
import { useState } from 'react';

const PendingSubmission = () => {

    const [detailsVisible, setDetailsVisible] = useState(false);
  
    const toggleDetails = () => {
      setDetailsVisible(!detailsVisible);
    };
    
  return (
    <div className="interview-row p-4 border border-gray-300 rounded-md"  >
      <div className="summary flex justify-between items-center">
        <span>Interview with John Doe</span>
        <button className="bg-blue-500 text-white py-1 px-2 rounded" onClick={toggleDetails}> {detailsVisible ? 'View Less' : 'view More' }</button>
      </div>
      {detailsVisible && (
        <div className="details mt-4">
          <p>Interview Date: 2024-06-20</p>
          <p>Position: Software Engineer</p>
          <p>Location: Remote</p>
          <a href="#" className="text-blue-500 underline">Full Details</a>
        </div>
      )}
    </div>
  )
}

export default PendingSubmission
