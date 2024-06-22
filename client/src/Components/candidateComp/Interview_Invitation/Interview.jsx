import React, { useContext, useState } from 'react';
import { useInterviewContext } from '../../../Context/InterviewContext';
import { RiDeleteBin5Fill } from "react-icons/ri";
import axios from 'axios';
import { UserContext } from '../../../Context/UserContext';

const Interview = ({ interview, isRead }) => {
  const {
    interviews,
    setInterviews,
    deletedInterviews,
    setDeletedInterviews,
    searchedInterview,
    setSearchedInterview,
    search,
    readInterviews,
    setReadInterviews,
  } = useInterviewContext();

  const [detailsVisible, setDetailsVisible] = useState(false);
  const [isAddingToWishlist, setIsAddingToWishlist] = useState(false);
  const [wishlistError, setWishlistError] = useState(null);
  const [wishlistSuccess, setWishlistSuccess] = useState(false);
  const { user  } = useContext(UserContext);

  const handleDelete = (interview) => {
    const newDeletedInterview = [...deletedInterviews, interview._id];
    setDeletedInterviews(newDeletedInterview);

    const updatedInterviews = interviews.filter((item) => item._id !== interview._id);
    setInterviews(updatedInterviews);

    if (search) {
      const updatedSearchResults = searchedInterview.filter((item) => item._id !== interview._id);
      setSearchedInterview(updatedSearchResults);
    }
    console.log('item deleted');
    console.log(interview);
  }

  const handleRead = (interview) => {
    setDetailsVisible(!detailsVisible);
    if (detailsVisible) {
      setReadInterviews([...readInterviews, interview._id]);
    } else {
      if (!readInterviews.includes(interview._id)) {
        setReadInterviews(readInterviews.filter((id) => id !== interview._id));
      }
      console.log('item read', interview);
    }
  }

  const handleAddToWishlist = async () => {
    setIsAddingToWishlist(true);
    setWishlistError(null);
    setWishlistSuccess(false);

    try {
      const response = await axios.post('http://localhost:8000/wishlist/postaddwishlist', {
        job_invitation_id: interview._id,
        job_id: interview.jobId,
        candidate_id: user._id,
        candidate_email: user.email
      });

      setWishlistSuccess(true);
      console.log('Item added to wishlist:', response.data);
    } catch (err) {
      setWishlistError('Failed to add item to wishlist. Please try again.');
      console.error('Error adding to wishlist:', err);
      if (err.response) {
        console.error('Error data:', err.response.data);
        console.error('Error status:', err.response.status);
        console.error('Error headers:', err.response.headers);
      } else if (err.request) {
        console.error('Error request:', err.request);
      } else {
        console.error('Error message:', err.message);
      }
    } finally {
      setIsAddingToWishlist(false);
    }
  };

  const date = new Date(interview.createdAt);
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  };
  
  const formattedDate = date.toLocaleString(undefined, options).replace('at', '/');

  return (
    <div className={`interview-row transition-transform ease-in-out duration-200 transform hover:scale-105 hover:opacity-80 p-4 ${isRead ? 'bg-neutral-800' : 'bg-neutral-700'}`} key={interview._id}>
      <div className="flex items-center justify-around summary">
        <span className='w-[200px]'>{interview.subject}</span>
        <span className='w-2/5'>{formattedDate}</span>
        <div className='z-10 flex justify-around w-1/5'>
          <button className="z-10 px-2 py-1 mr-3 text-white bg-blue-500 rounded" onClick={() => handleRead(interview)}>
            {detailsVisible ? 'View Less' : 'View More'}
          </button>
          <button 
            className="z-10 px-2 py-1 mr-3 text-white bg-blue-500 rounded"
            onClick={handleAddToWishlist}
            disabled={isAddingToWishlist}
          >
            {isAddingToWishlist ? 'Adding...' : 'Add to Wishlist'}
          </button>
          <button onClick={() => handleDelete(interview)} className='z-10 bg-orange-700 border-0 rounded-full cursor-pointer w-9 h-9 border-y-cyan-950'>
            <RiDeleteBin5Fill className='w-6 h-6 m-auto' />
          </button>
        </div>
      </div>
      {detailsVisible && (
        <div className="mt-4 details">
          <p>Interview Date: {interview.interviewDate}</p>
          <p>Position: {interview.position}</p>
          <p>Location: {interview.location}</p>
          <a href="#" className="text-blue-500 underline">Full Details</a>
        </div>
      )}
      {wishlistError && <p className="text-red-500">{wishlistError}</p>}
      {wishlistSuccess && <p className="text-green-500">Added to wishlist successfully!</p>}
    </div>
  )
}

export default Interview;